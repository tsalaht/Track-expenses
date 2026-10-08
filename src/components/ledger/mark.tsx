import { cn } from "@/lib/utils";

export function ScaleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-primary", className)}
      fill="none"
      aria-hidden
    >
      <path fill="currentColor" d="M15.2 3.2h1.6v4.2h-1.6z" />
      <rect x="5.5" y="7.2" width="21" height="1.6" rx="0.6" fill="currentColor" />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M10 8.8v5.4M22 8.8v5.4"
      />
      <ellipse cx="10" cy="16.4" rx="4.4" ry="2.2" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="22" cy="16.4" rx="4.4" ry="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path fill="currentColor" d="M15.25 8.6h1.5v13.2h-1.5z" />
      <rect x="11.4" y="23.2" width="9.2" height="1.5" rx="0.4" fill="currentColor" />
      <rect x="9.6" y="24.7" width="12.8" height="1.6" rx="0.4" fill="currentColor" />
    </svg>
  );
}
