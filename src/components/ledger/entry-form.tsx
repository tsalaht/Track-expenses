import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  categoriesFor,
  parseAmountInput,
  todayISO,
  type CategoryId,
  type EntryType,
  type LedgerEntry,
} from "@/lib/ledger/model";
import { cn } from "@/lib/utils";
import { useLedgerStore } from "@/lib/ledger/store";

export type EntryIntent = {
  mode: "create" | "edit";
  type: EntryType;
  entry?: LedgerEntry;
};

export function EntryDialog({
  intent,
  onClose,
}: {
  intent: EntryIntent | null;
  onClose: () => void;
}) {
  const addEntry = useLedgerStore((s) => s.addEntry);
  const updateEntry = useLedgerStore((s) => s.updateEntry);
  const open = intent !== null;

  const [type, setType] = useState<EntryType>("expense");
  const [category, setCategory] = useState<CategoryId>("products");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState("");

  useEffect(() => {
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
    setCategory(cats[0]!.id);
    setAmount("");
    setDate(todayISO());
    setNote("");
  }, [intent]);

  const cats = useMemo(() => categoriesFor(type), [type]);

  function onTypeChange(next: EntryType) {
    setType(next);
    const nextCats = categoriesFor(next);
    if (!nextCats.some((c) => c.id === category)) {
      setCategory(nextCats[0]!.id);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const parsed = parseAmountInput(amount);
    if (parsed === null) {
      toast.error("أكتب المبلغ بالدينار");
      return;
    }
    const draft = { type, category, amount: parsed, date, note: note.trim() };
    if (intent?.mode === "edit" && intent.entry) {
      try {
        const synced = await updateEntry(intent.entry.id, draft);
        if (synced) toast.success("تعدّلت الحركة وتزامنت مع Google Sheets");
        else toast.warning("تعدّلت على هذا الجهاز فقط؛ Google Sheets غير متصل.");
      } catch {
        toast.error("ما تحفظتش الحركة. عاود المحاولة.");
        return;
      }
    } else {
      try {
        const synced = await addEntry(draft);
        if (synced) toast.success(type === "income" ? "تسجّل المدخول وتزامن مع Google Sheets" : "تسجّل المصروف وتزامن مع Google Sheets");
        else toast.warning("تسجّل على هذا الجهاز فقط؛ Google Sheets غير متصل.");
      } catch {
        toast.error("ما تحفظتش الحركة. عاود المحاولة.");
        return;
      }
    }
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <form onSubmit={submit} className="flex min-h-0 flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              {intent?.mode === "edit"
                ? "تعديل الحركة"
                : type === "income"
                  ? "مدخول جديد"
                  : "مصروف جديد"}
            </DialogTitle>
            <DialogDescription>
              سجّل اللي دخل ولا اللي خرج. المبلغ بالدينار الجزائري.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 space-y-4 overflow-y-auto pe-1">
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => onTypeChange("expense")}
                className={cn(
                  "h-10 rounded-md text-sm font-medium transition-colors",
                  type === "expense"
                    ? "bg-card text-expense shadow-[var(--shadow-border)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                مصروف
              </button>
              <button
                type="button"
                onClick={() => onTypeChange("income")}
                className={cn(
                  "h-10 rounded-md text-sm font-medium transition-colors",
                  type === "income"
                    ? "bg-card text-income shadow-[var(--shadow-border)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                مدخول
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ</Label>
              <div className="relative">
                <Input
                  id="amount"
                  inputMode="numeric"
                  dir="ltr"
                  autoComplete="off"
                  placeholder="2500"
                  value={amount}
                  onChange={(ev) => setAmount(ev.target.value)}
                  className="ps-12 text-left text-lg tabular-nums"
                />
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                  دج
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>الباب</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {cats.map((c) => {
                  const Icon = c.icon;
                  const selected = category === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        "flex h-auto min-h-11 flex-col items-start gap-1 rounded-md px-3 py-2 text-right transition-colors",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-accent",
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                        <Icon className="size-3.5" />
                        {c.label}
                      </span>
                      <span
                        className={cn(
                          "text-xs",
                          selected ? "text-primary-foreground/70" : "text-muted-foreground",
                        )}
                      >
                        {c.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">التاريخ</Label>
                <Input
                  id="date"
                  type="date"
                  dir="ltr"
                  value={date}
                  onChange={(ev) => setDate(ev.target.value)}
                  className="text-left"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="note">ملاحظة (اختياري)</Label>
                <Input
                  id="note"
                  placeholder="مثال: ياليدين، حملة رييلز…"
                  value={note}
                  onChange={(ev) => setNote(ev.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              {intent?.mode === "edit" ? "حفظ التعديل" : "سجّل"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose} className="w-full sm:w-auto">
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
