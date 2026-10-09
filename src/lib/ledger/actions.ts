import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { LedgerEntry } from "./model";

const entrySchema = z.object({
  id: z.string().min(1).max(100),
  type: z.enum(["income", "expense"]),
  category: z.enum(["products", "ads", "shipping", "packaging", "cod", "returns", "platform", "stock", "other", "sales", "refund"]),
  amount: z.number().finite().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  note: z.string().max(500),
  createdAt: z.number().finite(),
});

export const syncLedger = createServerFn({ method: "POST" })
  .validator((input: { entries: LedgerEntry[] }) => ({
    entries: z.array(entrySchema).max(5000).parse(input.entries),
  }))
  .handler(async ({ data }) => {
    const sheets = await import("./sheets.server");
    if (!sheets.sheetsConfigured()) {
      return { configured: false as const, missing: sheets.missingSheetSettings(), entries: data.entries };
    }
    const entries = await sheets.importMissingEntries(data.entries as LedgerEntry[]);
    return { configured: true as const, entries };
  });

export const saveLedgerEntry = createServerFn({ method: "POST" })
  .validator((entry: LedgerEntry) => entrySchema.parse(entry))
  .handler(async ({ data }) => {
    const sheets = await import("./sheets.server");
    if (!sheets.sheetsConfigured()) {
      return { configured: false as const, missing: sheets.missingSheetSettings() };
    }
    await sheets.saveEntry(data as LedgerEntry);
    return { configured: true as const };
  });

export const removeLedgerEntry = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().min(1).max(100).parse(id))
  .handler(async ({ data: id }) => {
    const sheets = await import("./sheets.server");
    if (!sheets.sheetsConfigured()) {
      return { configured: false as const, missing: sheets.missingSheetSettings() };
    }
    await sheets.deleteEntry(id);
    return { configured: true as const };
  });
