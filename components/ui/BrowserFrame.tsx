import type { ReactNode } from "react";

export function BrowserFrame({
  domain,
  children,
  light = false,
  className = "",
}: {
  domain: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border ${
        light
          ? "border-[#d3c6ad] bg-[#e7ddc9] shadow-[0_30px_70px_rgba(20,17,13,.18)]"
          : "border-paper/10 bg-ink-soft shadow-[0_30px_70px_rgba(0,0,0,.35)]"
      } ${className}`}
    >
      <div className={`flex items-center gap-[7px] border-b px-4 py-3 ${light ? "border-[#d3c6ad] bg-[#e0d5bf]" : "border-paper/8 bg-[#211c16]"}`}>
        <i className="size-2.5 rounded-full bg-[#d2664a]" />
        <i className="size-2.5 rounded-full bg-[#e0b44e]" />
        <i className="size-2.5 rounded-full bg-sage" />
        <span className={`ml-2.5 font-mono text-xs ${light ? "text-paper-muted" : "text-paper/50"}`}>{domain}</span>
      </div>
      {children}
    </div>
  );
}
