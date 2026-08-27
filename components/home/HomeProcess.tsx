import { Container } from "@/components/ui/Layout";
import { homeSteps } from "@/data/home";

export function HomeProcess() {
  return (
    <>
      <section data-pin-section className="bg-ink text-paper">
        <div data-pin-viewport className="flex min-h-svh flex-col justify-center overflow-hidden py-[clamp(64px,10vh,120px)]">
          <Container className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="m-0 max-w-[16ch] font-serif text-[clamp(32px,4.5vw,64px)] tracking-[-0.025em]">
              A clear path from first conversation to launch
            </h2>
            <span className="font-mono text-xs tracking-[0.12em] text-paper/60">( SCROLL TO EXPLORE → )</span>
          </Container>
          <div data-pin-track className="flex w-max gap-[clamp(20px,3vw,40px)] px-[clamp(20px,5vw,56px)]">
            {homeSteps.map((step) => (
              <article key={step.number} className="flex min-h-[clamp(390px,54vh,520px)] w-[clamp(310px,44vw,580px)] shrink-0 flex-col gap-[18px] rounded-3xl border border-paper/10 bg-ink-soft p-[clamp(28px,3.5vw,52px)]">
                <span className="font-serif text-[clamp(64px,8vw,120px)] leading-none text-accent">{step.number}</span>
                <div className="flex flex-col gap-3.5">
                  <h3 className="m-0 text-[clamp(22px,2.4vw,32px)] font-semibold">{step.title}</h3>
                  <p className="m-0 max-w-[40ch] text-[clamp(15px,1.3vw,18px)] leading-[1.65] text-paper/70">{step.description}</p>
                </div>
                <div className="mt-auto grid gap-3 border-t border-paper/12 pt-5 text-[13px] leading-[1.5] sm:grid-cols-2">
                  <p className="m-0 text-paper/58"><span className="mb-1 block font-mono text-[10px] tracking-[0.1em] text-sage">YOUR PART</span>{step.client}</p>
                  <p className="m-0 text-paper/58"><span className="mb-1 block font-mono text-[10px] tracking-[0.1em] text-accent">THE OUTPUT</span>{step.output}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
