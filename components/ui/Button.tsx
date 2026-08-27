import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "light" | "outline" | "text";

const base =
  "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent px-6 py-3.5 text-ink hover:brightness-110",
  light:
    "bg-paper px-7 py-4 text-ink hover:bg-white",
  outline:
    "border-[1.5px] border-paper/30 bg-transparent px-7 py-4 text-paper hover:border-paper",
  text:
    "rounded-none border-b-[1.5px] border-accent px-0 py-1 text-paper/85 hover:text-paper",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
