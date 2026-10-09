import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createDemoEntries,
  newId,
  type EntryType,
  type CategoryId,
  type LedgerEntry,
} from "./model";
import { removeLedgerEntry, saveLedgerEntry } from "./actions";

export type EntryDraft = {
  type: EntryType;
  category: CategoryId;
  amount: number;
  date: string;
  note: string;
};

function requireSheets(result: { configured: boolean; missing?: string[] }): void {
  if (result.configured) return;
  const missing = result.missing?.length ? ` الإعدادات الناقصة: ${result.missing.join(", ")}.` : "";
  throw new Error(`Google Sheets غير متصل.${missing}`);
}

type LedgerState = {
  entries: LedgerEntry[];
  addEntry: (draft: EntryDraft) => Promise<boolean>;
  updateEntry: (id: string, draft: EntryDraft) => Promise<boolean>;
  removeEntry: (id: string) => Promise<boolean>;
  loadDemo: () => void;
};

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set, get) => ({
      entries: createDemoEntries(),
      addEntry: async (draft) => {
        const entry: LedgerEntry = { ...draft, id: newId(), createdAt: Date.now() };
        const result = await saveLedgerEntry({ data: entry });
        requireSheets(result);
        set((state) => ({ entries: [entry, ...state.entries] }));
        return true;
      },
      updateEntry: async (id, draft) => {
        const current = get().entries.find((entry) => entry.id === id);
        if (!current) return false;
        const updated = { ...current, ...draft };
        const result = await saveLedgerEntry({ data: updated });
        requireSheets(result);
        set((state) => ({ entries: state.entries.map((entry) => (entry.id === id ? updated : entry)) }));
        return true;
      },
      removeEntry: async (id) => {
        const result = await removeLedgerEntry({ data: id });
        requireSheets(result);
        set((state) => ({ entries: state.entries.filter((entry) => entry.id !== id) }));
        return true;
      },
      loadDemo: () => set({ entries: createDemoEntries() }),
    }),
    {
      name: "mizan-ledger-v1",
      partialize: (state) => ({ entries: state.entries }),
      skipHydration: true,
    },
  ),
);
