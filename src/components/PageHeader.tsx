import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  centered?: boolean;
  rule?: boolean;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  titleClassName = "mt-4 text-5xl md:text-7xl",
  subtitle,
  subtitleClassName = "mt-8",
  centered,
  rule,
  className = "",
}: PageHeaderProps) {
  return (
    <section
      className={`container-editorial pt-20 md:pt-28${centered ? " text-center" : ""} ${className}`.trim()}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h1 className={titleClassName}>{title}</h1>
      {rule && <div className="mt-8 w-32 gold-rule" />}
      {subtitle && (
        <p
          className={`${subtitleClassName} text-muted-foreground leading-relaxed${centered ? " max-w-2xl mx-auto" : " max-w-2xl"}`}
        >
          {subtitle}
        </p>
      )}
    </section>
  );
}
