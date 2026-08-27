import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { WorkGallery } from "@/components/work/WorkGallery";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected websites designed and developed by Vanto, an independent studio working worldwide.",
};

export default function WorkPage() {
  return (
    <PageShell footerProps={{ eyebrow: "YOUR TURN", headline: "Ready to make the next project real?" }}>
      <PageHero
        eyebrow="THE WORK"
        note={`${String(projects.length).padStart(2, "0")} SELECTED PROJECTS`}
        lines={[<>Selected websites.</>, <>Built with <em className="text-accent">intent.</em></>]}
        intro="Five independent concepts, each taken from strategy through to a working build. Every case study is explicit about its status and explains the audience, decisions, and experience behind the work."
      />
      <WorkGallery />
    </PageShell>
  );
}
