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
      <Header />
      <main>{children}</main>
      {footer && <Footer {...footerProps} />}
    </div>
  );
}
