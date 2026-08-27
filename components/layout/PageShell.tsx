import type { ReactNode } from "react";
import { Footer, type FooterProps } from "./Footer";
import { Header } from "./Header";

export function PageShell({
  children,
  footer = true,
  footerProps,
}: {
  children: ReactNode;
  footer?: boolean;
  footerProps?: FooterProps;
}) {
  return (
    <div className="min-h-screen overflow-clip">
      {/* First tab stop on every page: jumps past the fixed header nav. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-[96px] focus:left-1/2 focus:z-[100] focus:-translate-x-1/2 focus:rounded-[10px] focus:bg-accent focus:px-6 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>{children}</main>
      {footer && <Footer {...footerProps} />}
    </div>
  );
}
