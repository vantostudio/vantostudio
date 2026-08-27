import gsap from "gsap";

export function reigniteHero({
  lens,
  prisms,
  orbits,
  shards,
  glow,
}: {
  lens: gsap.core.Timeline;
  prisms: HTMLElement[];
  orbits: SVGPathElement[];
  shards: HTMLElement[];
  glow: HTMLDivElement | null;
}) {
  lens.restart();
  gsap.fromTo(
    prisms,
    { opacity: 0.04, xPercent: 10 },
    { opacity: 0.34, xPercent: 0, duration: 1.15, stagger: 0.07, ease: "power3.out", overwrite: "auto" },
  );
  gsap.fromTo(
    orbits,
    { opacity: 0, strokeDashoffset: 180 },
    { opacity: 0.5, strokeDashoffset: 0, duration: 1.5, stagger: 0.08, ease: "expo.out", overwrite: "auto" },
  );
  gsap.fromTo(
    shards,
    { opacity: 0, scale: 0.5 },
    { opacity: 0.68, scale: 1, duration: 1.1, stagger: 0.06, ease: "back.out(2)", overwrite: "auto" },
  );
  gsap.fromTo(
    glow,
    { opacity: 0, scale: 0.55 },
    { opacity: 0.4, scale: 1, duration: 1.3, ease: "expo.out", overwrite: "auto" },
  );
}
