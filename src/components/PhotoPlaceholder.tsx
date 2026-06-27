import { Camera } from "lucide-react";

type Props = {
  label?: string;
  sublabel?: string;
  aspect?: string; // tailwind aspect class e.g. "aspect-[4/5]"
  className?: string;
  compact?: boolean;
};

export function PhotoPlaceholder({
  label = "Photo coming soon",
  sublabel,
  aspect = "aspect-[4/5]",
  className = "",
  compact = false,
}: Props) {
  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-sm border border-gold-deep/40 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--color-gold-soft) 55%, #ececec) 0%, #efeae0 55%, color-mix(in oklab, var(--color-gold) 22%, #e6e1d7) 100%)",
      }}
    >
      {/* diagonal sheen */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklab, var(--color-gold) 10%, transparent) 14px 15px)",
        }}
      />
      {/* corner brackets */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold-deep/60" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold-deep/60" />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold-deep/60" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold-deep/60" />

      <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-4">
        <div
          className="grid place-items-center rounded-full bg-cream/70 backdrop-blur-sm"
          style={{
            width: compact ? 36 : 56,
            height: compact ? 36 : 56,
            backgroundColor: "color-mix(in oklab, var(--color-cream) 80%, transparent)",
          }}
        >
          <Camera className="text-gold" size={compact ? 16 : 24} strokeWidth={1.3} />
        </div>
        {!compact && (
          <>
            <p
              className="mt-4 text-[0.65rem] tracking-[0.28em] uppercase font-medium"
              style={{ color: "var(--color-gold-deep)" }}
            >
              {label}
            </p>
            {sublabel && (
              <p className="mt-1 text-xs text-foreground/60 italic max-w-[80%]">{sublabel}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
