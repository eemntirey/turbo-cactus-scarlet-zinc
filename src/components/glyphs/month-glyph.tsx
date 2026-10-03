import { cn } from "@/lib/utils";

type Props = {
  month: number;
  className?: string;
};

export function MonthGlyph({ month, className }: Props) {
  const m = ((month - 1) % 7) + 1;
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-fg", className)}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      {m === 1 && <line x1="6" y1="16" x2="26" y2="16" />}
      {m === 2 && (
        <>
          <circle cx="12" cy="16" r="2.2" fill="currentColor" stroke="none" />
          <circle cx="20" cy="16" r="2.2" fill="currentColor" stroke="none" />
        </>
      )}
      {m === 3 && <circle cx="16" cy="16" r="8" />}
      {m === 4 && <path d="M16 6 L26 16 L16 26 L6 16 Z" />}
      {m === 5 && <path d="M16 7 L25 24 H7 Z" />}
      {m === 6 && <path d="M16 6 L24.5 11 V21 L16 26 L7.5 21 V11 Z" />}
      {m === 7 && (
        <polygon points="16,5 21.4,8.4 26,14.2 23.6,21.2 16,26 8.4,21.2 6,14.2 10.6,8.4" />
      )}
    </svg>
  );
}

export function HeptaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("text-fg", className)} aria-hidden="true" fill="none">
      <polygon
        points="16,3 23.2,7.4 27.8,15.2 24.6,23.8 16,29 7.4,23.8 4.2,15.2 8.8,7.4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}
