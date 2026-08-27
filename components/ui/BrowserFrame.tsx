import type { ReactNode } from "react";

/**
 * A plain screen frame: rounded corners, a hairline edge and a soft shadow.
 * No fake browser chrome — the domain is shown as a caption under the frame,
 * where it reads as a credit rather than a simulated address bar.
 */
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
    <figure className="m-0">
      <div
        className={`overflow-hidden rounded-[18px] ring-1 ${
          light
            ? "bg-[#e7ddc9] ring-[#cbbda2]/70 shadow-[0_24px_60px_-20px_rgba(20,17,13,.35)]"
            : "bg-ink-soft ring-paper/12 shadow-[0_28px_70px_-24px_rgba(0,0,0,.7)]"
        } ${className}`}
      >
        {children}
      </div>
      <figcaption
        className={`mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] ${
          light ? "text-[#7a7263]" : "text-paper/45"
        }`}
      >
        <span aria-hidden="true" className={`inline-block size-1.5 rounded-full ${light ? "bg-[#a89a80]" : "bg-paper/30"}`} />
        {domain}
      </figcaption>
    </figure>
  );
}
