"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("custom-cursor-active");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });
    let mode = "";

    const move = (event: PointerEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      gsap.to([dot, ring], { opacity: 1, duration: 0.18, overwrite: "auto" });
    };
    const over = (event: PointerEvent) => {
      const element = event.target as Element;
      const labelled = element.closest<HTMLElement>("[data-cursor]");
      const interactive = element.closest("a,button,input,textarea,select,[role=button]");
      const nextMode = labelled ? `label:${labelled.dataset.cursor}` : interactive ? "interactive" : "default";
      if (nextMode === mode) return;
      mode = nextMode;

      if (labelled) {
        label.textContent = labelled.dataset.cursor ?? "";
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.2 });
        gsap.to(ring, {
          width: 76,
          height: 76,
          backgroundColor: "rgba(211,145,80,.96)",
          borderColor: "rgba(244,237,223,.9)",
          boxShadow: "0 0 0 1px rgba(20,17,13,.7), 0 12px 34px rgba(0,0,0,.35)",
          duration: 0.28,
          overwrite: "auto",
        });
        gsap.to(dot, { opacity: 0, scale: 0.4, duration: 0.18 });
        return;
      }

      label.textContent = "";
      gsap.to(label, { opacity: 0, scale: 0.7, duration: 0.16 });
      gsap.to(ring, {
        width: interactive ? 58 : 44,
        height: interactive ? 58 : 44,
        backgroundColor: interactive ? "rgba(20,17,13,.34)" : "rgba(20,17,13,.12)",
        borderColor: interactive ? "rgba(244,237,223,.9)" : "rgba(244,237,223,.68)",
        boxShadow: "0 0 0 1px rgba(20,17,13,.38), 0 8px 24px rgba(0,0,0,.22)",
        duration: 0.24,
        overwrite: "auto",
      });
      gsap.to(dot, { opacity: 1, scale: interactive ? 1.25 : 1, duration: 0.18 });
    };
    const press = () => gsap.to(ring, { scale: 0.82, duration: 0.12, ease: "power2.out" });
    const release = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(2.4)" });
    const hide = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[102] size-2.5 rounded-full border border-ink/70 bg-paper opacity-0 shadow-[0_0_0_2px_rgba(154,106,60,.85)] will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[101] flex size-11 items-center justify-center rounded-full border border-paper/70 bg-ink/10 opacity-0 backdrop-blur-[2px] will-change-transform"
        aria-hidden="true"
      >
        <span ref={labelRef} className="max-w-[64px] text-center font-mono text-[9px] font-semibold tracking-[0.07em] text-ink uppercase opacity-0" />
      </div>
    </>
  );
}
