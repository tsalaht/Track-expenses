import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDzd, formatSignedDzd, type Totals } from "@/lib/ledger/model";

type Kpi = {
  label: string;
  value: number;
  hint: string;
  tone: "income" | "expense" | "neutral";
  signed?: boolean;
  delta: number | null;
};

function Delta({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-xs text-muted-foreground">ماكانش مقارنة</span>;
  }
  const up = value > 0;
  const flat = value === 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs tabular-nums",
        flat && "text-muted-foreground",
        !flat && up && "text-income",
        !flat && !up && "text-expense",
      )}
    >
      {flat ? null : up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
      {flat ? "ثابت على الفترة اللي قبل" : `${up ? "+" : "−"}${Math.abs(value).toFixed(0)}% على اللي قبل`}
    </span>
  );
}

function Card({ item, className }: { item: Kpi; className?: string }) {
  return (
    <article
      className={cn(
        "flex min-h-32 flex-col justify-between rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">{item.label}</p>
      <p
        dir="ltr"
        className={cn(
          "mt-3 font-medium tabular-nums tracking-tight text-2xl leading-tight sm:text-3xl",
          item.tone === "income" && "text-income",
          item.tone === "expense" && "text-expense",
          item.tone === "neutral" && (item.value < 0 ? "text-expense" : "text-foreground"),
        )}
      >
        {item.signed ? formatSignedDzd(item.value) : formatDzd(item.value)}
      </p>
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">{item.hint}</p>
        <Delta value={item.delta} />
      </div>
    </article>
  );
}

export function KpiGrid({
  current,
  previous,
}: {
  current: Totals;
  previous: Totals | null;
}) {
  const incomeDelta =
    previous === null ? null : previous.income === 0 && current.income === 0
      ? 0
      : previous.income === 0
        ? null
        : ((current.income - previous.income) / previous.income) * 100;
  const expenseDelta =
    previous === null ? null : previous.expense === 0 && current.expense === 0
      ? 0
      : previous.expense === 0
        ? null
        : ((current.expense - previous.expense) / previous.expense) * 100;
  const profitDelta =
    previous === null ? null : previous.profit === 0 && current.profit === 0
      ? 0
      : previous.profit === 0
        ? null
        : ((current.profit - previous.profit) / Math.abs(previous.profit)) * 100;

  const items: Kpi[] = [
    {
      label: "المداخيل",
      value: current.income,
      hint: "شحال دخل للخزنة",
      tone: "income",
      delta: incomeDelta,
    },
    {
      label: "المصاريف",
      value: current.expense,
      hint: "شحال خرج من اليد",
      tone: "expense",
      delta: expenseDelta,
    },
    {
      label: "الربح الصافي",
      value: current.profit,
      hint: current.margin === null ? "هامش الربح ما يتّحسبش بلا مداخيل" : `هامش الربح ${Math.round(current.margin * 100)}%`,
      tone: "neutral",
      signed: true,
      delta: profitDelta,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} item={item} />
      ))}
    </section>
  );
}
