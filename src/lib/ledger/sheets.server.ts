import type { LedgerEntry } from "./model";

// Paste the Apps Script Web App URL here after deploying Code.gs.
// This is application configuration in source code, not a Vercel environment variable.
const appsScriptUrl = "https://script.google.com/macros/s/AKfycbzviY3kQipojSUsEK1JZNaPsFFMk96k6CnOyZpS4x5HxWeddaDZGJi2McIDrF4fZJz4/exec";

export function sheetsConfigured(): boolean {
  return appsScriptUrl.startsWith("https://script.google.com/macros/s/");
}

export function missingSheetSettings(): string[] {
  return sheetsConfigured() ? [] : ["رابط Web App من Apps Script لم يُضف إلى التطبيق بعد"];
}

type AppsScriptResponse = {
  ok?: boolean;
  error?: string;
  entries?: LedgerEntry[];
};

function normalizeSheetDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = value.match(/^[A-Za-z]{3}\s+([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/);
  if (parsed) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(parsed[1]!);
    if (month >= 0) return `${parsed[3]}-${String(month + 1).padStart(2, "0")}-${parsed[2]!.padStart(2, "0")}`;
  }
  const date = new Date(value);
  if (!Number.isNaN(date.valueOf())) {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Lagos",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }
  throw new Error(`Apps Script returned an invalid transaction date: ${value}`);
}

function normalizeEntries(entries: LedgerEntry[]): LedgerEntry[] {
  return entries.map((entry) => ({ ...entry, date: normalizeSheetDate(entry.date) }));
}

async function requestAppsScript(action: string, data: Record<string, unknown> = {}): Promise<AppsScriptResponse> {
  if (!sheetsConfigured()) throw new Error(missingSheetSettings()[0]);

  const response = await fetch(appsScriptUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, ...data }),
    redirect: "follow",
  });
  const result = (await response.json().catch(() => ({}))) as AppsScriptResponse;
  if (!response.ok || !result.ok) {
    throw new Error(result.error || `Apps Script returned HTTP ${response.status}`);
  }
  return result;
}

export async function listEntries(): Promise<LedgerEntry[]> {
  const result = await requestAppsScript("list");
  return normalizeEntries(result.entries ?? []).sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
}

export async function saveEntry(entry: LedgerEntry): Promise<void> {
  await requestAppsScript("save", { entry });
}

export async function deleteEntry(id: string): Promise<void> {
  await requestAppsScript("delete", { id });
}

export async function importMissingEntries(localEntries: LedgerEntry[]): Promise<LedgerEntry[]> {
  const result = await requestAppsScript("sync", {
    entries: localEntries.filter((entry) => !entry.id.startsWith("demo-")),
  });
  return normalizeEntries(result.entries ?? []).sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
}
