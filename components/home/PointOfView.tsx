import { Container } from "@/components/ui/Layout";
import { WordReveal } from "@/components/ui/WordReveal";

export function PointOfView() {
  return (
    <section className="bg-paper py-[clamp(80px,13vw,180px)] text-ink">
      <Container>
        <p data-fade className="mb-[clamp(28px,4vw,44px)] font-mono text-xs tracking-[0.14em] text-accent">( THE POINT OF VIEW )</p>
        <WordReveal className="m-0 max-w-[20ch] font-serif text-[clamp(32px,5.2vw,72px)] leading-[1.08] tracking-[-0.025em] text-balance">
          A strong website makes three things clear: who you help, why your work matters, and what someone should do next.
        </WordReveal>
        <p data-fade className="mt-7 max-w-[66ch] text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-[#5f584d]">
          Strategy gives those answers shape. Design makes them memorable. Development keeps the final experience fast, usable, and faithful to the idea.
        </p>
      </Container>
    </section>
  );
}
