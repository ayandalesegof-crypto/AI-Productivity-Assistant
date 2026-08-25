import { cn } from "@/lib/utils";

/**
 * Miss A Studios wordmark.
 * Replace with the official uploaded logo image when available:
 *   <img src={logo} alt="Miss A Studios" className="h-10 w-auto" />
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-serif text-lg font-semibold text-primary-foreground">
        A
      </span>
      {!compact && (
        <span className="font-serif text-xl font-medium tracking-wide text-foreground">
          Miss A <span className="italic text-primary">Studios</span>
        </span>
      )}
    </span>
  );
}
