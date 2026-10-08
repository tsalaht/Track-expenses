import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDzd, type FlowPoint } from "@/lib/ledger/model";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const income = payload.find((p) => p.dataKey === "income")?.value ?? 0;
  const expense = payload.find((p) => p.dataKey === "expense")?.value ?? 0;
  return (
    <div className="rounded-md bg-popover px-3 py-2 text-sm shadow-[var(--shadow-border-hover)]">
      <p className="mb-1 text-muted-foreground">{label}</p>
      <p className="text-income">مداخيل {formatDzd(income)}</p>
      <p className="text-expense">مصاريف {formatDzd(expense)}</p>
    </div>
  );
}

export function FlowChart({ data }: { data: FlowPoint[] }) {
  const hasSignal = useMemo(
    () => data.some((d) => d.income > 0 || d.expense > 0),
    [data],
  );

  if (!hasSignal) {
    return (
      <div className="flex h-56 items-center justify-center rounded-xl bg-card px-5 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
        ماكانش رسم حتى تسجّل حركات في الفترة هذه.
      </div>
    );
  }

  const tickCount = data.length > 12 ? 6 : data.length;

  return (
    <section className="min-w-0 overflow-hidden rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium">المداخيل والمصاريف</h2>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2 rounded-full bg-income" />
            مداخيل
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2 rounded-full bg-expense" />
            مصاريف
          </span>
        </div>
      </div>
      <div dir="ltr" className="h-56 w-full min-w-0 overflow-hidden sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="mizan-income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-income)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-income)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="mizan-expense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-expense)" stopOpacity={0.32} />
                <stop offset="100%" stopColor="var(--color-expense)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={28}
              tickCount={tickCount}
            />
            <YAxis
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={48}
              tickFormatter={(v: number) =>
                new Intl.NumberFormat("fr-DZ", { notation: "compact" }).format(v)
              }
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-border)" }} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="var(--color-income)"
              strokeWidth={2}
              fill="url(#mizan-income)"
              name="مداخيل"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="var(--color-expense)"
              strokeWidth={2}
              fill="url(#mizan-expense)"
              name="مصاريف"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
