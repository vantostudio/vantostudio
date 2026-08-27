import Link from "next/link";
import { Container } from "@/components/ui/Layout";

export function FounderPreview() {
  return (
    <section className="overflow-hidden border-t border-paper/12 bg-ink py-[clamp(80px,12vw,160px)] text-paper">
      <Container>
        <div data-fade className="grid gap-[clamp(36px,6vw,88px)] lg:grid-cols-[.58fr_1.42fr]">
          <aside className="border-y border-paper/14 py-6">
            <p className="m-0 font-mono text-[10px] tracking-[0.13em] text-paper/42">WHO YOU WORK WITH</p>
            <p className="mt-5 font-serif text-[clamp(30px,3.5vw,48px)] leading-none">Alex Morgan</p>
            <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-3 lg:grid-cols-1">
              <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">ROLE</dt><dd className="mt-1.5 text-paper/68">Designer and developer</dd></div>
              <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">CLIENTS</dt><dd className="mt-1.5 text-paper/68">Worldwide, remote-first</dd></div>
              <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">MODEL</dt><dd className="mt-1.5 text-paper/68">Independent and direct</dd></div>
            </dl>
          </aside>
          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.14em] text-accent">( FOUNDER-LED )</p>
            <h2 className="m-0 max-w-[15ch] font-serif text-[clamp(38px,5.8vw,82px)] leading-[0.98] tracking-[-0.03em]">
              Independent, with the work kept close.
            </h2>
            <p className="mt-7 max-w-[54ch] text-[clamp(16px,1.45vw,19px)] leading-[1.7] text-paper/70">
              Vanto is led by Alex Morgan, a designer and developer working with clients worldwide. Every project is handled directly—from early strategy and structure through design, development, and launch.
            </p>
            <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.7] text-paper/58">
              Fewer layers keep communication clear, decisions close to the work, and the final experience consistent with the original direction.
            </p>
            <Link href="/about" data-cursor="Meet" className="mt-8 inline-flex border-b-[1.5px] border-accent pb-1 text-[15px] font-semibold text-paper">
              Meet Alex and see the approach →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
