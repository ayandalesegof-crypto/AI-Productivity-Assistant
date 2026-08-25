import { cn } from "@/lib/utils";
import logoAsset from "@/assets/miss-a-logo.png.asset.json";

/**
 * Official Miss A Studios logo (burgundy "A." monogram, transparent background).
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={logoAsset.url}
        alt="Miss A Studios logo"
        className="h-9 w-auto object-contain"
      />
      {!compact && (
        <span className="font-serif text-xl font-medium tracking-wide text-foreground">
          Miss A <span className="italic text-primary">Studios</span>
        </span>
      )}
    </span>
  );
}
