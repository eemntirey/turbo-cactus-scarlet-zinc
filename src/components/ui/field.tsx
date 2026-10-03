import type { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 w-full rounded-[var(--radius-md)] border border-border bg-raised px-3 text-sm text-fg tabular placeholder:text-faint transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-xs font-medium uppercase tracking-[0.14em] text-muted", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldClass, "pr-8", className)} {...props}>
      {children}
    </select>
  );
}
