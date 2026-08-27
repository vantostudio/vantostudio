"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "./CustomCursor";

export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      if (!reduced) {
        const heroLines = gsap.utils.toArray<HTMLElement>("[data-line-inner]");
        const heroDetails = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
        if (heroLines.length) {
          gsap.from(heroLines, {
            yPercent: 115,
            duration: 1,
            stagger: 0.09,
            ease: "power3.out",
          });
        }
        if (heroDetails.length) {
          gsap.from(heroDetails, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.28,
            ease: "power3.out",
          });
        }
        gsap.utils.toArray<HTMLElement>("[data-word]").forEach((element) => {
          gsap.from(element, {
            yPercent: 110,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: element.closest("p"), start: "top 80%", once: true },
          });
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((element) => {
        gsap.from(element, {
          y: reduced ? 0 : 34,
          opacity: reduced ? 1 : 0,
          duration: reduced ? 0.01 : 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-work]").forEach((element) => {
        gsap.from(element, {
          y: reduced ? 0 : 60,
          opacity: reduced ? 1 : 0,
          duration: reduced ? 0.01 : 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%", once: true },
        });
      });
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>("[data-parallax-inner]").forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -8, scale: 1.12 },
            {
              yPercent: 8,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: element.parentElement ?? element, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        const mark = document.querySelector("[data-bigmark]");
        if (mark) {
          gsap.fromTo(mark, { x: -40 }, { x: 40, ease: "none", scrollTrigger: { trigger: mark, start: "top bottom", end: "bottom top", scrub: true } });
        }
        const section = document.querySelector<HTMLElement>("[data-pin-section]");
        const viewport = document.querySelector<HTMLElement>("[data-pin-viewport]");
        const track = document.querySelector<HTMLElement>("[data-pin-track]");
        if (section && viewport && track && innerWidth > 720) {
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth + innerWidth * 0.1);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }
      }
    }, document.body);

    const magneticMove = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>("[data-magnetic]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.3;
      const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.45;
      target.style.transform = `translate(${dx}px,${dy}px)`;
    };
    const magneticLeave = (event: PointerEvent) => {
      const target = (event.target as Element).closest<HTMLElement>("[data-magnetic]");
      if (target) target.style.transform = "translate(0,0)";
    };
    document.addEventListener("pointermove", magneticMove, { passive: true });
    document.addEventListener("pointerout", magneticLeave, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", magneticMove));
    cleanups.push(() => document.removeEventListener("pointerout", magneticLeave));
    const navbar = document.querySelector<HTMLElement>("[data-navbar]");
    const updateNav = () => {
      if (!navbar) return;
      const scrolled = scrollY > 40;
      navbar.style.background = scrolled
        ? "rgba(20,17,13,.8)"
        : pathname === "/contact"
          ? "rgba(20,17,13,.72)"
          : "rgba(20,17,13,.55)";
      navbar.style.borderColor = scrolled ? "rgba(244,237,223,.18)" : "rgba(244,237,223,.12)";
      navbar.style.boxShadow = scrolled ? "0 12px 40px rgba(0,0,0,.3)" : "none";
    };
    window.addEventListener("scroll", updateNav, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", updateNav));
    updateNav();
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [pathname]);

  return <CustomCursor />;
}
