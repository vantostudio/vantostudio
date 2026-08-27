import { Container } from "@/components/ui/Layout";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  // Renders nothing until there is a real, attributable quote to show.
  if (!testimonials.length) return null;

  return (
    <section className="border-t border-paper-line bg-paper py-[clamp(72px,10vw,140px)] text-ink">
      <Container>
        <p data-fade className="mb-[clamp(32px,4vw,52px)] font-mono text-xs tracking-[0.14em] text-accent">
          ( IN THEIR WORDS )
        </p>
        <div className="grid gap-[clamp(24px,3vw,40px)] md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              data-fade
              key={`${item.name}-${item.company}`}
              className="m-0 flex flex-col rounded-[20px] border border-paper-line bg-paper-card p-[clamp(24px,3vw,36px)]"
            >
              <blockquote className="m-0 text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-ink">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-auto pt-6 text-sm">
                <span className="block font-semibold text-ink">{item.name}</span>
                <span className="mt-1 block text-[#5f584d]">
                  {item.role}, {item.company}
                </span>
                <span className="mt-2 block font-mono text-[10px] tracking-[0.1em] text-[#8a8172]">
                  {item.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
