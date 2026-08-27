import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  /** Accent fill — the primary action on dark surfaces. */
  | "primary"
  /** Paper fill — the primary action on top of imagery or dark heroes. */
  | "light"
  /** Hairline outline on dark surfaces. */
  | "outline"
  /** Ink fill — primary action on paper surfaces. */
  | "ink"
  /** Sage fill — the secondary, lower-commitment action. */
  | "sage"
  /** Underlined inline link. Carries no radius. */
  | "text";

type Size = "sm" | "md" | "lg";

/**
 * One radius for every button on the site. Buttons used to be `rounded-full`
 * pills declared ad hoc in a dozen files; they are squarer now and change in
 * one place. Deliberately smaller than the 18–22px used on cards and frames so
 * controls read as controls.
 */
const RADIUS = "rounded-[10px]";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition duration-200 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-accent-fill text-ink hover:brightness-110",
  light: "bg-paper text-ink hover:bg-white",
  outline: "border-[1.5px] border-paper/30 bg-transparent text-paper hover:border-paper",
  ink: "border-[1.5px] border-ink bg-ink text-paper hover:brightness-125",
  sage: "border border-sage bg-sage/8 text-sage hover:bg-sage/16",
  text: "border-b-[1.5px] border-accent px-0 py-1 text-paper/85 hover:text-paper",
};

function classes(variant: Variant, size: Size, className: string) {
  // The text variant is an inline link, so it takes neither radius nor padding.
  const shape = variant === "text" ? "" : `${RADIUS} ${sizes[size]}`;
  return `${base} ${shape} ${variants[variant]} ${className}`.replace(/\s+/g, " ").trim();
}

type Shared = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: Shared & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  // Anything absolute or protocol-based leaves the app, so it needs a plain
  // anchor with the usual rel guard rather than a client-side Link.
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a
        href={href}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className={classes(variant, size, className)}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: Shared & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
