import { useMemo, useState } from "react";
import { Pencil, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  categoryMeta,
  formatDate,
  formatDzd,
  type EntryType,
  type LedgerEntry,
} from "@/lib/ledger/model";
import { useLedgerStore } from "@/lib/ledger/store";
import { cn } from "@/lib/utils";

const TYPE_FILTERS: { id: "all" | EntryType; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "income", label: "مداخيل" },
  { id: "expense", label: "مصاريف" },
];

export function TransactionList({
  entries,
  onEdit,
}: {
  entries: LedgerEntry[];
  onEdit: (entry: LedgerEntry) => void;
}) {
  const removeEntry = useLedgerStore((s) => s.removeEntry);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | EntryType>("all");

  const filtered = useMemo(() => {
    const q = query.trim();
    return [...entries]
      .filter((e) => (type === "all" ? true : e.type === type))
      .filter((e) => {
        if (!q) return true;
        const meta = categoryMeta(e.type, e.category);
        return `${e.note} ${meta.label}`.includes(q);
      })
      .sort((a, b) => (a.date === b.date ? b.createdAt - a.createdAt : b.date.localeCompare(a.date)));
  }, [entries, query, type]);

  return (
    <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium">الحركات</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث في الملاحظات والأبواب"
              className="h-10 ps-9 sm:w-64"
            />
          </div>
          <div className="flex rounded-md bg-muted p-1">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setType(f.id)}
                className={cn(
                  "h-8 flex-1 rounded-sm px-3 text-xs font-medium transition-colors sm:flex-none",
                  type === f.id
                    ? "bg-card text-foreground shadow-[var(--shadow-border)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 py-6 text-center text-sm text-muted-foreground">
          ماكانش حركات تطابق البحث.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {filtered.map((entry) => {
            const meta = categoryMeta(entry.type, entry.category);
            const Icon = meta.icon;
            return (
              <li key={entry.id} className="flex min-w-0 items-center gap-3 py-3">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-md",
                    entry.type === "income" ? "bg-income/15 text-income" : "bg-expense/15 text-expense",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{meta.label}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatDate(entry.date)}
                    {entry.note ? ` · ${entry.note}` : ""}
                  </p>
                </div>
                <p
                  dir="ltr"
                  className={cn(
                    "shrink-0 text-sm font-medium tabular-nums",
                    entry.type === "income" ? "text-income" : "text-expense",
                  )}
                >
                  {entry.type === "income" ? "+" : "−"} {formatDzd(entry.amount)}
                </p>
                <div className="flex shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-10"
                    onClick={() => onEdit(entry)}
                    aria-label="تعديل"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-10"
                    onClick={() => {
                      void removeEntry(entry.id)
                        .then(() => toast.success("تمسح الحركة"))
                        .catch(() => toast.error("ما تحذفتش الحركة. عاود المحاولة."));
                    }}
                    aria-label="حذف"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
