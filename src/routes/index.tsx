import { createFileRoute, Navigate } from "@tanstack/react-router";
import { LedgerHome } from "@/components/ledger/home";
import { SignInGate } from "@/lib/auth/gates";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SignInGate fallback={<Navigate to="/login" />}><LedgerHome /></SignInGate>;
}
