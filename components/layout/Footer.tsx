import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { mailto } from "@/data/site";

export type FooterProps = {
  eyebrow?: string;
  headline?: string;
  buttonLabel?: string;
};

export function Footer({
  eyebrow = "LET’S BUILD",
  headline = "Something you’re proud to share.",
  buttonLabel = "Start a project",
}: FooterProps) {
  return (
    <footer id="contact" className="border-t border-paper/12 bg-ink text-paper">
      <Container>
        <div className="flex flex-col items-start gap-[30px] border-b border-paper/12 py-[clamp(72px,10vw,140px)]">
          <p data-fade className="font-mono text-xs tracking-[0.14em] text-sage">(&nbsp;{eyebrow}&nbsp;)</p>
          <h2 data-fade className="max-w-[14ch] font-serif text-[clamp(44px,8vw,120px)] leading-[0.94] tracking-[-0.03em] text-balance">
            {headline}
          </h2>
          <div data-fade className="flex flex-wrap gap-3.5">
            <ButtonLink
              href="/contact"
              data-magnetic
              data-cursor="Start"
              size="lg"
              className="px-[34px] py-[17px] transition-transform duration-300"
            >
              {buttonLabel}
            </ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,45%),1fr))] gap-8 py-[clamp(40px,5vw,64px)]">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] tracking-[0.12em] text-paper-muted">EXPLORE</span>
            <Link href="/work" className="text-paper/80 hover:text-paper">Work</Link>
            <Link href="/services" className="text-paper/80 hover:text-paper">Services</Link>
            <Link href="/about" className="text-paper/80 hover:text-paper">About</Link>
            <Link href="/privacy" className="text-paper/80 hover:text-paper">Privacy</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] tracking-[0.12em] text-paper-muted">REACH ME</span>
            <Link href={mailto} className="text-paper/80 hover:text-paper">Email</Link>
            <Link href="/contact" className="text-paper/80 hover:text-paper">Project form</Link>
          </div>
          <div className="flex max-w-[34ch] flex-col gap-3">
            <span className="font-mono text-[11px] tracking-[0.12em] text-paper-muted">STUDIO</span>
            <p className="m-0 text-[15px] leading-6 text-paper/70">An independent web design and development studio led by Alex Morgan.</p>
          </div>
        </div>
        <div data-bigmark className="select-none whitespace-nowrap pt-[clamp(20px,3vw,40px)] font-serif text-[clamp(64px,20vw,300px)] leading-[0.8] tracking-[-0.04em] text-paper/6" aria-hidden="true">
          Vanto<span className="text-accent/40">.</span>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-paper/12 py-6 font-mono text-xs text-paper-muted">
          <span>© 2026 VANTO</span>
          <span>WORKING WORLDWIDE</span>
        </div>
      </Container>
    </footer>
  );
}
