import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import type { CategoryId, LedgerEntry } from "./model";

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
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sheets = await import("./sheets.server");
    if (!sheets.sheetsConfigured()) return { configured: false as const, entries: data.entries };
    const entries = await sheets.importMissingEntries(context.userId, data.entries as LedgerEntry[]);
    return { configured: true as const, entries };
  });

export const saveLedgerEntry = createServerFn({ method: "POST" })
  .validator((entry: LedgerEntry) => entrySchema.parse(entry))
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sheets = await import("./sheets.server");
    if (!sheets.sheetsConfigured()) return { configured: false as const };
    await sheets.saveEntry(context.userId, data as LedgerEntry);
    return { configured: true as const };
  });

export const removeLedgerEntry = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().min(1).max(100).parse(id))
  .middleware([authMiddleware])
  .handler(async ({ context, data: id }) => {
    const sheets = await import("./sheets.server");
    if (!sheets.sheetsConfigured()) return { configured: false as const };
    await sheets.deleteEntry(context.userId, id);
    return { configured: true as const };
  });

export const clearLedger = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sheets = await import("./sheets.server");
    if (!sheets.sheetsConfigured()) return { configured: false as const };
    await sheets.deleteAllEntries(context.userId);
    return { configured: true as const };
  });
