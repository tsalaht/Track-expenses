import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md bg-muted px-3 text-base text-foreground shadow-[inset_0_0_0_1px_var(--color-input)] transition-[box-shadow,background-color] duration-150 placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-ring)] disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
