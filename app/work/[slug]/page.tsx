import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Layout";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { CaseStudyImage } from "@/components/work/CaseStudyImage";
import { ProjectMotion } from "@/components/work/ProjectMotion";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.intro } : { title: "Project not found" };
}

export default async function CaseStudyPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex(({ slug }) => slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell footer={false}>
      <div className="[--color-accent:#b4552d]">
        <section className="bg-[radial-gradient(circle_at_82%_8%,rgba(180,85,45,.14),transparent_34%)] pt-[clamp(130px,20vh,200px)] pb-[clamp(32px,4vw,48px)]">
          <Container>
            <Link data-hero-fade data-cursor="Back" href="/work" className="mb-[clamp(28px,5vw,48px)] inline-flex font-mono text-xs tracking-[0.08em] text-paper/60">← ALL WORK</Link>
            <div data-hero-fade className="mb-[22px] flex flex-wrap gap-4 font-mono text-xs tracking-[0.1em] text-accent">
              <span>( CASE STUDY )</span><span className="text-paper/60">{project.index} — {project.category}</span>
            </div>
            <h1 className="m-0 max-w-[16ch] font-serif text-[clamp(40px,7.5vw,108px)] leading-[0.96] tracking-[-0.035em]">
              <span data-line><span data-line-inner>{project.name}</span></span>
            </h1>
            <p data-hero-fade className="mt-[clamp(24px,3vw,36px)] max-w-[22ch] font-serif text-[clamp(22px,2.8vw,40px)] leading-[1.15] tracking-[-0.02em] text-paper/90 italic">{project.tagline}</p>
            <p data-hero-fade className="mt-[26px] max-w-[52ch] text-[clamp(16px,1.5vw,19px)] leading-[1.65] text-paper/72">{project.intro}</p>
            <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-3">
              <span className={`rounded-md border px-4 py-2 font-mono text-[11px] tracking-[0.1em] ${project.kind === "founder" ? "border-sage/50 text-sage" : "border-accent/60 text-accent"}`}>
                {project.status}
              </span>
              <a href={project.href} target="_blank" rel="noreferrer" data-cursor="Visit" className="border-b border-accent pb-1 text-sm font-semibold text-paper/85">
                {project.linkLabel} ↗
              </a>
            </div>
            {project.whyBuilt && (
              <div data-hero-fade className="mt-8 max-w-[70ch] rounded-2xl border border-paper/12 bg-ink-soft/60 p-5">
                <p className="m-0 font-mono text-[10px] tracking-[0.13em] text-sage">( WHY I BUILT THIS )</p>
                <p className="mt-2.5 mb-0 text-[15px] leading-[1.65] text-paper/72">{project.whyBuilt}</p>
              </div>
            )}
            {project.disclaimer && (
              <p data-hero-fade className="mt-6 max-w-[70ch] border-l-2 border-accent pl-4 text-sm leading-[1.6] text-paper/60">
                {project.disclaimer}
              </p>
            )}
          </Container>
        </section>
        <section className="pb-[clamp(40px,5vw,60px)]">
          <Container>
            <div data-hero-fade className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,45%),1fr))] gap-6 border-y border-paper/12 py-7">
              {project.meta.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-paper/60">{label}</span>
                  <span className="text-[15px]">{value}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
        <section className="pb-[clamp(48px,7vw,96px)]">
          <Container>
            <div data-work>
              <BrowserFrame domain={project.domain}>
                <div className="aspect-[16/9.2] overflow-hidden">
                  <ProjectMotion video={project.video} poster={project.image} alt={project.imageAlt} />
                </div>
              </BrowserFrame>
            </div>
          </Container>
        </section>
        <section className="bg-paper py-[clamp(56px,8vw,104px)] text-ink">
          <Container>
            <p data-fade className="mb-[clamp(32px,4vw,48px)] font-mono text-xs tracking-[0.14em] text-accent">( AT A GLANCE )</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-[clamp(28px,4vw,56px)]">
              {project.highlights.map(([number, label]) => (
                <div data-fade key={label} className="border-t-2 border-accent pt-[18px]">
                  <div className="font-serif text-[clamp(34px,4vw,58px)] leading-none">{number}</div>
                  <div className="mt-3 font-mono text-[11px] tracking-[0.08em] text-[#6f675a]">{label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
        <section className="border-t border-paper-line bg-paper pt-[clamp(40px,6vw,80px)] pb-[clamp(72px,10vw,140px)] text-ink">
          <Container className="flex flex-col gap-[clamp(64px,9vw,128px)]">
            {project.blocks.map((block, blockIndex) => {
              const flipped = blockIndex % 2 === 1;
              return (
                <article data-work key={block.label} className="grid items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-[1.05fr_1fr]">
                  <div className={`flex max-w-[52ch] flex-col gap-[18px] ${flipped ? "lg:order-2" : ""}`}>
                    <span className="font-mono text-xs tracking-[0.12em] text-accent">0{blockIndex + 1} — {block.label}</span>
                    <h2 className="m-0 font-serif text-[clamp(30px,4vw,56px)] leading-[1.02] tracking-[-0.025em]">{block.title}</h2>
                    <p className="m-0 text-[clamp(16px,1.4vw,19px)] leading-[1.68] text-[#4a463c]">{block.body}</p>
                  </div>
                  <div className={`overflow-hidden rounded-[18px] border border-paper-line bg-[#e7ddc9] shadow-[0_24px_60px_rgba(20,17,13,.16)] ${flipped ? "lg:order-1" : ""}`}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <CaseStudyImage
                        src={block.image}
                        alt={block.imageAlt}
                        parallax
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </Container>
        </section>
        <section className="border-t border-paper/12 bg-ink py-[clamp(72px,11vw,150px)] text-center text-paper">
          <div className="mx-auto max-w-[1000px] px-[clamp(20px,5vw,56px)]">
            <p data-fade className="mb-[clamp(28px,4vw,44px)] font-mono text-xs tracking-[0.14em] text-sage">
              ( {project.kind === "founder" ? "CURRENT STATE" : "WHAT IT DEMONSTRATES"} )
            </p>
            <blockquote data-fade className="m-0 font-serif text-[clamp(28px,4.2vw,60px)] leading-[1.15] tracking-[-0.02em] text-balance">{project.outcome}</blockquote>
          </div>
        </section>
        <footer className="border-t border-paper/12 bg-ink pt-[clamp(56px,8vw,112px)] text-paper">
          <Container>
            <Link data-work data-cursor="Next" href={`/work/${next.slug}`} className="flex flex-wrap items-end justify-between gap-6 border-b border-paper/12 pb-[clamp(48px,7vw,96px)]">
              <span className="flex flex-col gap-3.5"><small className="font-mono text-xs tracking-[0.14em] text-paper/50">( NEXT CASE STUDY )</small><strong className="font-serif text-[clamp(36px,6vw,88px)] font-normal leading-[0.96] tracking-[-0.03em]">{next.name}</strong></span>
              <span className="text-[15px] font-semibold text-accent">Read it →</span>
            </Link>
            <div className="flex flex-col items-start gap-[26px] py-[clamp(56px,8vw,112px)]">
              <h2 data-fade className="m-0 max-w-[15ch] font-serif text-[clamp(40px,7vw,104px)] leading-[0.96] tracking-[-0.03em] text-balance">Have a problem worth designing around?</h2>
              <Link data-fade data-magnetic data-cursor="Start" href="/contact" className="rounded-[10px] bg-accent px-[34px] py-[17px] text-base font-semibold text-ink">Start a project</Link>
            </div>
            <div className="flex flex-wrap justify-between gap-4 border-t border-paper/12 py-6 font-mono text-xs text-paper-muted"><span>© 2026 VANTO</span><span>WORKING WORLDWIDE</span></div>
          </Container>
        </footer>
      </div>
    </PageShell>
  );
}
