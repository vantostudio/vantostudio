import Link from "next/link";
import { Container } from "@/components/ui/Layout";

export function StudioModel() {
  return (
    <section className="overflow-hidden border-t border-paper/12 bg-ink py-[clamp(80px,12vw,160px)] text-paper">
      <Container className="grid items-start gap-[clamp(44px,8vw,120px)] lg:grid-cols-[.52fr_1.48fr]">
        <aside data-fade className="border-y border-paper/14 py-6">
          <p className="m-0 font-mono text-[10px] tracking-[0.13em] text-paper/42">THE STUDIO MODEL</p>
          <dl className="mt-7 grid gap-5 text-sm sm:grid-cols-3 lg:grid-cols-1">
            <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">CORE TEAM</dt><dd className="mt-1.5 text-paper/68">Senior, hands-on, accountable</dd></div>
            <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">DISCIPLINES</dt><dd className="mt-1.5 text-paper/68">Strategy, design, technology</dd></div>
            <div><dt className="font-mono text-[10px] tracking-[0.1em] text-accent">SPECIALISTS</dt><dd className="mt-1.5 text-paper/68">Added when the brief needs them</dd></div>
          </dl>
        </aside>
        <div data-fade>
          <p className="mb-5 font-mono text-xs tracking-[0.14em] text-accent">( BUILT TO STAY CLOSE )</p>
          <h2 className="m-0 max-w-[16ch] font-serif text-[clamp(38px,5.8vw,82px)] leading-[0.98] tracking-[-0.03em]">
            Small by design. Scalable when the work calls for it.
          </h2>
          <p className="mt-7 max-w-[56ch] text-[clamp(16px,1.45vw,19px)] leading-[1.7] text-paper/70">
            Vanto keeps the core team close to the work, with clear ownership from strategy through launch. That means fewer handovers, faster decisions, and a more coherent result.
          </p>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.7] text-paper/58">
            When a project needs deeper expertise—copywriting, photography, illustration, motion, or a specialist integration—we bring in trusted collaborators around one shared direction.
          </p>
          <Link href="/about" data-cursor="Explore" className="mt-8 inline-flex border-b-[1.5px] border-accent pb-1 text-[15px] font-semibold text-paper">
            See how Vanto works →
          </Link>
        </div>
      </Container>
    </section>
  );
}
