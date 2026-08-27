import { Faq } from "./Faq";

export function HomeFaq() {
  return (
    <section className="border-t border-paper-line bg-paper py-[clamp(72px,10vw,140px)] text-ink">
      <div className="mx-auto max-w-[1100px] px-[clamp(20px,5vw,56px)]">
        <div data-fade className="mb-[clamp(36px,5vw,56px)] max-w-[31ch]">
          <p className="mb-[18px] font-mono text-xs tracking-[0.14em] text-accent">( GOOD TO KNOW )</p>
          <h2 className="m-0 font-serif text-[clamp(34px,4.8vw,66px)] leading-[1.02] tracking-[-0.025em]">The practical questions, answered clearly.</h2>
        </div>
        <Faq />
      </div>
    </section>
  );
}
