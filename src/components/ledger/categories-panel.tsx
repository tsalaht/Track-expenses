import { formatDzd, type CategoryTotal } from "@/lib/ledger/model";

export function CategoriesPanel({ items }: { items: CategoryTotal[] }) {
  if (items.length === 0) {
    return (
      <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h2 className="text-sm font-medium">وين راحوا المصاريف</h2>
        <p className="mt-3 text-sm text-muted-foreground">مازال ما سجلت مصاريف في الفترة هذه.</p>
      </section>
    );
  }

  const max = items[0]?.amount ?? 1;

  return (
    <section className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
      <h2 className="text-sm font-medium">وين راحوا المصاريف</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          const width = Math.max(6, (item.amount / max) * 100);
          return (
            <li key={item.id}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="inline-flex items-center gap-2 text-foreground">
                  <Icon className="size-4 text-muted-foreground" />
                  {item.label}
                </span>
                <span dir="ltr" className="shrink-0 tabular-nums text-muted-foreground">
                  {formatDzd(item.amount)} · {Math.round(item.share * 100)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-expense/80"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
