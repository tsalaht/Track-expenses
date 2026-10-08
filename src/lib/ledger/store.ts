import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createDemoEntries,
  newId,
  type EntryType,
  type CategoryId,
  type LedgerEntry,
} from "./model";

export type EntryDraft = {
  type: EntryType;
  category: CategoryId;
  amount: number;
  date: string;
  note: string;
};

type LedgerState = {
  entries: LedgerEntry[];
  addEntry: (draft: EntryDraft) => void;
  updateEntry: (id: string, draft: EntryDraft) => void;
  removeEntry: (id: string) => void;
  loadDemo: () => void;
  clearAll: () => void;
};

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set) => ({
      entries: createDemoEntries(),
      addEntry: (draft) =>
        set((state) => ({
          entries: [
            {
              ...draft,
              id: newId(),
              createdAt: Date.now(),
            },
            ...state.entries,
          ],
        })),
      updateEntry: (id, draft) =>
        set((state) => ({
          entries: state.entries.map((e) => (e.id === id ? { ...e, ...draft } : e)),
        })),
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),
      loadDemo: () => set({ entries: createDemoEntries() }),
      clearAll: () => set({ entries: [] }),
    }),
    {
      name: "mizan-ledger-v1",
      partialize: (state) => ({ entries: state.entries }),
      skipHydration: true,
    },
  ),
);
