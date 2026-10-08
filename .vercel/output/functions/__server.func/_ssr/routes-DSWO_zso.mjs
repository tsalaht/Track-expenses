import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, N as require_jsx_runtime, a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as Banknote, _ as Pencil, a as Truck, b as Ellipsis, c as TrendingDown, d as ShoppingBag, f as Search, g as Percent, h as Plus, i as Undo2, l as Trash2, m as RefreshCcw, n as Warehouse, p as RotateCcw, r as Wallet, s as TrendingUp, t as X, u as Store, v as Package, x as Download, y as Megaphone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as startOfYear, c as endOfMonth, i as format, l as differenceInCalendarDays, n as subMonths, o as endOfYear, r as subDays, s as startOfMonth, t as arDZ } from "../_libs/date-fns.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as Separator2, i as Root2$1, n as Item2, o as Trigger, r as Portal2$1, t as Content2$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DSWO_zso.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function ScaleMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-primary", className),
		fill: "none",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M15.2 3.2h1.6v4.2h-1.6z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5.5",
				y: "7.2",
				width: "21",
				height: "1.6",
				rx: "0.6",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				d: "M10 8.8v5.4M22 8.8v5.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "10",
				cy: "16.4",
				rx: "4.4",
				ry: "2.2",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "22",
				cy: "16.4",
				rx: "4.4",
				ry: "2.2",
				stroke: "currentColor",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M15.25 8.6h1.5v13.2h-1.5z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "11.4",
				y: "23.2",
				width: "9.2",
				height: "1.5",
				rx: "0.4",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9.6",
				y: "24.7",
				width: "12.8",
				height: "1.6",
				rx: "0.4",
				fill: "currentColor"
			})
		]
	});
}
var EXPENSE_CATEGORIES = [
	{
		id: "products",
		label: "شراء البضاعة",
		hint: "الكوست تاع السلعة",
		icon: ShoppingBag
	},
	{
		id: "ads",
		label: "الإشهار",
		hint: "فيسبوك، تيك توك، إنستغرام",
		icon: Megaphone
	},
	{
		id: "shipping",
		label: "التوصيل",
		hint: "ياليدين، ZR، مايسترو…",
		icon: Truck
	},
	{
		id: "packaging",
		label: "التغليف",
		hint: "أكياس، كرتون، لاصق",
		icon: Package
	},
	{
		id: "cod",
		label: "عمولة التوصيل",
		hint: "كاش أون ديليفري",
		icon: Percent
	},
	{
		id: "returns",
		label: "المرتجعات",
		hint: "طلبات رجعتلك",
		icon: Undo2
	},
	{
		id: "platform",
		label: "رسوم المنصة",
		hint: "شوبيفاي، متجر…",
		icon: Store
	},
	{
		id: "stock",
		label: "تخزين وإيجار",
		hint: "مستودع، مكتب",
		icon: Warehouse
	},
	{
		id: "other",
		label: "مصروف آخر",
		hint: "أي حاجة خارجة",
		icon: Wallet
	}
];
var INCOME_CATEGORIES = [
	{
		id: "sales",
		label: "مبيعات",
		hint: "الفلوس اللي دخلت من الطلبات",
		icon: Banknote
	},
	{
		id: "refund",
		label: "استرجاع مصروف",
		hint: "رجعولك دراهم",
		icon: RefreshCcw
	},
	{
		id: "other",
		label: "مدخول آخر",
		hint: "أي فلوس داخلة",
		icon: Wallet
	}
];
var PERIODS = [
	{
		id: "last-30",
		label: "آخر 30 يوم"
	},
	{
		id: "this-month",
		label: "هذا الشهر"
	},
	{
		id: "last-month",
		label: "الشهر اللي فات"
	},
	{
		id: "year",
		label: "هذه السنة"
	},
	{
		id: "all",
		label: "الكل"
	}
];
function categoriesFor(type) {
	return type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}
function categoryMeta(type, id) {
	return categoriesFor(type).find((c) => c.id === id) ?? categoriesFor(type)[categoriesFor(type).length - 1];
}
function formatDzd(value) {
	return `${Math.round(Math.abs(value)).toLocaleString("fr-DZ")} دج`;
}
function formatSignedDzd(value) {
	if (value === 0) return formatDzd(0);
	return `${value > 0 ? "+" : "−"} ${formatDzd(value)}`;
}
function formatDate(iso) {
	const d = parseISODate(iso);
	return format(d, "d MMMM yyyy", { locale: arDZ });
}
function todayISO(now = /* @__PURE__ */ new Date()) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function parseISODate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}
function isoFromDate(date) {
	return todayISO(date);
}
function daysAgoISO(days, now = /* @__PURE__ */ new Date()) {
	return isoFromDate(subDays(now, days));
}
function getPeriodRange(id, now = /* @__PURE__ */ new Date()) {
	const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
	if (id === "last-30") return {
		start: subDays(end, 29),
		end,
		label: "آخر 30 يوم"
	};
	if (id === "this-month") return {
		start: startOfMonth(now),
		end: endOfMonth(now),
		label: format(now, "MMMM yyyy", { locale: arDZ })
	};
	if (id === "last-month") {
		const prev = subMonths(now, 1);
		return {
			start: startOfMonth(prev),
			end: endOfMonth(prev),
			label: format(prev, "MMMM yyyy", { locale: arDZ })
		};
	}
	if (id === "year") return {
		start: startOfYear(now),
		end: endOfYear(now),
		label: String(now.getFullYear())
	};
	return {
		start: new Date(2e3, 0, 1),
		end,
		label: "كل الفترة"
	};
}
function getPreviousRange(id, now = /* @__PURE__ */ new Date()) {
	if (id === "all") return null;
	const current = getPeriodRange(id, now);
	if (id === "last-30") {
		const end = subDays(current.start, 1);
		end.setHours(23, 59, 59, 999);
		return {
			start: subDays(end, 29),
			end,
			label: "الـ 30 يوم اللي قبل"
		};
	}
	if (id === "this-month") return getPeriodRange("last-month", now);
	if (id === "last-month") {
		const prev = subMonths(now, 2);
		return {
			start: startOfMonth(prev),
			end: endOfMonth(prev),
			label: format(prev, "MMMM yyyy", { locale: arDZ })
		};
	}
	const prevYear = new Date(now.getFullYear() - 1, 0, 1);
	return {
		start: startOfYear(prevYear),
		end: endOfYear(prevYear),
		label: String(prevYear.getFullYear())
	};
}
function inRange(iso, range) {
	const d = parseISODate(iso);
	return d >= range.start && d <= range.end;
}
function filterEntries(entries, range) {
	return entries.filter((e) => inRange(e.date, range));
}
function sumByType(entries, type) {
	return entries.reduce((acc, e) => acc + (e.type === type ? e.amount : 0), 0);
}
function computeTotals(entries) {
	const income = sumByType(entries, "income");
	const expense = sumByType(entries, "expense");
	const profit = income - expense;
	const ads = entries.filter((e) => e.type === "expense" && e.category === "ads").reduce((a, e) => a + e.amount, 0);
	return {
		income,
		expense,
		profit,
		margin: income === 0 ? null : profit / income,
		ads,
		roas: ads === 0 ? null : income / ads
	};
}
function expenseBreakdown(entries) {
	const expenses = entries.filter((e) => e.type === "expense");
	const total = sumByType(expenses, "expense");
	const map = /* @__PURE__ */ new Map();
	for (const e of expenses) map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
	return EXPENSE_CATEGORIES.map((c) => {
		const amount = map.get(c.id) ?? 0;
		return {
			id: c.id,
			label: c.label,
			amount,
			share: total === 0 ? 0 : amount / total,
			icon: c.icon
		};
	}).filter((c) => c.amount > 0).sort((a, b) => b.amount - a.amount);
}
function flowSeries(entries, range, period) {
	const span = Math.max(1, differenceInCalendarDays(range.end, range.start) + 1);
	const monthly = period === "year" || period === "all" || span > 45;
	const buckets = /* @__PURE__ */ new Map();
	const ensure = (key, label) => {
		let row = buckets.get(key);
		if (!row) {
			row = {
				key,
				label,
				income: 0,
				expense: 0
			};
			buckets.set(key, row);
		}
		return row;
	};
	if (monthly) {
		const cursor = new Date(range.start.getFullYear(), range.start.getMonth(), 1);
		const last = new Date(range.end.getFullYear(), range.end.getMonth(), 1);
		while (cursor <= last) {
			ensure(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`, format(cursor, "MMM yyyy", { locale: arDZ }));
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
			ensure(isoFromDate(cursor), format(cursor, "d MMM", { locale: arDZ }));
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
var SEED_PATTERN = [
	[
		1,
		"income",
		"sales",
		21400,
		"مبيعات إنستغرام — 6 طلبات"
	],
	[
		1,
		"expense",
		"shipping",
		3300,
		"ياليدين — تجميع اليوم"
	],
	[
		2,
		"expense",
		"ads",
		6500,
		"إشهار فيسبوك — ستوري"
	],
	[
		3,
		"income",
		"sales",
		17800,
		"مبيعات تيك توك"
	],
	[
		4,
		"expense",
		"packaging",
		2400,
		"أكياس وكروتونة"
	],
	[
		5,
		"income",
		"sales",
		25600,
		"مبيعات الويكاند"
	],
	[
		5,
		"expense",
		"cod",
		1800,
		"عمولة الدفع عند الاستلام"
	],
	[
		6,
		"expense",
		"ads",
		8200,
		"حملة رييلز"
	],
	[
		7,
		"expense",
		"products",
		42e3,
		"شراء سلعة من المورد"
	],
	[
		8,
		"income",
		"sales",
		19200,
		"طلبات الواتساب"
	],
	[
		9,
		"expense",
		"returns",
		3900,
		"طلبين ترجعوا — وهران"
	],
	[
		10,
		"income",
		"sales",
		22100,
		"مبيعات إنستغرام"
	],
	[
		11,
		"expense",
		"shipping",
		6100,
		"فاتورة ZR Express"
	],
	[
		12,
		"expense",
		"ads",
		5400,
		"إشهار إنستغرام"
	],
	[
		13,
		"income",
		"sales",
		16800,
		"مبيعات اليوم"
	],
	[
		14,
		"expense",
		"platform",
		3200,
		"اشتراك المتجر الإلكتروني"
	],
	[
		15,
		"income",
		"sales",
		28400,
		"حملة الجمعة"
	],
	[
		16,
		"expense",
		"ads",
		9100,
		"إشهار فيسبوك — تحويلات"
	],
	[
		17,
		"income",
		"sales",
		14700,
		"مبيعات عادية"
	],
	[
		18,
		"expense",
		"packaging",
		1600,
		"شريط لاصق وورق"
	],
	[
		19,
		"expense",
		"shipping",
		4800,
		"ياليدين — الأسبوع"
	],
	[
		20,
		"income",
		"sales",
		23900,
		"طلبات العاصمة وسطيف"
	],
	[
		21,
		"expense",
		"products",
		28500,
		"تجديد المخزون — عطور"
	],
	[
		22,
		"income",
		"refund",
		2200,
		"استرجاع مصروف إشهار"
	],
	[
		23,
		"expense",
		"ads",
		4700,
		"بوستات ممولة"
	],
	[
		24,
		"income",
		"sales",
		20100,
		"مبيعات إنستغرام"
	],
	[
		26,
		"expense",
		"cod",
		2100,
		"عمولات التوصيل"
	],
	[
		27,
		"income",
		"sales",
		17300,
		"مبيعات تيك توك"
	],
	[
		28,
		"expense",
		"returns",
		2700,
		"مرتجع قسنطينة"
	],
	[
		30,
		"expense",
		"stock",
		8e3,
		"كراء ركن التخزين"
	],
	[
		32,
		"income",
		"sales",
		19800,
		"مبيعات الأسبوع"
	],
	[
		35,
		"expense",
		"ads",
		7600,
		"إشهار بداية الشهر"
	],
	[
		36,
		"income",
		"sales",
		15400,
		"طلبات واتساب"
	],
	[
		38,
		"expense",
		"shipping",
		3900,
		"توصيل مجموعة طلبات"
	],
	[
		40,
		"expense",
		"products",
		31200,
		"شراء بضاعة"
	],
	[
		42,
		"income",
		"sales",
		22600,
		"مبيعات"
	]
];
function createDemoEntries(now = /* @__PURE__ */ new Date()) {
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
			createdAt: createdAt - ago * 864e5
		};
	});
}
function newId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `e-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function parseAmountInput(raw) {
	const digits = raw.replace(/[^\d]/g, "");
	if (!digits) return null;
	const n = Number(digits);
	if (!Number.isFinite(n) || n <= 0) return null;
	return n;
}
function Delta({ value }) {
	if (value === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-muted-foreground",
		children: "ماكانش مقارنة"
	});
	const up = value > 0;
	const flat = value === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 text-xs tabular-nums", flat && "text-muted-foreground", !flat && up && "text-income", !flat && !up && "text-expense"),
		children: [flat ? null : up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-3.5" }), flat ? "ثابت على الفترة اللي قبل" : `${up ? "+" : "−"}${Math.abs(value).toFixed(0)}% على اللي قبل`]
	});
}
function Card({ item, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("flex min-h-32 flex-col justify-between rounded-xl bg-card p-5 shadow-[var(--shadow-border)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: item.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				dir: "ltr",
				className: cn("mt-3 font-medium tabular-nums tracking-tight text-2xl leading-tight sm:text-3xl", item.tone === "income" && "text-income", item.tone === "expense" && "text-expense", item.tone === "neutral" && (item.value < 0 ? "text-expense" : "text-foreground")),
				children: item.signed ? formatSignedDzd(item.value) : formatDzd(item.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: item.hint
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, { value: item.delta })]
			})
		]
	});
}
function KpiGrid({ current, previous }) {
	const incomeDelta = previous === null ? null : previous.income === 0 && current.income === 0 ? 0 : previous.income === 0 ? null : (current.income - previous.income) / previous.income * 100;
	const expenseDelta = previous === null ? null : previous.expense === 0 && current.expense === 0 ? 0 : previous.expense === 0 ? null : (current.expense - previous.expense) / previous.expense * 100;
	const profitDelta = previous === null ? null : previous.profit === 0 && current.profit === 0 ? 0 : previous.profit === 0 ? null : (current.profit - previous.profit) / Math.abs(previous.profit) * 100;
	const items = [
		{
			label: "المداخيل",
			value: current.income,
			hint: "شحال دخل للخزنة",
			tone: "income",
			delta: incomeDelta
		},
		{
			label: "المصاريف",
			value: current.expense,
			hint: "شحال خرج من اليد",
			tone: "expense",
			delta: expenseDelta
		},
		{
			label: "الربح الصافي",
			value: current.profit,
			hint: current.margin === null ? "هامش الربح ما يتّحسبش بلا مداخيل" : `هامش الربح ${Math.round(current.margin * 100)}%`,
			tone: "neutral",
			signed: true,
			delta: profitDelta
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid gap-3 sm:grid-cols-3",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { item }, item.label))
	});
}
function Insights({ totals, breakdown }) {
	const top = breakdown[0];
	const adsShare = totals.expense === 0 ? null : totals.ads / totals.expense;
	const lines = [];
	if (totals.income === 0 && totals.expense === 0) lines.push("مازال ما سجلت حتى حركة في هذه الفترة.");
	else {
		if (totals.profit >= 0) lines.push(`ربحك الصافي ${formatDzd(totals.profit)} في الفترة هذه.`);
		else lines.push(`خاسر ${formatDzd(totals.profit)} — المصاريف فوق المداخيل.`);
		if (top) lines.push(`أكبر باب مصروف: ${top.label} (${Math.round(top.share * 100)}%).`);
		if (totals.roas !== null) lines.push(`كل 1 دج إشهار رجّعلك ${totals.roas.toFixed(1)} دج مبيعات${adsShare !== null ? ` — الإشهار ${Math.round(adsShare * 100)}% من المصاريف` : ""}.`);
	}
	if (lines.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card px-5 py-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium tracking-wide text-muted-foreground",
			children: "نظرة سريعة"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm leading-relaxed text-foreground",
				children: line
			}, line))
		})]
	});
}
function ChartTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	const income = payload.find((p) => p.dataKey === "income")?.value ?? 0;
	const expense = payload.find((p) => p.dataKey === "expense")?.value ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-popover px-3 py-2 text-sm shadow-[var(--shadow-border-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-income",
				children: ["مداخيل ", formatDzd(income)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-expense",
				children: ["مصاريف ", formatDzd(expense)]
			})
		]
	});
}
function FlowChart({ data }) {
	if (!(0, import_react.useMemo)(() => data.some((d) => d.income > 0 || d.expense > 0), [data])) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-56 items-center justify-center rounded-xl bg-card px-5 text-sm text-muted-foreground shadow-[var(--shadow-border)]",
		children: "ماكانش رسم حتى تسجّل حركات في الفترة هذه."
	});
	const tickCount = data.length > 12 ? 6 : data.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-w-0 overflow-hidden rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "المداخيل والمصاريف"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2 rounded-full bg-income" }), "مداخيل"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2 rounded-full bg-expense" }), "مصاريف"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			dir: "ltr",
			className: "h-56 w-full min-w-0 overflow-hidden sm:h-64",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data,
					margin: {
						top: 8,
						right: 8,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "mizan-income",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--color-income)",
								stopOpacity: .35
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--color-income)",
								stopOpacity: .02
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "mizan-expense",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--color-expense)",
								stopOpacity: .32
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--color-expense)",
								stopOpacity: .02
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "var(--color-border)",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "label",
							tick: {
								fill: "var(--color-muted-foreground)",
								fontSize: 11
							},
							tickLine: false,
							axisLine: false,
							interval: "preserveStartEnd",
							minTickGap: 28,
							tickCount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "var(--color-muted-foreground)",
								fontSize: 11
							},
							tickLine: false,
							axisLine: false,
							width: 48,
							tickFormatter: (v) => new Intl.NumberFormat("fr-DZ", { notation: "compact" }).format(v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {}),
							cursor: { stroke: "var(--color-border)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "income",
							stroke: "var(--color-income)",
							strokeWidth: 2,
							fill: "url(#mizan-income)",
							name: "مداخيل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "expense",
							stroke: "var(--color-expense)",
							strokeWidth: 2,
							fill: "url(#mizan-expense)",
							name: "مصاريف"
						})
					]
				})
			})
		})]
	});
}
function CategoriesPanel({ items }) {
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium",
			children: "وين راحوا المصاريف"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "مازال ما سجلت مصاريف في الفترة هذه."
		})]
	});
	const max = items[0]?.amount ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium",
			children: "وين راحوا المصاريف"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: items.map((item) => {
				const Icon = item.icon;
				const width = Math.max(6, item.amount / max * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted-foreground" }), item.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						dir: "ltr",
						className: "shrink-0 tabular-nums text-muted-foreground",
						children: [
							formatDzd(item.amount),
							" · ",
							Math.round(item.share * 100),
							"%"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-expense/80",
						style: { width: `${width}%` }
					})
				})] }, item.id);
			})
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 enabled:active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:bg-accent",
			ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
			destructive: "bg-destructive/15 text-destructive hover:bg-destructive/25",
			income: "bg-income text-background hover:bg-income/90",
			expense: "bg-expense text-background hover:bg-expense/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11",
			pill: "h-9 rounded-full px-3.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, type = "button", asChild = false, ...props }, ref) => {
	const classNames = cn(buttonVariants({
		variant,
		size
	}), className);
	if (asChild) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		ref,
		className: classNames,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: classNames,
		...props
	});
});
Button.displayName = "Button";
var Input = (0, import_react.forwardRef)(({ className, type = "text", ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		type,
		className: cn("flex h-11 w-full rounded-md bg-muted px-3 text-base text-foreground shadow-[inset_0_0_0_1px_var(--color-input)] transition-[box-shadow,background-color] duration-150 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-ring)] disabled:opacity-50", className),
		...props
	});
});
Input.displayName = "Input";
var useLedgerStore = create()(persist((set) => ({
	entries: createDemoEntries(),
	addEntry: (draft) => set((state) => ({ entries: [{
		...draft,
		id: newId(),
		createdAt: Date.now()
	}, ...state.entries] })),
	updateEntry: (id, draft) => set((state) => ({ entries: state.entries.map((e) => e.id === id ? {
		...e,
		...draft
	} : e) })),
	removeEntry: (id) => set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
	loadDemo: () => set({ entries: createDemoEntries() }),
	clearAll: () => set({ entries: [] })
}), {
	name: "mizan-ledger-v1",
	partialize: (state) => ({ entries: state.entries }),
	skipHydration: true
}));
var TYPE_FILTERS = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "income",
		label: "مداخيل"
	},
	{
		id: "expense",
		label: "مصاريف"
	}
];
function TransactionList({ entries, onEdit }) {
	const removeEntry = useLedgerStore((s) => s.removeEntry);
	const [query, setQuery] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim();
		return [...entries].filter((e) => type === "all" ? true : e.type === type).filter((e) => {
			if (!q) return true;
			const meta = categoryMeta(e.type, e.category);
			return `${e.note} ${meta.label}`.includes(q);
		}).sort((a, b) => a.date === b.date ? b.createdAt - a.createdAt : b.date.localeCompare(a.date));
	}, [
		entries,
		query,
		type
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "الحركات"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "ابحث في الملاحظات والأبواب",
						className: "h-10 ps-9 sm:w-64"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-md bg-muted p-1",
					children: TYPE_FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setType(f.id),
						className: cn("h-8 flex-1 rounded-sm px-3 text-xs font-medium transition-colors sm:flex-none", type === f.id ? "bg-card text-foreground shadow-[var(--shadow-border)]" : "text-muted-foreground hover:text-foreground"),
						children: f.label
					}, f.id))
				})]
			})]
		}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 py-6 text-center text-sm text-muted-foreground",
			children: "ماكانش حركات تطابق البحث."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border",
			children: filtered.map((entry) => {
				const meta = categoryMeta(entry.type, entry.category);
				const Icon = meta.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex min-w-0 items-center gap-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex size-10 shrink-0 items-center justify-center rounded-md", entry.type === "income" ? "bg-income/15 text-income" : "bg-expense/15 text-expense"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: meta.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [formatDate(entry.date), entry.note ? ` · ${entry.note}` : ""]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							dir: "ltr",
							className: cn("shrink-0 text-sm font-medium tabular-nums", entry.type === "income" ? "text-income" : "text-expense"),
							children: [
								entry.type === "income" ? "+" : "−",
								" ",
								formatDzd(entry.amount)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-10",
								onClick: () => onEdit(entry),
								"aria-label": "تعديل",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-10",
								onClick: () => {
									removeEntry(entry.id);
									toast.success("تمسح الحركة");
								},
								"aria-label": "حذف",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})
					]
				}, entry.id);
			})
		})]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 flex w-full flex-col gap-4 border border-border bg-card p-5 text-card-foreground shadow-[var(--shadow-border-hover)] duration-200", "inset-x-0 bottom-0 max-h-dvh rounded-t-xl", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4", "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:max-h-dvh sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:p-6", "sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 left-4 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "إغلاق"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 pe-8 text-right", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-start", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-lg font-semibold leading-snug", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var Label = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-sm font-medium text-muted-foreground", className),
	...props
}));
Label.displayName = "Label";
function EntryDialog({ intent, onClose }) {
	const addEntry = useLedgerStore((s) => s.addEntry);
	const updateEntry = useLedgerStore((s) => s.updateEntry);
	const open = intent !== null;
	const [type, setType] = (0, import_react.useState)("expense");
	const [category, setCategory] = (0, import_react.useState)("products");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!intent) return;
		if (intent.mode === "edit" && intent.entry) {
			const e = intent.entry;
			setType(e.type);
			setCategory(e.category);
			setAmount(String(e.amount));
			setDate(e.date);
			setNote(e.note);
			return;
		}
		const nextType = intent.type;
		const cats = categoriesFor(nextType);
		setType(nextType);
		setCategory(cats[0].id);
		setAmount("");
		setDate(todayISO());
		setNote("");
	}, [intent]);
	const cats = (0, import_react.useMemo)(() => categoriesFor(type), [type]);
	function onTypeChange(next) {
		setType(next);
		const nextCats = categoriesFor(next);
		if (!nextCats.some((c) => c.id === category)) setCategory(nextCats[0].id);
	}
	function submit(e) {
		e.preventDefault();
		const parsed = parseAmountInput(amount);
		if (parsed === null) {
			toast.error("أكتب المبلغ بالدينار");
			return;
		}
		const draft = {
			type,
			category,
			amount: parsed,
			date,
			note: note.trim()
		};
		if (intent?.mode === "edit" && intent.entry) {
			updateEntry(intent.entry.id, draft);
			toast.success("تعدّلت الحركة");
		} else {
			addEntry(draft);
			toast.success(type === "income" ? "تسجّل المدخول" : "تسجّل المصروف");
		}
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "flex min-h-0 flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: intent?.mode === "edit" ? "تعديل الحركة" : type === "income" ? "مدخول جديد" : "مصروف جديد" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "سجّل اللي دخل ولا اللي خرج. المبلغ بالدينار الجزائري." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 space-y-4 overflow-y-auto pe-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 rounded-lg bg-muted p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onTypeChange("expense"),
								className: cn("h-10 rounded-md text-sm font-medium transition-colors", type === "expense" ? "bg-card text-expense shadow-[var(--shadow-border)]" : "text-muted-foreground hover:text-foreground"),
								children: "مصروف"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onTypeChange("income"),
								className: cn("h-10 rounded-md text-sm font-medium transition-colors", type === "income" ? "bg-card text-income shadow-[var(--shadow-border)]" : "text-muted-foreground hover:text-foreground"),
								children: "مدخول"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "amount",
								children: "المبلغ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "amount",
									inputMode: "numeric",
									dir: "ltr",
									autoComplete: "off",
									placeholder: "2500",
									value: amount,
									onChange: (ev) => setAmount(ev.target.value),
									className: "ps-12 text-left text-lg tabular-nums"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground",
									children: "دج"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الباب" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
								children: cats.map((c) => {
									const Icon = c.icon;
									const selected = category === c.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setCategory(c.id),
										className: cn("flex h-auto min-h-11 flex-col items-start gap-1 rounded-md px-3 py-2 text-right transition-colors", selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-accent"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 text-sm font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), c.label]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-xs", selected ? "text-primary-foreground/70" : "text-muted-foreground"),
											children: c.hint
										})]
									}, c.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "date",
									children: "التاريخ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "date",
									type: "date",
									dir: "ltr",
									value: date,
									onChange: (ev) => setDate(ev.target.value),
									className: "text-left"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 sm:col-span-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "note",
									children: "ملاحظة (اختياري)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "note",
									placeholder: "مثال: ياليدين، حملة رييلز…",
									value: note,
									onChange: (ev) => setNote(ev.target.value)
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full sm:w-auto",
					children: intent?.mode === "edit" ? "حفظ التعديل" : "سجّل"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: onClose,
					className: "w-full sm:w-auto",
					children: "إلغاء"
				})] })
			]
		}) })
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		className: cn("fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed z-50 w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-border-hover)]", "top-1/2 left-1/2 mx-4 -translate-x-1/2 -translate-y-1/2", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2 text-right", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-start", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("text-lg font-semibold", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm leading-relaxed text-muted-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 8, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		sideOffset,
		className: cn("z-50 min-w-48 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-border-hover)]", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2.5 text-sm outline-none select-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-40", inset && "ps-8", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function exportCsv(entries) {
	const csv = [[
		"التاريخ",
		"النوع",
		"الباب",
		"المبلغ",
		"ملاحظة"
	], ...entries.map((e) => [
		e.date,
		e.type === "income" ? "مدخول" : "مصروف",
		categoryMeta(e.type, e.category).label,
		String(e.amount),
		e.note.replaceAll("\"", "\"\"")
	])].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
	const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `mizan-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
	a.click();
	URL.revokeObjectURL(url);
}
function LedgerHome() {
	const entries = useLedgerStore((s) => s.entries);
	const loadDemo = useLedgerStore((s) => s.loadDemo);
	const clearAll = useLedgerStore((s) => s.clearAll);
	const [period, setPeriod] = (0, import_react.useState)("last-30");
	const [intent, setIntent] = (0, import_react.useState)(null);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useLedgerStore.persist.rehydrate();
	}, []);
	const range = (0, import_react.useMemo)(() => getPeriodRange(period), [period]);
	const prevRange = (0, import_react.useMemo)(() => getPreviousRange(period), [period]);
	const visible = (0, import_react.useMemo)(() => filterEntries(entries, range), [entries, range]);
	const prevVisible = (0, import_react.useMemo)(() => prevRange ? filterEntries(entries, prevRange) : [], [entries, prevRange]);
	const totals = (0, import_react.useMemo)(() => computeTotals(visible), [visible]);
	const prevTotals = prevRange ? computeTotals(prevVisible) : null;
	const breakdown = (0, import_react.useMemo)(() => expenseBreakdown(visible), [visible]);
	const series = (0, import_react.useMemo)(() => flowSeries(visible, range, period), [
		visible,
		range,
		period
	]);
	const isDemo = entries.some((e) => e.id.startsWith("demo-"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-x-hidden pb-28 sm:pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-lg bg-card shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleMark, { className: "size-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-semibold leading-tight",
							children: "ميزان"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "دفتر مصاريف ومداخيل تجارتك"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "hidden sm:inline-flex",
								variant: "secondary",
								onClick: () => setIntent({
									mode: "create",
									type: "expense"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "مصروف"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "hidden sm:inline-flex",
								onClick: () => setIntent({
									mode: "create",
									type: "income"
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "مدخول"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									"aria-label": "المزيد",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "start",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => {
											exportCsv(visible);
											toast.success("تنزّل ملف الإكسل");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "صدّر الفترة CSV"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => {
											loadDemo();
											toast.success("تحمّل المثال");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "رجّع المثال"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										className: "text-destructive focus:text-destructive",
										onSelect: () => setConfirmClear(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "امسح كلشي"]
									})
								]
							})] })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-4 px-4 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rise-in w-full min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 overflow-x-auto pb-1",
							children: PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPeriod(p.id),
								className: cn("h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors", period === p.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground shadow-[var(--shadow-border)] hover:text-foreground"),
								children: p.label
							}, p.id))
						})
					}),
					isDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise-in rise-in-1 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground",
						children: "هاد أرقام مثال باش تشوف كيفاش يخدم الدفتر. من القائمة فوق تقدر تمسحو وتبدأ بحساباتك."
					}) : null,
					entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						onIncome: () => setIntent({
							mode: "create",
							type: "income"
						}),
						onExpense: () => setIntent({
							mode: "create",
							type: "expense"
						}),
						onDemo: () => {
							loadDemo();
							toast.success("تحمّل المثال");
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rise-in rise-in-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiGrid, {
								current: totals,
								previous: prevTotals
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"من ",
								formatDate(isoFromDate(range.start)),
								" إلى ",
								formatDate(isoFromDate(range.end))
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rise-in rise-in-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insights, {
								totals,
								breakdown
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rise-in rise-in-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowChart, { data: series })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rise-in rise-in-4 grid min-w-0 gap-4 lg:grid-cols-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 lg:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesPanel, { items: breakdown })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 lg:col-span-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionList, {
									entries: visible,
									onEdit: (entry) => setIntent({
										mode: "edit",
										type: entry.type,
										entry
									})
								})
							})]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 dock-safe sm:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						className: "h-12",
						onClick: () => setIntent({
							mode: "create",
							type: "expense"
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "مصروف"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "h-12",
						onClick: () => setIntent({
							mode: "create",
							type: "income"
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "مدخول"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryDialog, {
				intent,
				onClose: () => setIntent(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmClear,
				onOpenChange: setConfirmClear,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "تمسح كل الحسابات؟" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "هذا يمسح كل المداخيل والمصاريف من هذا الجهاز. ما تقدّرش ترجّعهم بعدما تمسح." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "خلّيهم" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-background hover:bg-destructive/90",
					onClick: () => {
						clearAll();
						toast.success("الدفتر ولا فاضي");
					},
					children: "امسح كلشي"
				})] })] })
			})
		]
	});
}
function EmptyState({ onIncome, onExpense, onDemo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col items-center rounded-xl bg-card px-6 py-14 text-center shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleMark, { className: "size-12 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 text-xl font-semibold",
				children: "دفترك فاضي"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground",
				children: "سجّل المداخيل (شنوة دخل) والمصاريف (شنوة خرج: سلعة، إشهار، توصيل…). ميزان يحسبلك الربح وحدو."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onIncome,
						children: "مدخول"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: onExpense,
						children: "مصروف"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: onDemo,
						children: "شوف مثال"
					})
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerHome, {});
}
//#endregion
export { Home as component };
