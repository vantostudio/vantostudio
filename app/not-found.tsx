import { PageShell } from "@/components/layout/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";

export default function NotFound() {
  return (
    <PageShell footer={false}>
      <section className="flex min-h-svh items-center py-40">
        <Container>
          <Eyebrow>404 / Not found</Eyebrow>
          <h1 className="my-6 max-w-[12ch] font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-[-0.045em]">
            There&apos;s nothing at this address.
          </h1>
          <ButtonLink href="/">Return home</ButtonLink>
        </Container>
      </section>
    </PageShell>
  );
}
