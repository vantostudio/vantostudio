import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ProjectMotion } from "@/components/work/ProjectMotion";
import { projects } from "@/data/projects";

const [featured, ...supporting] = projects.slice(0, 3);

export function ProjectPreview() {
  return (
    <section id="work" className="bg-paper py-[clamp(72px,10vw,150px)] text-ink">
      <Container>
        <div className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-6 border-t border-paper-line pt-6">
          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.14em] text-accent">( SELECTED WORK )</p>
            <h2 data-fade className="m-0 max-w-[14ch] font-serif text-[clamp(38px,6vw,84px)] leading-none tracking-[-0.03em]">
              Different businesses. Clear digital stories.
            </h2>
          </div>
          <Link
            href="/work"
            data-cursor="View"
            data-analytics-event="Work Gallery Opened"
            data-analytics-location="home selected work"
            className="border-b-[1.5px] border-accent pb-1 text-[15px] font-semibold text-accent"
          >
            View all {projects.length} projects →
          </Link>
        </div>

        <article data-work>
          <Link
            href={`/work/${featured.slug}`}
            data-cursor="Open"
            data-analytics-event="Work Clicked"
            data-analytics-location="home selected work"
            data-analytics-project={featured.name}
            data-analytics-destination="case study"
            className="group block"
          >
            <BrowserFrame domain={featured.domain} light>
              <div className="aspect-[16/9] overflow-hidden">
                <ProjectMotion video={featured.video} poster={featured.image} alt={featured.imageAlt} />
              </div>
            </BrowserFrame>
            <div className="grid gap-5 border-b border-paper-line py-[clamp(24px,3vw,36px)] md:grid-cols-[1fr_.8fr] md:items-end">
              <div>
                <span className="font-mono text-[11px] tracking-[0.1em] text-accent">{featured.status}</span>
                <h3 className="mt-3 font-serif text-[clamp(38px,5vw,70px)] leading-none tracking-[-0.025em]">{featured.name}</h3>
              </div>
              <p className="m-0 max-w-[48ch] text-[15px] leading-[1.65] text-ink-muted md:justify-self-end">{featured.homeDescription}</p>
            </div>
          </Link>
        </article>

        <div className="mt-[clamp(40px,6vw,72px)] grid gap-[clamp(28px,4vw,52px)] md:grid-cols-2">
          {supporting.map((project) => (
            <article data-work key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                data-cursor="Open"
                data-analytics-event="Work Clicked"
                data-analytics-location="home selected work"
                data-analytics-project={project.name}
                data-analytics-destination="case study"
                className="group block"
              >
                <BrowserFrame domain={project.domain} light>
                  <div className="aspect-[16/9] overflow-hidden">
                    <ProjectMotion video={project.video} poster={project.image} alt={project.imageAlt} sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </BrowserFrame>
                <div className="pt-5">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-ink-faint">{project.status}</span>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h3 className="m-0 font-serif text-[clamp(30px,3.6vw,48px)] leading-none tracking-[-0.02em]">{project.name}</h3>
                    <span className="shrink-0 text-sm font-semibold text-accent">Case study →</span>
                  </div>
                  <p className="mt-4 max-w-[50ch] text-[14px] leading-[1.6] text-ink-muted">{project.homeDescription}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
