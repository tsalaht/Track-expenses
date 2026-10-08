import { createFileRoute } from "@tanstack/react-router";
import { LedgerHome } from "@/components/ledger/home";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <LedgerHome />;
}
