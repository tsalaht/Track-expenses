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
  return (result.entries ?? []).sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
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
  return (result.entries ?? []).sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
}
