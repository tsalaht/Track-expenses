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

type LedgerState = {
  entries: LedgerEntry[];
  addEntry: (draft: EntryDraft) => Promise<void>;
  updateEntry: (id: string, draft: EntryDraft) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
  loadDemo: () => void;
};

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set) => ({
      entries: createDemoEntries(),
      addEntry: async (draft) => {
        const entry: LedgerEntry = { ...draft, id: newId(), createdAt: Date.now() };
        await saveLedgerEntry({ data: entry });
        set((state) => ({ entries: [entry, ...state.entries] }));
      },
      updateEntry: async (id, draft) => {
        const current = useLedgerStore.getState().entries.find((entry) => entry.id === id);
        if (!current) return;
        const updated = { ...current, ...draft };
        await saveLedgerEntry({ data: updated });
        set((state) => ({ entries: state.entries.map((entry) => (entry.id === id ? updated : entry)) }));
      },
      removeEntry: async (id) => {
        await removeLedgerEntry({ data: id });
        set((state) => ({ entries: state.entries.filter((entry) => entry.id !== id) }));
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
