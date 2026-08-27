import gsap from "gsap";

type HeroAmbientTargets = {
  stage: HTMLDivElement;
  light: HTMLDivElement;
  color: HTMLDivElement;
  lens: HTMLDivElement;
  glow: HTMLDivElement;
  prisms: HTMLElement[];
  shards: HTMLElement[];
  orbits: SVGPathElement[];
  pulses: SVGCircleElement[];
};

export function createHeroAmbient(targets: HeroAmbientTargets) {
  const animations: gsap.core.Animation[] = [];
  const add = <T extends gsap.core.Animation>(animation: T) => {
    animations.push(animation);
    return animation;
  };

  add(gsap.to(targets.stage, {
    xPercent: -1.4,
    yPercent: -0.8,
    scale: 1.13,
    duration: 16,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  }));
  add(gsap.to(targets.light, {
    xPercent: 62,
    rotation: 28,
    opacity: 0.7,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  }));
  add(gsap.to(targets.color, {
    xPercent: -15,
    yPercent: 10,
    scale: 1.2,
    duration: 11,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  }));
  add(gsap.to(targets.glow, {
    scale: 1.22,
    opacity: 0.24,
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  }));

  targets.prisms.forEach((prism, index) => {
    add(gsap.to(prism, {
      xPercent: index % 2 ? -4 : 5,
      yPercent: index % 2 ? 2 : -3,
      filter: `hue-rotate(${index * 12 + 8}deg) saturate(1.55) brightness(1.12)`,
      opacity: 0.3 - index * 0.035,
      duration: 5 + index * 1.7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }));
  });
  targets.shards.forEach((shard, index) => {
    add(gsap.to(shard, {
      keyframes: [
        { x: 10 + index * 3, y: -18 - index * 2, rotation: 18, duration: 2.5 + index },
        { x: -8, y: 9, rotation: -12, duration: 3 + index * 0.6 },
        { x: 0, y: 0, rotation: 0, duration: 2.2 + index * 0.4 },
      ],
      repeat: -1,
      ease: "sine.inOut",
    }));
  });
  targets.orbits.forEach((orbit, index) => {
    add(gsap.to(orbit, {
      rotation: index % 2 ? -360 : 360,
      transformOrigin: "78% 46%",
      duration: 34 + index * 9,
      repeat: -1,
      ease: "none",
    }));
    add(gsap.to(orbit, {
      opacity: index % 2 ? 0.2 : 0.56,
      duration: 3.5 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }));
  });
  targets.pulses.forEach((pulse, index) => {
    add(gsap.to(pulse, {
      scale: 2.6,
      opacity: 0,
      transformOrigin: "center",
      duration: 2.2 + index * 0.4,
      delay: index * 0.6,
      repeat: -1,
      ease: "power2.out",
    }));
  });

  const lens = add(gsap.timeline({ repeat: -1, yoyo: true })
    .to(targets.lens, { clipPath: "circle(12% at 82% 34%)", duration: 6, ease: "sine.inOut" })
    .to(targets.lens, { clipPath: "circle(16% at 64% 62%)", duration: 7, ease: "sine.inOut" }));

  return {
    lens,
    pause: () => animations.forEach((animation) => animation.pause()),
    resume: () => animations.forEach((animation) => animation.resume()),
    restart: () => animations.forEach((animation) => animation.restart()),
  };
}

export type HeroAmbient = ReturnType<typeof createHeroAmbient>;
