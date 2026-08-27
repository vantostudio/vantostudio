import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { WorkGallery } from "@/components/work/WorkGallery";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected websites designed and developed by Vanto in Kenya.",
};

export default function WorkPage() {
  return (
    <PageShell footerProps={{ eyebrow: "YOUR TURN", headline: "Ready to make the next project real?" }}>
      <PageHero
        eyebrow="THE WORK"
        note="04 SELECTED PROJECTS"
        lines={[<>Selected websites.</>, <>Built with <em className="text-accent">intent.</em></>]}
        intro="One live founder-owned product and three independent concepts. Each case study is explicit about its status and explains the audience, decisions, and experience behind the work."
      />
      <WorkGallery />
    </PageShell>
  );
}
