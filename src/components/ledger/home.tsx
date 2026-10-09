import { useEffect, useMemo, useState } from "react";
import { Cloud, CloudOff, Download, MoreHorizontal, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { ScaleMark } from "@/components/ledger/mark";
import { KpiGrid } from "@/components/ledger/kpis";
import { Insights } from "@/components/ledger/insights";
import { FlowChart } from "@/components/ledger/flow-chart";
import { CategoriesPanel } from "@/components/ledger/categories-panel";
import { TransactionList } from "@/components/ledger/transactions";
import { EntryDialog, type EntryIntent } from "@/components/ledger/entry-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PERIODS,
  categoryMeta,
  computeTotals,
  expenseBreakdown,
  filterEntries,
  flowSeries,
  formatDate,
  getPeriodRange,
  getPreviousRange,
  isoFromDate,
  type LedgerEntry,
  type PeriodId,
} from "@/lib/ledger/model";
import { useLedgerStore } from "@/lib/ledger/store";
import { syncLedger } from "@/lib/ledger/actions";
import { cn } from "@/lib/utils";

function exportCsv(entries: LedgerEntry[]) {
  const header = ["التاريخ", "النوع", "الباب", "المبلغ", "ملاحظة"];
  const rows = entries.map((e) => [
    e.date,
    e.type === "income" ? "مدخول" : "مصروف",
    categoryMeta(e.type, e.category).label,
    String(e.amount),
    e.note.replaceAll('"', '""'),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mizan-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function LedgerHome() {
  const entries = useLedgerStore((s) => s.entries);
  const loadDemo = useLedgerStore((s) => s.loadDemo);

  const [period, setPeriod] = useState<PeriodId>("last-30");
  const [intent, setIntent] = useState<EntryIntent | null>(null);
  const [syncState, setSyncState] = useState<"loading" | "synced" | "local" | "error">("loading");

  useEffect(() => {
    let active = true;
    let syncing = false;
    let showedSyncProblem = false;
    const sync = async () => {
      if (syncing) return;
      syncing = true;
      try {
        const result = await syncLedger({ data: { entries: useLedgerStore.getState().entries } });
        if (!active) return;
        if (result.configured) useLedgerStore.setState({ entries: result.entries });
        setSyncState(result.configured ? "synced" : "local");
        if (!result.configured && !showedSyncProblem) {
          showedSyncProblem = true;
          toast.warning(
            result.missing.length
              ? `المزامنة غير مفعّلة. أضف هذه القيم في Vercel: ${result.missing.join(", ")}`
              : "Google Sheets غير مربوط بهذا النشر في Vercel.",
            { duration: 12_000 },
          );
        }
      } catch (error) {
        if (!active) return;
        console.error("Ledger sync failed", error);
        setSyncState("error");
        if (!showedSyncProblem) {
          showedSyncProblem = true;
          toast.error(`فشلت مزامنة Google Sheets: ${error instanceof Error ? error.message : String(error)}`, {
            duration: 12_000,
          });
        }
      } finally {
        syncing = false;
      }
    };
    void Promise.resolve(useLedgerStore.persist.rehydrate()).then(sync);
    const onFocus = () => void sync();
    window.addEventListener("focus", onFocus);
    const timer = window.setInterval(onFocus, 60_000);
    return () => {
      active = false;
      window.removeEventListener("focus", onFocus);
      window.clearInterval(timer);
    };
  }, []);

  const range = useMemo(() => getPeriodRange(period), [period]);
  const prevRange = useMemo(() => getPreviousRange(period), [period]);
  const visible = useMemo(() => filterEntries(entries, range), [entries, range]);
  const prevVisible = useMemo(
    () => (prevRange ? filterEntries(entries, prevRange) : []),
    [entries, prevRange],
  );
  const totals = useMemo(() => computeTotals(visible), [visible]);
  const prevTotals = prevRange ? computeTotals(prevVisible) : null;
  const breakdown = useMemo(() => expenseBreakdown(visible), [visible]);
  const series = useMemo(() => flowSeries(visible, range, period), [visible, range, period]);
  const isDemo = entries.some((e) => e.id.startsWith("demo-"));

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-28 sm:pb-10">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-card shadow-[var(--shadow-border)]">
              <ScaleMark className="size-6" />
            </span>
            <div>
              <h1 className="text-lg font-semibold leading-tight">ميزان</h1>
              <p className="text-xs text-muted-foreground">دفتر مصاريف ومداخيل تجارتك</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground sm:text-xs" title={syncState === "synced" ? "محفوظ في Google Sheets" : syncState === "local" ? "حفظ محلي إلى أن يتوفر اتصال Google Sheets" : syncState === "error" ? "تعذرت المزامنة مع Google Sheets" : "جارٍ التحقق من المزامنة"}>
              {syncState === "synced" ? <Cloud className="size-4 text-income" /> : <CloudOff className="size-4" />}
              {syncState === "synced" ? "متزامن" : syncState === "local" ? "محلي" : syncState === "error" ? "تعذر الاتصال" : "مزامنة…"}
            </div>
            <Button
              className="hidden sm:inline-flex"
              variant="secondary"
              onClick={() => setIntent({ mode: "create", type: "expense" })}
            >
              <Plus className="size-4" />
              مصروف
            </Button>
            <Button
              className="hidden sm:inline-flex"
              onClick={() => setIntent({ mode: "create", type: "income" })}
            >
              <Plus className="size-4" />
              مدخول
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" aria-label="المزيد">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onSelect={() => {
                    exportCsv(visible);
                    toast.success("تنزّل ملف الإكسل");
                  }}
                >
                  <Download className="size-4" />
                  صدّر الفترة CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    loadDemo();
                    toast.success("تحمّل المثال");
                  }}
                >
                  <RotateCcw className="size-4" />
                  رجّع المثال
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-4 px-4 py-5">
        <div className="rise-in w-full min-w-0">
          <div className="flex gap-2 overflow-x-auto pb-1">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={cn(
                "h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors",
                period === p.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground shadow-[var(--shadow-border)] hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
          </div>
        </div>

        {isDemo ? (
          <p className="rise-in rise-in-1 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            هاد أرقام مثال باش تشوف كيفاش يخدم الدفتر. من القائمة فوق تقدر تمسحو وتبدأ بحساباتك.
          </p>
        ) : null}

        {entries.length === 0 ? (
          <EmptyState
            onIncome={() => setIntent({ mode: "create", type: "income" })}
            onExpense={() => setIntent({ mode: "create", type: "expense" })}
            onDemo={() => {
              loadDemo();
              toast.success("تحمّل المثال");
            }}
          />
        ) : (
          <>
            <div className="rise-in rise-in-1">
              <KpiGrid current={totals} previous={prevTotals} />
            </div>
            <p className="text-xs text-muted-foreground">
              من {formatDate(isoFromDate(range.start))} إلى {formatDate(isoFromDate(range.end))}
            </p>
            <div className="rise-in rise-in-2">
              <Insights totals={totals} breakdown={breakdown} />
            </div>
            <div className="rise-in rise-in-3">
              <FlowChart data={series} />
            </div>
            <div className="rise-in rise-in-4 grid min-w-0 gap-4 lg:grid-cols-5">
              <div className="min-w-0 lg:col-span-2">
                <CategoriesPanel items={breakdown} />
              </div>
              <div className="min-w-0 lg:col-span-3">
                <TransactionList
                  entries={visible}
                  onEdit={(entry) => setIntent({ mode: "edit", type: entry.type, entry })}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 dock-safe sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            className="h-12"
            onClick={() => setIntent({ mode: "create", type: "expense" })}
          >
            <Plus className="size-4" />
            مصروف
          </Button>
          <Button className="h-12" onClick={() => setIntent({ mode: "create", type: "income" })}>
            <Plus className="size-4" />
            مدخول
          </Button>
        </div>
      </div>

      <EntryDialog intent={intent} onClose={() => setIntent(null)} />
    </div>
  );
}

function EmptyState({
  onIncome,
  onExpense,
  onDemo,
}: {
  onIncome: () => void;
  onExpense: () => void;
  onDemo: () => void;
}) {
  return (
    <section className="flex flex-col items-center rounded-xl bg-card px-6 py-14 text-center shadow-[var(--shadow-border)]">
      <ScaleMark className="size-12 text-muted-foreground" />
      <h2 className="mt-5 text-xl font-semibold">دفترك فاضي</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        سجّل المداخيل (شنوة دخل) والمصاريف (شنوة خرج: سلعة، إشهار، توصيل…). ميزان يحسبلك الربح وحدو.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button onClick={onIncome}>مدخول</Button>
        <Button variant="secondary" onClick={onExpense}>
          مصروف
        </Button>
        <Button variant="ghost" onClick={onDemo}>
          شوف مثال
        </Button>
      </div>
    </section>
  );
}
