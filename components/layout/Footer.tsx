import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { mailto, site, whatsappLink } from "@/data/site";

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
        <div className="grid grid-cols-1 gap-8 border-b border-paper/12 py-[clamp(72px,10vw,140px)] md:grid-cols-12 md:gap-x-6">
          <p data-fade className="m-0 font-mono text-xs tracking-[0.14em] text-sage md:col-span-3 md:pt-3">(&nbsp;{eyebrow}&nbsp;)</p>
          <h2 data-fade className="m-0 max-w-[13ch] font-serif text-[clamp(44px,8vw,116px)] leading-[0.92] tracking-[-0.035em] text-balance md:col-span-9">
            {headline}
          </h2>
          <div data-fade className="md:col-start-4 md:col-span-9 md:mt-3">
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
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 py-[clamp(44px,6vw,72px)] md:grid-cols-12 md:gap-x-6">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-flex items-center font-serif text-[32px] tracking-[-0.02em]">
              Vanto<span className="ml-1 inline-block size-2 rounded-full bg-accent-fill" />
            </Link>
            <p className="mt-5 mb-0 max-w-[35ch] text-[15px] leading-6 text-paper/70">
              A digital strategy, design, and development studio making ambitious businesses clearer, more distinctive, and easier to choose.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-2 md:col-start-7">
            <span className="mb-1 font-mono text-[10px] tracking-[0.14em] text-sage">EXPLORE</span>
            <Link href="/work" className="text-paper/80 transition-colors hover:text-paper">Work</Link>
            <Link href="/services" className="text-paper/80 transition-colors hover:text-paper">Services</Link>
            <Link href="/about" className="text-paper/80 transition-colors hover:text-paper">About</Link>
            <Link href="/privacy" className="text-paper/80 transition-colors hover:text-paper">Privacy</Link>
          </div>
          <div className="flex min-w-0 flex-col gap-3 md:col-span-3">
            <span className="mb-1 font-mono text-[10px] tracking-[0.14em] text-sage">CONTACT</span>
            <Link href={mailto} className="truncate text-paper/80 transition-colors hover:text-paper">{site.email}</Link>
            <Link href={whatsappLink("Hello Vanto, I’d like to discuss a project.")} className="text-paper/80 transition-colors hover:text-paper">
              WhatsApp
            </Link>
          </div>
          <div className="col-span-2 border-t border-paper/12 pt-5 md:col-span-2 md:border-t-0 md:pt-0">
            <span className="font-mono text-[10px] tracking-[0.14em] text-sage">BASE / REACH</span>
            <p className="mt-4 mb-0 text-sm leading-6 text-paper/70">Nairobi, Kenya<br />Working worldwide</p>
          </div>
        </div>
        <div data-bigmark className="select-none overflow-hidden whitespace-nowrap border-t border-paper/12 pt-[clamp(30px,5vw,64px)] font-serif text-[clamp(82px,20vw,300px)] leading-[0.72] tracking-[-0.055em] text-paper/6" aria-hidden="true">
          Vanto<span className="text-accent/40">.</span>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-paper/12 py-6 font-mono text-[10px] tracking-[0.08em] text-paper-muted md:grid-cols-3">
          <span>© 2026 VANTO</span>
          <span className="text-right md:text-center">NAIROBI / KENYA</span>
          <span className="col-span-2 text-left md:col-span-1 md:text-right">STRATEGY · DESIGN · DEVELOPMENT</span>
        </div>
      </Container>
    </footer>
  );
}
