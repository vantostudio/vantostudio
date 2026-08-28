"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Layout";
import { projects, type Project, type ProjectSector } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectTile } from "./ProjectTile";

type Filter = "All" | ProjectSector;

const filters: Filter[] = ["All", "Creative", "Lifestyle", "Legal"];

const groups: {
  label: string;
  title: string;
  note: string;
  projects: Project[];
  layout: "feature" | "grid";
}[] = [
  {
    label: "STUDIO-BUILT PRODUCT",
    title: "Built for the real world.",
    note: "A live product conceived, designed, developed, and operated by Vanto.",
    projects: projects.filter((project) => project.kind === "product"),
    layout: "feature",
  },
  {
    label: "INDEPENDENT CONCEPTS",
    title: "Ideas taken all the way.",
    note: "Self-initiated projects used to explore real audiences, industries, and product decisions in depth.",
    projects: projects.filter((project) => project.kind === "concept"),
    layout: "grid",
  },
];

export function WorkGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      projects:
        activeFilter === "All"
          ? group.projects
          : group.projects.filter((project) => project.sector === activeFilter),
    }))
    .filter((group) => group.projects.length);

  return (
    <div className="pb-[clamp(80px,12vw,160px)]">
      <Container>
        <p className="sr-only" aria-live="polite">
          Showing {activeFilter === "All" ? "all" : activeFilter.toLowerCase()} projects.
        </p>
        <div data-fade className="mb-[clamp(72px,10vw,120px)] border-y border-paper/12 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="m-0 font-mono text-[11px] tracking-[0.14em] text-paper/50">
              FILTER BY SECTOR
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by sector">
              {filters.map((filter) => {
                const count =
                  filter === "All"
                    ? projects.length
                    : projects.filter((project) => project.sector === filter).length;
                const active = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-md border px-4 py-2 font-mono text-[11px] tracking-[0.08em] transition-colors ${
                      active
                        ? "border-accent bg-accent-fill text-ink"
                        : "border-paper/20 text-paper/65 hover:border-paper/50 hover:text-paper"
                    }`}
                  >
                    {filter} <span className={active ? "text-ink/55" : "text-paper/35"}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      {visibleGroups.map((group, groupIndex) => (
        <section
          key={group.label}
          className={groupIndex ? "mt-[clamp(96px,14vw,180px)] border-t border-paper/12 pt-[clamp(64px,8vw,104px)]" : ""}
        >
          <Container>
            <div data-fade className="mb-[clamp(56px,8vw,96px)] grid gap-5 md:grid-cols-[1fr_.75fr] md:items-end">
              <div>
                <p className="mb-4 font-mono text-xs tracking-[0.14em] text-accent">( {group.label} )</p>
                <h2 className="m-0 font-serif text-[clamp(34px,5vw,70px)] leading-none tracking-[-0.025em]">{group.title}</h2>
              </div>
              <p className="m-0 max-w-[46ch] text-[15px] leading-[1.65] text-paper/65 md:justify-self-end">{group.note}</p>
            </div>
            {group.layout === "feature" ? (
              <div className="flex flex-col gap-[clamp(72px,12vw,150px)]">
                {group.projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />
                ))}
              </div>
            ) : (
              <div className="grid gap-x-[clamp(24px,4vw,52px)] gap-y-[clamp(64px,9vw,112px)] md:grid-cols-2">
                {group.projects.map((project, projectIndex) => {
                  const lastOdd = group.projects.length % 2 === 1 && projectIndex === group.projects.length - 1;
                  return (
                    <div
                      key={project.slug}
                      className={lastOdd ? "md:col-span-2 md:w-full md:max-w-[560px] md:justify-self-center" : ""}
                    >
                      <ProjectTile project={project} />
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </section>
      ))}
    </div>
  );
}
