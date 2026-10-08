import { formatDzd, type CategoryTotal, type Totals } from "@/lib/ledger/model";

export function Insights({
  totals,
  breakdown,
}: {
  totals: Totals;
  breakdown: CategoryTotal[];
}) {
  const top = breakdown[0];
  const adsShare = totals.expense === 0 ? null : totals.ads / totals.expense;

  const lines: string[] = [];
  if (totals.income === 0 && totals.expense === 0) {
    lines.push("مازال ما سجلت حتى حركة في هذه الفترة.");
  } else {
    if (totals.profit >= 0) {
      lines.push(`ربحك الصافي ${formatDzd(totals.profit)} في الفترة هذه.`);
    } else {
      lines.push(`خاسر ${formatDzd(totals.profit)} — المصاريف فوق المداخيل.`);
    }
    if (top) {
      lines.push(`أكبر باب مصروف: ${top.label} (${Math.round(top.share * 100)}%).`);
    }
    if (totals.roas !== null) {
      lines.push(
        `كل 1 دج إشهار رجّعلك ${totals.roas.toFixed(1)} دج مبيعات${adsShare !== null ? ` — الإشهار ${Math.round(adsShare * 100)}% من المصاريف` : ""}.`,
      );
    }
  }

  if (lines.length === 0) return null;

  return (
    <section className="rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]">
      <p className="text-xs font-medium tracking-wide text-muted-foreground">نظرة سريعة</p>
      <ul className="mt-3 space-y-2">
        {lines.map((line) => (
          <li key={line} className="text-sm leading-relaxed text-foreground">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
