import { useState, type FormEvent } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { ScaleMark } from "@/components/ledger/mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInGate } from "@/lib/auth/gates";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  return (
    <SignInGate fallback={<LoginForm />}>
      <Navigate to="/" />
    </SignInGate>
  );
}

function LoginForm() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const result = mode === "signup"
        ? await authClient.signUp.email({ name: "مستخدم ميزان", email: email.trim(), password, callbackURL: "/" })
        : await authClient.signIn.email({ email: email.trim(), password, callbackURL: "/" });
      if (result.error) throw new Error(result.error.message ?? "تعذّر إتمام العملية.");
      window.location.assign("/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "تعذّر إتمام العملية. راجع البريد وكلمة المرور.");
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-muted"><ScaleMark className="size-7" /></span>
          <div>
            <h1 className="text-xl font-semibold">ميزان</h1>
            <p className="text-sm text-muted-foreground">دفتر تجارتك، محفوظ بين أجهزتك</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold">{mode === "signup" ? "إنشاء حساب" : "تسجيل الدخول"}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {mode === "signup" ? "أنشئ حسابًا بالبريد وكلمة المرور لمزامنة بياناتك." : "ادخل إلى حسابك لرؤية نفس الدفتر على أجهزتك."}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} dir="ltr" className="text-left" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 8 : 1} required value={password} onChange={(event) => setPassword(event.target.value)} dir="ltr" className="text-left" />
            {mode === "signup" && <p className="text-xs text-muted-foreground">اختَر 8 أحرف أو أكثر.</p>}
          </div>
          {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <Button type="submit" className="h-11 w-full" disabled={pending}>
            {pending ? "لحظة…" : mode === "signup" ? "إنشاء الحساب" : "دخول"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "signup" ? "عندك حساب من قبل؟" : "أول مرة تستعمل ميزان؟"}{" "}
          <button type="button" className="font-medium text-foreground underline underline-offset-4" onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(""); }}>
            {mode === "signup" ? "سجّل الدخول" : "أنشئ حسابًا"}
          </button>
        </p>
      </section>
    </main>
  );
}
