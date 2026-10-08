import {
  Banknote,
  Megaphone,
  Package,
  Percent,
  RefreshCcw,
  ShoppingBag,
  Store,
  Truck,
  Undo2,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import {
  differenceInCalendarDays,
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { arDZ } from "date-fns/locale";

export type EntryType = "income" | "expense";

export type ExpenseCategory =
  | "products"
  | "ads"
  | "shipping"
  | "packaging"
  | "cod"
  | "returns"
  | "platform"
  | "stock"
  | "other";

export type IncomeCategory = "sales" | "refund" | "other";

export type CategoryId = ExpenseCategory | IncomeCategory;

export type LedgerEntry = {
  id: string;
  type: EntryType;
  category: CategoryId;
  amount: number;
  date: string;
  note: string;
  createdAt: number;
};

export type PeriodId = "last-30" | "this-month" | "last-month" | "year" | "all";

export type DateRange = { start: Date; end: Date; label: string };

export type CategoryMeta = {
  id: CategoryId;
  label: string;
  hint: string;
  icon: LucideIcon;
};

export const EXPENSE_CATEGORIES: CategoryMeta[] = [
  { id: "products", label: "شراء البضاعة", hint: "الكوست تاع السلعة", icon: ShoppingBag },
  { id: "ads", label: "الإشهار", hint: "فيسبوك، تيك توك، إنستغرام", icon: Megaphone },
  { id: "shipping", label: "التوصيل", hint: "ياليدين، ZR، مايسترو…", icon: Truck },
  { id: "packaging", label: "التغليف", hint: "أكياس، كرتون، لاصق", icon: Package },
  { id: "cod", label: "عمولة التوصيل", hint: "كاش أون ديليفري", icon: Percent },
  { id: "returns", label: "المرتجعات", hint: "طلبات رجعتلك", icon: Undo2 },
  { id: "platform", label: "رسوم المنصة", hint: "شوبيفاي، متجر…", icon: Store },
  { id: "stock", label: "تخزين وإيجار", hint: "مستودع، مكتب", icon: Warehouse },
  { id: "other", label: "مصروف آخر", hint: "أي حاجة خارجة", icon: Wallet },
];

export const INCOME_CATEGORIES: CategoryMeta[] = [
  { id: "sales", label: "مبيعات", hint: "الفلوس اللي دخلت من الطلبات", icon: Banknote },
  { id: "refund", label: "استرجاع مصروف", hint: "رجعولك دراهم", icon: RefreshCcw },
  { id: "other", label: "مدخول آخر", hint: "أي فلوس داخلة", icon: Wallet },
];

export const PERIODS: { id: PeriodId; label: string }[] = [
  { id: "last-30", label: "آخر 30 يوم" },
  { id: "this-month", label: "هذا الشهر" },
  { id: "last-month", label: "الشهر اللي فات" },
  { id: "year", label: "هذه السنة" },
  { id: "all", label: "الكل" },
];

export function categoriesFor(type: EntryType): CategoryMeta[] {
  return type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}

export function categoryMeta(type: EntryType, id: CategoryId): CategoryMeta {
  return (
    categoriesFor(type).find((c) => c.id === id) ??
    categoriesFor(type)[categoriesFor(type).length - 1]!
  );
}

export function formatDzd(value: number): string {
  const n = Math.round(Math.abs(value));
  return `${n.toLocaleString("fr-DZ")} دج`;
}

export function formatSignedDzd(value: number): string {
  if (value === 0) return formatDzd(0);
  const sign = value > 0 ? "+" : "−";
  return `${sign} ${formatDzd(value)}`;
}

export function formatDate(iso: string): string {
  const d = parseISODate(iso);
  return format(d, "d MMMM yyyy", { locale: arDZ });
}

export function formatShortDate(iso: string): string {
  const d = parseISODate(iso);
  return format(d, "d MMM", { locale: arDZ });
}

export function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function isoFromDate(date: Date): string {
  return todayISO(date);
}

export function daysAgoISO(days: number, now = new Date()): string {
  return isoFromDate(subDays(now, days));
}

export function getPeriodRange(id: PeriodId, now = new Date()): DateRange {
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  if (id === "last-30") {
    return { start: subDays(end, 29), end, label: "آخر 30 يوم" };
  }
  if (id === "this-month") {
    return { start: startOfMonth(now), end: endOfMonth(now), label: format(now, "MMMM yyyy", { locale: arDZ }) };
  }
  if (id === "last-month") {
    const prev = subMonths(now, 1);
    return {
      start: startOfMonth(prev),
      end: endOfMonth(prev),
      label: format(prev, "MMMM yyyy", { locale: arDZ }),
    };
  }
  if (id === "year") {
    return { start: startOfYear(now), end: endOfYear(now), label: String(now.getFullYear()) };
  }
  return { start: new Date(2000, 0, 1), end, label: "كل الفترة" };
}

export function getPreviousRange(id: PeriodId, now = new Date()): DateRange | null {
  if (id === "all") return null;
  const current = getPeriodRange(id, now);
  if (id === "last-30") {
    const end = subDays(current.start, 1);
    end.setHours(23, 59, 59, 999);
    return { start: subDays(end, 29), end, label: "الـ 30 يوم اللي قبل" };
  }
  if (id === "this-month") return getPeriodRange("last-month", now);
  if (id === "last-month") {
    const prev = subMonths(now, 2);
    return {
      start: startOfMonth(prev),
      end: endOfMonth(prev),
      label: format(prev, "MMMM yyyy", { locale: arDZ }),
    };
  }
  const prevYear = new Date(now.getFullYear() - 1, 0, 1);
  return {
    start: startOfYear(prevYear),
    end: endOfYear(prevYear),
    label: String(prevYear.getFullYear()),
  };
}

export function inRange(iso: string, range: DateRange): boolean {
  const d = parseISODate(iso);
  return d >= range.start && d <= range.end;
}

export function filterEntries(entries: LedgerEntry[], range: DateRange): LedgerEntry[] {
  return entries.filter((e) => inRange(e.date, range));
}

export function sumByType(entries: LedgerEntry[], type: EntryType): number {
  return entries.reduce((acc, e) => acc + (e.type === type ? e.amount : 0), 0);
}

export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export type Totals = {
  income: number;
  expense: number;
  profit: number;
  margin: number | null;
  ads: number;
  roas: number | null;
};

export function computeTotals(entries: LedgerEntry[]): Totals {
  const income = sumByType(entries, "income");
  const expense = sumByType(entries, "expense");
  const profit = income - expense;
  const ads = entries
    .filter((e) => e.type === "expense" && e.category === "ads")
    .reduce((a, e) => a + e.amount, 0);
  return {
    income,
    expense,
    profit,
    margin: income === 0 ? null : profit / income,
    ads,
    roas: ads === 0 ? null : income / ads,
  };
}

export type CategoryTotal = {
  id: CategoryId;
  label: string;
  amount: number;
  share: number;
  icon: LucideIcon;
};

export function expenseBreakdown(entries: LedgerEntry[]): CategoryTotal[] {
  const expenses = entries.filter((e) => e.type === "expense");
  const total = sumByType(expenses, "expense");
  const map = new Map<CategoryId, number>();
  for (const e of expenses) {
    map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
  }
  return EXPENSE_CATEGORIES.map((c) => {
    const amount = map.get(c.id) ?? 0;
    return {
      id: c.id,
      label: c.label,
      amount,
      share: total === 0 ? 0 : amount / total,
      icon: c.icon,
    };
  })
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

export type FlowPoint = { key: string; label: string; income: number; expense: number };

export function flowSeries(entries: LedgerEntry[], range: DateRange, period: PeriodId): FlowPoint[] {
  const span = Math.max(1, differenceInCalendarDays(range.end, range.start) + 1);
  const monthly = period === "year" || period === "all" || span > 45;
  const buckets = new Map<string, FlowPoint>();

  const ensure = (key: string, label: string) => {
    let row = buckets.get(key);
    if (!row) {
      row = { key, label, income: 0, expense: 0 };
      buckets.set(key, row);
    }
    return row;
  };

  if (monthly) {
    const cursor = new Date(range.start.getFullYear(), range.start.getMonth(), 1);
    const last = new Date(range.end.getFullYear(), range.end.getMonth(), 1);
    while (cursor <= last) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
      ensure(key, format(cursor, "MMM yyyy", { locale: arDZ }));
      cursor.setMonth(cursor.getMonth() + 1);
    }
    for (const e of entries) {
      const d = parseISODate(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const row = buckets.get(key);
      if (!row) continue;
      if (e.type === "income") row.income += e.amount;
      else row.expense += e.amount;
    }
  } else {
    const cursor = new Date(range.start);
    cursor.setHours(0, 0, 0, 0);
    const last = new Date(range.end);
    last.setHours(0, 0, 0, 0);
    while (cursor <= last) {
      const key = isoFromDate(cursor);
      ensure(key, format(cursor, "d MMM", { locale: arDZ }));
      cursor.setDate(cursor.getDate() + 1);
    }
    for (const e of entries) {
      const row = buckets.get(e.date);
      if (!row) continue;
      if (e.type === "income") row.income += e.amount;
      else row.expense += e.amount;
    }
  }

  return [...buckets.values()];
}

type SeedRow = [daysAgo: number, type: EntryType, category: CategoryId, amount: number, note: string];

const SEED_PATTERN: SeedRow[] = [
  [1, "income", "sales", 21400, "مبيعات إنستغرام — 6 طلبات"],
  [1, "expense", "shipping", 3300, "ياليدين — تجميع اليوم"],
  [2, "expense", "ads", 6500, "إشهار فيسبوك — ستوري"],
  [3, "income", "sales", 17800, "مبيعات تيك توك"],
  [4, "expense", "packaging", 2400, "أكياس وكروتونة"],
  [5, "income", "sales", 25600, "مبيعات الويكاند"],
  [5, "expense", "cod", 1800, "عمولة الدفع عند الاستلام"],
  [6, "expense", "ads", 8200, "حملة رييلز"],
  [7, "expense", "products", 42000, "شراء سلعة من المورد"],
  [8, "income", "sales", 19200, "طلبات الواتساب"],
  [9, "expense", "returns", 3900, "طلبين ترجعوا — وهران"],
  [10, "income", "sales", 22100, "مبيعات إنستغرام"],
  [11, "expense", "shipping", 6100, "فاتورة ZR Express"],
  [12, "expense", "ads", 5400, "إشهار إنستغرام"],
  [13, "income", "sales", 16800, "مبيعات اليوم"],
  [14, "expense", "platform", 3200, "اشتراك المتجر الإلكتروني"],
  [15, "income", "sales", 28400, "حملة الجمعة"],
  [16, "expense", "ads", 9100, "إشهار فيسبوك — تحويلات"],
  [17, "income", "sales", 14700, "مبيعات عادية"],
  [18, "expense", "packaging", 1600, "شريط لاصق وورق"],
  [19, "expense", "shipping", 4800, "ياليدين — الأسبوع"],
  [20, "income", "sales", 23900, "طلبات العاصمة وسطيف"],
  [21, "expense", "products", 28500, "تجديد المخزون — عطور"],
  [22, "income", "refund", 2200, "استرجاع مصروف إشهار"],
  [23, "expense", "ads", 4700, "بوستات ممولة"],
  [24, "income", "sales", 20100, "مبيعات إنستغرام"],
  [26, "expense", "cod", 2100, "عمولات التوصيل"],
  [27, "income", "sales", 17300, "مبيعات تيك توك"],
  [28, "expense", "returns", 2700, "مرتجع قسنطينة"],
  [30, "expense", "stock", 8000, "كراء ركن التخزين"],
  [32, "income", "sales", 19800, "مبيعات الأسبوع"],
  [35, "expense", "ads", 7600, "إشهار بداية الشهر"],
  [36, "income", "sales", 15400, "طلبات واتساب"],
  [38, "expense", "shipping", 3900, "توصيل مجموعة طلبات"],
  [40, "expense", "products", 31200, "شراء بضاعة"],
  [42, "income", "sales", 22600, "مبيعات"],
];

export function createDemoEntries(now = new Date()): LedgerEntry[] {
  const createdAt = now.getTime();
  return SEED_PATTERN.map((row, i) => {
    const [ago, type, category, amount, note] = row;
    return {
      id: `demo-${i + 1}`,
      type,
      category,
      amount,
      note,
      date: daysAgoISO(ago, now),
      createdAt: createdAt - ago * 86_400_000,
    };
  });
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `e-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function parseAmountInput(raw: string): number | null {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}
