import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { WorkGallery } from "@/components/work/WorkGallery";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected websites and digital products shaped by Vanto from strategy and design through development.",
};

export default function WorkPage() {
  return (
    <PageShell footerProps={{ eyebrow: "YOUR TURN", headline: "Ready to make the next project real?" }}>
      <PageHero
        eyebrow="THE WORK"
        note={`${String(projects.length).padStart(2, "0")} SELECTED PROJECTS`}
        lines={[<>Selected websites.</>, <>Built with <em className="text-accent">intent.</em></>]}
        intro="Selected work and self-initiated concept studies, each taken from strategy through to a working build. Every case study makes its status clear and explains the decisions behind the experience."
      />
      <WorkGallery />
    </PageShell>
  );
}
