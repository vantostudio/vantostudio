import Link from "next/link";
import type { Project } from "@/data/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ProjectMotion } from "./ProjectMotion";

export function ProjectTile({ project }: { project: Project }) {
  return (
    <article data-work className="flex h-full flex-col text-paper">
      <Link
        href={`/work/${project.slug}`}
        data-cursor="Open"
        data-analytics-event="Work Clicked"
        data-analytics-location="work gallery image"
        data-analytics-project={project.name}
        data-analytics-destination="case study"
        className="block"
      >
        <BrowserFrame domain={project.domain}>
          <div className="aspect-[16/9] overflow-hidden">
            <ProjectMotion
              video={project.video}
              poster={project.image}
              alt={project.imageAlt}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </BrowserFrame>
      </Link>
      <div className="flex flex-1 flex-col border-b border-paper/12 pt-6 pb-7">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.09em]">
          <span className="text-accent">{project.index} — {project.category}</span>
          <span className="text-paper/42">{project.status}</span>
        </div>
        <h3 className="mt-4 font-serif text-[clamp(32px,4vw,52px)] leading-none tracking-[-0.025em]">
          {project.name}
        </h3>
        <p className="mt-4 max-w-[48ch] text-[14px] leading-[1.65] text-paper/62">{project.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-5 pt-6 text-sm font-semibold">
          <Link
            href={`/work/${project.slug}`}
            data-cursor="Read"
            data-analytics-event="Work Clicked"
            data-analytics-location="work gallery details"
            data-analytics-project={project.name}
            data-analytics-destination="case study"
            className="text-accent"
          >
            Read the case study →
          </Link>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="Visit"
            data-analytics-event="Work Clicked"
            data-analytics-location="work gallery details"
            data-analytics-project={project.name}
            data-analytics-destination="live website"
            className="border-b border-paper/28 pb-1 text-paper/72"
          >
            {project.linkLabel} ↗
          </a>
        </div>
      </div>
    </article>
  );
}
