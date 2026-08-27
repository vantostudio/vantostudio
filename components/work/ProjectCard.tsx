import Link from "next/link";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ProjectMotion } from "./ProjectMotion";

export function ProjectCard({
  project,
  index,
  light = false,
  compact = false,
}: {
  project: Project;
  index: number;
  light?: boolean;
  compact?: boolean;
}) {
  const flipped = index % 2 === 1;
  const foreground = light ? "text-ink" : "text-paper";
  const body = light ? "text-[#4a463c]" : "text-paper/72";

  return (
    <article data-work className={`grid items-center gap-[clamp(24px,4vw,64px)] lg:grid-cols-[1.15fr_1fr] ${foreground}`}>
      <Link
        href={`/work/${project.slug}`}
        data-cursor="Open"
        className={flipped ? "lg:order-2" : ""}
      >
        <BrowserFrame domain={project.domain} light={light}>
          <div className="aspect-[16/11] overflow-hidden">
            <div data-parallax-inner className="size-full">
              <ProjectMotion
                video={project.video}
                poster={project.image}
                alt={project.imageAlt}
                sizes="(max-width: 1024px) calc(100vw - 40px), (max-width: 1360px) 52vw, 640px"
              />
            </div>
          </div>
        </BrowserFrame>
      </Link>
      <div className={`flex flex-col gap-[18px] ${flipped ? "lg:order-1" : ""}`}>
        <span className="font-mono text-xs tracking-[0.12em] text-accent">
          {project.index} — {project.category}
        </span>
        <span className={`font-mono text-[11px] tracking-[0.1em] ${light ? "text-[#6f675a]" : "text-sage"}`}>
          {project.status}
        </span>
        <h2 className="m-0 font-serif text-[clamp(36px,4.5vw,68px)] leading-none tracking-[-0.02em]">{project.name}</h2>
        <p className={`m-0 max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-[1.65] ${body}`}>
          {compact ? project.homeDescription : project.description}
        </p>
        {compact ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-paper-line px-[13px] py-1.5 font-mono text-[11px] tracking-[0.06em] text-[#6f675a]">
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-1.5 flex flex-wrap gap-[26px] border-t border-paper/12 pt-5">
            {project.facts.map(([number, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-serif text-[28px] leading-none text-accent">{number}</span>
                <span className="font-mono text-[11px] tracking-[0.06em] text-paper/50">{label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-[22px]">
          <Link
            href={`/work/${project.slug}`}
            data-cursor={compact ? "Read" : "Read"}
            className={compact ? "text-[15px] font-semibold text-accent" : "rounded-full bg-accent px-[22px] py-3 text-[15px] font-semibold text-ink"}
          >
            Read the case study →
          </Link>
          {!compact && (
            <a href={project.href} target="_blank" rel="noreferrer" data-cursor="Visit" className="border-b-[1.5px] border-accent pb-[3px] text-[15px] font-semibold text-paper/85">
              {project.linkLabel} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
