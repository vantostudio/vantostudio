import { HomeHero } from "@/components/home/HomeHero";
import { ProjectPreview } from "@/components/home/ProjectPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { HomeProcess } from "@/components/home/HomeProcess";
import { PointOfView } from "@/components/home/PointOfView";
import { FounderPreview } from "@/components/home/FounderPreview";
import { EngagementPreview } from "@/components/home/EngagementPreview";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PageShell } from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell footerProps={{ headline: "Have something to build?" }}>
      <HomeHero />
      <ProjectPreview />
      <PointOfView />
      <ServicesPreview />
      <HomeProcess />
      <FounderPreview />
      <EngagementPreview />
      <HomeFaq />
    </PageShell>
  );
}
