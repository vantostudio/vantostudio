import type { ReactNode } from "react";

/**
 * Small metadata chips — project tags, plan badges, status labels.
 * Squarer than the pills these replaced, and one radius for all of them.
 */
const RADIUS = "rounded-md";

const tones = {
  line: "border border-paper-line text-ink-faint",
  paper: "border border-paper/20 text-paper/65",
  accent: "border border-accent/60 text-accent",
  sage: "border border-sage/50 text-sage",
  solidSage: "bg-sage text-ink",
} as const;

export function Tag({
  children,
  tone = "line",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center ${RADIUS} px-[11px] py-1.5 font-mono text-[10px] tracking-[0.08em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
