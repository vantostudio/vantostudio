"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mailto } from "@/data/site";

const links = [
  { href: "/work", label: "Selected work", number: "01" },
  { href: "/services", label: "What we do", number: "02" },
  { href: "/about", label: "The studio", number: "03" },
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
          className="theme-dark fixed inset-0 z-[55] cursor-default bg-ink/45 backdrop-blur-[2px] min-[701px]:hidden"
        />
      )}
      <header className="theme-dark fixed top-[18px] left-1/2 z-[60] w-[min(1160px,calc(100%-32px))] -translate-x-1/2">
        <div
          data-navbar
          className="relative z-10 flex items-center justify-between gap-5 rounded-full border border-paper/12 bg-ink/55 py-3 pr-3.5 pl-[22px] backdrop-blur-2xl transition-[background,border-color,box-shadow] duration-300"
        >
          <Link
            href="/"
            className="flex items-center gap-0.5 font-serif text-[23px] tracking-[-0.01em]"
          >
            Vanto
            <span className="mx-0.5 inline-block size-[7px] rounded-full bg-accent-fill" />
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
                  className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-paper/8 text-paper"
                      : "text-paper/72 hover:bg-paper/8 hover:text-paper"
                  }`}
                >
                  {link.href === "/work" ? "Work" : link.href === "/services" ? "Services" : "About"}
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
                ? "rounded-[10px] border-[1.5px] border-paper/30 px-5 py-2.5 text-sm font-semibold hover:border-paper"
                : "rounded-[10px] bg-accent-fill px-5 py-[11px] text-sm font-semibold text-ink transition-transform duration-300"
            }`}
          >
            {contact ? "Email instead" : "Start a project"}
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
            className={`hidden h-11 items-center gap-2 rounded-[10px] border px-4 font-mono text-[11px] tracking-[0.08em] transition-colors duration-200 max-[700px]:inline-flex ${
              menuOpen
                ? "border-paper/35 bg-paper/12 text-paper"
                : "border-paper/20 bg-paper/6 text-paper"
            }`}
          >
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
              className="absolute top-[calc(100%+10px)] right-0 left-0 overflow-hidden rounded-[24px] border border-paper/14 bg-ink/95 shadow-[0_28px_90px_rgba(0,0,0,.5)] backdrop-blur-2xl min-[701px]:hidden"
            >
              <div className="flex items-center justify-between border-b border-paper/14 px-5 py-4 font-mono text-[10px] tracking-[0.14em] text-paper/50">
                <span>NAVIGATION</span>
                <span>VANTO / 2026</span>
              </div>

              <div className="px-2.5">
                {links.map((link) => {
                  const active = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className="group grid min-h-[70px] grid-cols-[30px_1fr_auto] items-center gap-2 border-b border-paper/12 px-2.5 text-paper transition-colors last:border-b-0 hover:bg-paper/6"
                    >
                      <span className="font-mono text-[10px] text-sage">{link.number}</span>
                      <span className="font-serif text-[clamp(25px,8vw,34px)] leading-none tracking-[-0.025em]">
                        {link.label}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] text-paper/50">
                        {active && <span>CURRENT</span>}
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5">
                          <path d="M3 8h9M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-t border-paper/14 bg-paper/4 p-5">
                <div>
                  <p className="m-0 font-mono text-[10px] tracking-[0.14em] text-sage">HAVE A BRIEF?</p>
                  <p className="mt-2 mb-0 max-w-[22ch] text-sm leading-5 text-paper/65">
                    Bring us the ambition, the complexity, or simply the first question.
                  </p>
                </div>
                <Link
                  href={contact ? mailto : "/contact"}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-[10px] bg-accent-fill px-4 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {contact ? "Email us" : "Start here"}
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
