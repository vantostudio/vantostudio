"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroOrbitalField, heroPrisms, heroShards } from "./HeroOrbitalField";
import { createHeroAmbient, type HeroAmbient } from "./heroAmbient";
import { reigniteHero } from "./heroReentry";

export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const section = root?.parentElement;
    const stage = stageRef.current;
    const image = imageRef.current;
    const lens = lensRef.current;
    const light = lightRef.current;
    const color = colorRef.current;
    const glow = cursorGlowRef.current;
    if (!root || !section || !stage || !image || !lens || !light || !color || !glow) return;
    let removePointerListener: (() => void) | undefined;
    let heroActive = true;
    let ambient: HeroAmbient | undefined;

    const context = gsap.context(() => {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const prismElements = gsap.utils.toArray<HTMLElement>("[data-prism]");
      const shardElements = gsap.utils.toArray<HTMLElement>("[data-shard]");
      const orbitElements = gsap.utils.toArray<SVGPathElement>("[data-orbit]");
      const pulseElements = gsap.utils.toArray<SVGCircleElement>("[data-pulse]");
      gsap.set(stage, { scale: 1.07 });
      gsap.set(glow, { x: innerWidth * 0.76, y: innerHeight * 0.4, xPercent: -50, yPercent: -50 });
      if (reduced) {
        gsap.set([lens, glow, ...prismElements, ...shardElements, ...orbitElements, ...pulseElements], { opacity: 0 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(root, { opacity: 0, duration: 1.2 })
        .fromTo(
          image,
          { scale: 1.18, rotation: 1.4, filter: "blur(12px) saturate(.8)" },
          { scale: 1, rotation: 0, filter: "blur(0px) saturate(1)", duration: 2.2 },
          0,
        )
        .fromTo(
          lens,
          { clipPath: "circle(0% at 72% 42%)", opacity: 0 },
          { clipPath: "circle(14% at 72% 42%)", opacity: 0.34, duration: 1.8 },
          0.5,
        )
        .fromTo(
          prismElements,
          { xPercent: 16, opacity: 0 },
          { xPercent: 0, opacity: 0.2, duration: 1.5, stagger: 0.12 },
          0.65,
        )
        .fromTo(
          shardElements,
          { scale: 0, rotation: -80, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 0.62, duration: 1.2, stagger: 0.1, ease: "back.out(1.8)" },
          0.8,
        )
        .fromTo(
          orbitElements,
          { strokeDashoffset: 900, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.46, duration: 2.8, stagger: 0.14, ease: "expo.out" },
          0.55,
        )
        .fromTo(
          pulseElements,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.78, duration: 1, stagger: 0.12, ease: "back.out(2)" },
          1.1,
        )
        .fromTo(
          glow,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 0.42, duration: 1.8, ease: "expo.out" },
          0.8,
        );

      ambient = createHeroAmbient({
        stage,
        light,
        color,
        lens,
        glow,
        prisms: prismElements,
        shards: shardElements,
        orbits: orbitElements,
        pulses: pulseElements,
      });
      const resumeLensDrift = gsap.delayedCall(1.8, () => {
        if (heroActive && !document.hidden) ambient?.lens.resume();
      }).pause();
      const reignite = () =>
        reigniteHero({
          lens: ambient!.lens,
          prisms: prismElements,
          orbits: orbitElements,
          shards: shardElements,
          glow,
        });

      if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const moveImageX = gsap.quickTo(image, "xPercent", { duration: 1.5, ease: "power3.out" });
        const moveImageY = gsap.quickTo(image, "yPercent", { duration: 1.5, ease: "power3.out" });
        const moveColorX = gsap.quickTo(color, "xPercent", { duration: 2.2, ease: "power3.out" });
        const moveGlowX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
        const moveGlowY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });
        const onPointerMove = (event: PointerEvent) => {
          if (!heroActive) return;
          const x = event.clientX / innerWidth;
          const y = event.clientY / innerHeight;
          moveImageX((x - 0.5) * -3);
          moveImageY((y - 0.5) * -2);
          moveColorX((x - 0.5) * 18);
          moveGlowX(event.clientX);
          moveGlowY(event.clientY);
          ambient?.lens.pause();
          resumeLensDrift.restart(true);
          gsap.to(lens, {
            clipPath: `circle(${11 + y * 5}% at ${x * 100}% ${y * 100}%)`,
            duration: 1.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        removePointerListener = () => window.removeEventListener("pointermove", onPointerMove);
      }

      gsap.fromTo(
        root,
        { yPercent: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
        {
          yPercent: 12,
          scale: 1.06,
          opacity: 0.28,
          filter: "blur(7px)",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            onLeave: () => {
              heroActive = false;
              ambient?.pause();
            },
            onEnterBack: () => {
              heroActive = true;
              ambient?.restart();
              reignite();
            },
          },
        },
      );
    }, root);

    const syncPlayback = () => {
      if (!ambient || !heroActive) return;
      if (document.hidden) ambient.pause();
      else ambient.resume();
    };
    const onVisibilityChange = () => syncPlayback();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      removePointerListener?.();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      context.revert();
    };
  }, []);

  return (
    <div data-hero-backdrop ref={rootRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden will-change-transform" aria-hidden="true">
      <div ref={stageRef} className="absolute -inset-[5%] will-change-transform">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/art/hero-cover-joy.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] md:object-center"
          />
        </div>
        {heroPrisms.map((clipPath, index) => (
          <div
            data-prism
            key={clipPath}
            className="absolute inset-0 bg-[url('/art/hero-cover-joy.webp')] bg-cover bg-[position:72%_center] opacity-0 mix-blend-screen will-change-transform md:bg-center"
            style={{ clipPath, transform: `scale(${1.05 + index * 0.025})` }}
          />
        ))}
        <div
          data-hero-lens
          ref={lensRef}
          className="absolute inset-0 bg-[url('/art/hero-cover-joy.webp')] bg-cover bg-[position:72%_center] opacity-0 mix-blend-screen will-change-[clip-path] md:bg-center"
          style={{ filter: "saturate(1.45) contrast(1.08) brightness(1.1)", transform: "scale(1.06)" }}
        />
      </div>
      <div ref={colorRef} className="absolute -right-[12%] bottom-[-20%] size-[68vw] rounded-full bg-[radial-gradient(circle,rgba(224,106,49,.3),rgba(194,157,71,.14)_42%,transparent_70%)] blur-3xl mix-blend-screen will-change-transform" />
      <div ref={lightRef} className="absolute left-[18%] top-[-32%] h-[120%] w-[22%] rotate-[12deg] bg-gradient-to-r from-transparent via-[#ffe9b2]/28 to-transparent opacity-30 blur-3xl mix-blend-screen will-change-transform" />
      <div ref={cursorGlowRef} className="absolute top-0 left-0 size-[clamp(180px,25vw,390px)] rounded-full border border-[#f4c17d]/35 bg-[radial-gradient(circle,rgba(255,222,158,.24)_0%,rgba(218,120,54,.12)_36%,rgba(127,168,147,.08)_54%,transparent_70%)] opacity-0 shadow-[0_0_70px_rgba(220,128,57,.16)] mix-blend-screen will-change-transform" />
      {heroShards.map((className, index) => (
        <span
          data-shard
          key={className}
          className={`absolute opacity-0 ${className} bg-[radial-gradient(circle_at_30%_25%,rgba(255,240,186,.9),rgba(219,120,55,.55)_42%,rgba(73,118,103,.22)_70%,transparent)] shadow-[0_0_30px_rgba(235,146,71,.2)] mix-blend-screen will-change-transform`}
          style={{ clipPath: index % 2 ? "polygon(50% 0,100% 34%,72% 100%,10% 78%,0 22%)" : "polygon(48% 0,100% 52%,57% 100%,0 66%,13% 16%)" }}
        />
      ))}
      <HeroOrbitalField />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,13,10,.88)_0%,rgba(15,13,10,.66)_52%,rgba(15,13,10,.25)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,13,10,.3)_0%,rgba(15,13,10,.12)_48%,rgba(15,13,10,.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,transparent_0%,rgba(15,13,10,.06)_40%,rgba(15,13,10,.36)_100%)]" />
    </div>
  );
}
