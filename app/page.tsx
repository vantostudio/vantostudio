import { HomeHero } from "@/components/home/HomeHero";
import { ProjectPreview } from "@/components/home/ProjectPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { HomeProcess } from "@/components/home/HomeProcess";
import { PointOfView } from "@/components/home/PointOfView";
import { StudioModel } from "@/components/home/StudioModel";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeFaq } from "@/components/home/HomeFaq";
import { PageShell } from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <PageShell footerProps={{ headline: "Have something important to build?" }}>
      <HomeHero />
      <ProjectPreview />
      <PointOfView />
      <ServicesPreview />
      <HomeProcess />
      <StudioModel />
      <Testimonials />
      <HomeFaq />
    </PageShell>
  );
}
