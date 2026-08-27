"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mailto } from "@/data/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const contact = pathname === "/contact";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", closeOnEscape);
    // In-menu links close on click; this covers back/forward navigation.
    window.addEventListener("popstate", close);
    // Hold the page still while the sheet is open so the backdrop reads as modal.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("popstate", close);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      {/* Kept outside <header>: its -translate-x-1/2 would become the containing
          block for a fixed child, clipping the backdrop to the header strip. */}
      {menuOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[55] cursor-default bg-ink/45 backdrop-blur-[2px] min-[701px]:hidden"
        />
      )}
      <header className="fixed top-[18px] left-1/2 z-[60] w-[min(1160px,calc(100%-32px))] -translate-x-1/2">
        <div
          data-navbar
          className="relative z-10 flex items-center justify-between gap-5 rounded-full border border-paper/12 bg-ink/55 py-3 pr-3.5 pl-[22px] backdrop-blur-2xl transition-[background,border-color,box-shadow] duration-300"
        >
          <Link
            href="/"
            className="flex items-center gap-0.5 font-serif text-[23px] tracking-[-0.01em]"
          >
            Vanto
            <span className="mx-0.5 inline-block size-[7px] rounded-full bg-accent" />
          </Link>
          <nav
            className="flex items-center gap-1 max-[700px]:hidden"
            aria-label="Main navigation"
          >
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-paper/8 text-paper"
                      : "text-paper/72 hover:bg-paper/8 hover:text-paper"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href={contact ? mailto : "/contact"}
            data-cursor={contact ? "Email" : "Start"}
            data-magnetic={!contact ? "" : undefined}
            className={`max-[440px]:hidden ${
              contact
                ? "rounded-full border-[1.5px] border-paper/30 px-5 py-2.5 text-sm font-semibold hover:border-paper"
                : "rounded-full bg-accent px-5 py-[11px] text-sm font-semibold text-ink transition-transform duration-300"
            }`}
          >
            {contact ? "Email instead" : "Start a project"}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
            className={`hidden h-11 items-center gap-2 rounded-full border px-4 font-mono text-[11px] tracking-[0.08em] transition-colors duration-200 max-[700px]:inline-flex ${
              menuOpen
                ? "border-paper/35 bg-paper/12 text-paper"
                : "border-paper/20 bg-paper/6 text-paper"
            }`}
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-[4.5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-[4.5px] -rotate-45" : "top-[9px]"
                }`}
              />
            </span>
            <span aria-hidden="true">{menuOpen ? "CLOSE" : "MENU"}</span>
          </button>
          {menuOpen && (
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="absolute top-[calc(100%+8px)] right-0 left-0 flex flex-col rounded-[22px] border border-paper/14 bg-ink/95 p-2.5 shadow-[0_24px_70px_rgba(0,0,0,.45)] backdrop-blur-2xl min-[701px]:hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-5 py-3.5 text-base text-paper/80 hover:bg-paper/8 hover:text-paper"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={contact ? mailto : "/contact"}
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-2xl bg-accent px-5 py-3.5 text-base font-semibold text-ink"
              >
                {contact ? "Send an email" : "Start a project"}
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="mt-1 rounded-2xl px-5 py-3 text-center font-mono text-[11px] tracking-[0.1em] text-paper/50 hover:bg-paper/6 hover:text-paper/80"
              >
                CLOSE MENU
              </button>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
