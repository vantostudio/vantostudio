import type { Metadata } from "next";
import { ProjectForm } from "@/components/contact/ProjectForm";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Layout";
import { getScopeSelection } from "@/data/contact";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell Vanto what you want to build and start a clear conversation about scope, timing, and the right next step.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string | string[] }>;
}) {
  const params = await searchParams;
  const scopeKey = Array.isArray(params.scope) ? params.scope[0] : params.scope;
  const selectedScope = getScopeSelection(scopeKey);

  return (
    <PageShell footer={false}>
      <section className="relative isolate min-h-svh overflow-hidden pt-[clamp(128px,18vh,180px)] pb-[clamp(72px,9vw,120px)]">
        <div
          data-hero-fade
          className="pointer-events-none absolute top-[5%] right-[-16vw] -z-10 aspect-square w-[clamp(340px,52vw,760px)] rounded-full border border-accent/12"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[-20%] right-[-12%] -z-20 aspect-square w-[clamp(420px,62vw,900px)] rounded-full bg-[radial-gradient(circle,rgba(154,106,60,.17),transparent_68%)] blur-3xl"
          aria-hidden="true"
        />
        <Container className="grid items-start gap-[clamp(48px,7vw,100px)] lg:grid-cols-[.62fr_1.38fr]">
          <div data-hero-fade className="lg:sticky lg:top-[140px]">
            <p className="mb-5 font-mono text-xs tracking-[0.14em] text-accent">( START A PROJECT )</p>
            <h1 className="m-0 max-w-[11ch] font-serif text-[clamp(44px,6.2vw,88px)] leading-[0.96] tracking-[-0.035em]">
              Start with the business need.
            </h1>
            <p className="mt-7 max-w-[39ch] text-[clamp(15px,1.35vw,18px)] leading-[1.7] text-paper/68">
              Four short steps give us enough context to understand the opportunity and recommend a useful next conversation.
            </p>
            <dl className="mt-9 grid gap-4 border-t border-paper/14 pt-5 text-sm sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <dt className="font-mono text-[10px] tracking-[0.12em] text-paper/42">RESPONSE</dt>
                <dd className="mt-1.5 text-paper/78">Usually within two business days</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.12em] text-paper/42">WORKING MODEL</dt>
                <dd className="mt-1.5 text-paper/78">A clear project lead from scope to launch</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.12em] text-paper/42">NEXT STEP</dt>
                <dd className="mt-1.5 text-paper/78">Brief → conversation → written proposal</dd>
              </div>
            </dl>
          </div>
          <div
            data-hero-fade
            className="flex flex-col justify-center rounded-[28px] border border-paper/12 bg-ink-soft/72 p-[clamp(24px,4.2vw,56px)] shadow-[0_32px_90px_rgba(0,0,0,.24)] backdrop-blur-sm lg:min-h-[680px]"
          >
            <ProjectForm initialScope={selectedScope?.option} />
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
