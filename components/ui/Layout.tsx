import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1240px] px-[clamp(20px,5vw,56px)] ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`m-0 font-mono text-xs tracking-[0.14em] uppercase text-accent ${className}`}>
      {children}
    </p>
  );
}
