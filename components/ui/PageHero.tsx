import type { ReactNode } from "react";
import { Container } from "./Layout";

export function PageHero({
  eyebrow,
  note,
  lines,
  intro,
  width = "14ch",
}: {
  eyebrow: string;
  note: string;
  lines: ReactNode[];
  intro?: string;
  width?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-[clamp(140px,22vh,220px)] pb-[clamp(40px,6vw,64px)]">
      <div
        data-hero-fade
        className="pointer-events-none absolute top-[8%] right-[-12vw] -z-10 aspect-square w-[clamp(280px,42vw,660px)] rounded-full border border-accent/12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[-24%] right-[-10%] -z-20 aspect-square w-[clamp(360px,52vw,780px)] rounded-full bg-[radial-gradient(circle,rgba(154,106,60,.14),transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div data-hero-fade className="mb-[clamp(28px,5vw,48px)] flex flex-wrap justify-between gap-4 font-mono text-xs tracking-[0.08em] text-paper/50">
          <span>(&nbsp;{eyebrow}&nbsp;)</span>
          <span>{note}</span>
        </div>
        <h1 className="m-0 font-serif text-[clamp(44px,9vw,132px)] leading-[0.94] tracking-[-0.035em]" style={{ maxWidth: width }}>
          {lines.map((line, index) => (
            <span data-line key={index}><span data-line-inner>{line}</span></span>
          ))}
        </h1>
        {intro && (
          <p data-hero-fade className="mt-[clamp(28px,4vw,44px)] max-w-[46ch] text-[clamp(16px,1.5vw,20px)] leading-[1.6] text-paper/78">
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
