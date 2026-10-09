import type { LedgerEntry } from "./model";

const headers = ["user_id", "id", "type", "category", "amount", "date", "note", "created_at"];
const sheetTitle = "Transactions";
let cachedAccessToken: { value: string; expiresAt: number } | undefined;

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function sheetsConfigured(): boolean {
  return [
    "GCP_PROJECT_NUMBER",
    "GCP_SERVICE_ACCOUNT_EMAIL",
    "GCP_WORKLOAD_IDENTITY_POOL_ID",
    "GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID",
    "GOOGLE_SHEET_ID",
  ].every((key) => Boolean(env(key)));
}

async function googleAccessToken(): Promise<string> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.value;
  }
  const projectNumber = env("GCP_PROJECT_NUMBER");
  const serviceAccount = env("GCP_SERVICE_ACCOUNT_EMAIL");
  const poolId = env("GCP_WORKLOAD_IDENTITY_POOL_ID");
  const providerId = env("GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID");
  if (!projectNumber || !serviceAccount || !poolId || !providerId) {
    throw new Error("إعداد اتصال Google Sheets غير مكتمل في Vercel.");
  }

  const { getVercelOidcToken } = await import("@vercel/oidc");
  const subjectToken = await getVercelOidcToken();
  const audience = `//iam.googleapis.com/projects/${projectNumber}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`;
  const exchange = await fetch("https://sts.googleapis.com/v1/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      audience,
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
      scope: "https://www.googleapis.com/auth/cloud-platform",
      subject_token: subjectToken,
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    }),
  });
  const exchangeBody = (await exchange.json()) as { access_token?: string; error_description?: string };
  if (!exchange.ok || !exchangeBody.access_token) {
    throw new Error(exchangeBody.error_description ?? "تعذّر التحقق من Vercel عبر Google Cloud.");
  }

  const impersonation = await fetch(
    `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(serviceAccount)}:generateAccessToken`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${exchangeBody.access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ scope: ["https://www.googleapis.com/auth/spreadsheets"], lifetime: "3600s" }),
    },
  );
  const impersonationBody = (await impersonation.json()) as { accessToken?: string; expireTime?: string; error?: { message?: string } };
  if (!impersonation.ok || !impersonationBody.accessToken) {
    throw new Error(impersonationBody.error?.message ?? "تعذّر استخدام حساب الخدمة للوصول إلى الجدول.");
  }
  cachedAccessToken = {
    value: impersonationBody.accessToken,
    expiresAt: impersonationBody.expireTime ? Date.parse(impersonationBody.expireTime) : Date.now() + 3_500_000,
  };
  return cachedAccessToken.value;
}

async function sheetsRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await googleAccessToken();
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${env("GOOGLE_SHEET_ID")}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...init?.headers,
    },
  });
  const body = (await response.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!response.ok) throw new Error(body.error?.message ?? "تعذّر الاتصال بجدول Google Sheets.");
  return body;
}

let readyPromise: Promise<void> | undefined;

async function ensureTab(): Promise<void> {
  const metadata = await sheetsRequest<{ sheets?: { properties?: { title?: string } }[] }>("?fields=sheets.properties.title");
  const exists = metadata.sheets?.some((sheet) => sheet.properties?.title === sheetTitle);
  if (!exists) {
    await sheetsRequest(":batchUpdate", {
      method: "POST",
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title: sheetTitle } } }] }),
    });
  }
  const values = await sheetsRequest<{ values?: unknown[][] }>(`/values/${encodeURIComponent(`${sheetTitle}!A1:H1`)}`);
  if (!values.values?.length) {
    await sheetsRequest(`/values/${encodeURIComponent(`${sheetTitle}!A1:H1`)}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [headers] }),
    });
  }
}

async function ready(): Promise<void> {
  readyPromise ??= ensureTab().catch((error) => {
    readyPromise = undefined;
    throw error;
  });
  await readyPromise;
}

function decodeRows(values: unknown[][]): { entries: LedgerEntry[]; rowById: Map<string, number> } {
  const entries: LedgerEntry[] = [];
  const rowById = new Map<string, number>();
  values.slice(1).forEach((row, index) => {
    const id = String(row[1] ?? "");
    const type = String(row[2] ?? "");
    const category = String(row[3] ?? "");
    const amount = Number(row[4]);
    if (!id || (type !== "income" && type !== "expense") || !Number.isFinite(amount)) return;
    entries.push({
      id,
      type,
      category: category as LedgerEntry["category"],
      amount,
      date: String(row[5] ?? ""),
      note: String(row[6] ?? ""),
      createdAt: Number(row[7]) || 0,
    });
    rowById.set(id, index + 2);
  });
  return { entries, rowById };
}

async function getValues(): Promise<unknown[][]> {
  await ready();
  const result = await sheetsRequest<{ values?: unknown[][] }>(`/values/${encodeURIComponent(`${sheetTitle}!A:H`)}`);
  return result.values ?? [headers];
}

function encodeRow(entry: LedgerEntry): unknown[] {
  return ["shared", entry.id, entry.type, entry.category, entry.amount, entry.date, entry.note, entry.createdAt];
}

async function appendEntries(entries: LedgerEntry[]): Promise<void> {
  if (!entries.length) return;
  const range = encodeURIComponent(`${sheetTitle}!A:H`);
  await sheetsRequest(`/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: entries.map(encodeRow) }),
  });
}

export async function listEntries(): Promise<LedgerEntry[]> {
  const { entries } = decodeRows(await getValues());
  return entries.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
}

export async function saveEntry(entry: LedgerEntry): Promise<void> {
  const values = await getValues();
  const { rowById } = decodeRows(values);
  const rowIndex = rowById.get(entry.id);
  if (rowIndex) {
    const range = encodeURIComponent(`${sheetTitle}!A${rowIndex}:H${rowIndex}`);
    await sheetsRequest(`/values/${range}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [encodeRow(entry)] }),
    });
    return;
  }
  await appendEntries([entry]);
}

export async function deleteEntry(id: string): Promise<void> {
  const { rowById } = decodeRows(await getValues());
  const rowIndex = rowById.get(id);
  if (!rowIndex) return;
  await sheetsRequest(":batchUpdate", {
    method: "POST",
    body: JSON.stringify({ requests: [{ deleteDimension: { range: { sheetId: await getSheetId(), dimension: "ROWS", startIndex: rowIndex - 1, endIndex: rowIndex } } }] }),
  });
}

async function getSheetId(): Promise<number> {
  const result = await sheetsRequest<{ sheets?: { properties?: { title?: string; sheetId?: number } }[] }>("?fields=sheets.properties(title,sheetId)");
  const id = result.sheets?.find((sheet) => sheet.properties?.title === sheetTitle)?.properties?.sheetId;
  if (id === undefined) throw new Error("ورقة Transactions غير موجودة داخل جدول Google.");
  return id;
}

export async function importMissingEntries(localEntries: LedgerEntry[]): Promise<LedgerEntry[]> {
  const values = await getValues();
  const decoded = decodeRows(values);
  const known = new Set(decoded.entries.map((entry) => entry.id));
  const missing = localEntries.filter((entry) => !entry.id.startsWith("demo-") && !known.has(entry.id));
  await appendEntries(missing);
  return listEntries();
}
