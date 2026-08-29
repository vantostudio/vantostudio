"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PREVIEW_RATE = 0.6;

export function ProjectMotion({
  video,
  poster,
  alt,
  sizes = "(max-width: 768px) calc(100vw - 40px), (max-width: 1360px) calc(100vw - 10vw), 1128px",
}: {
  video?: string;
  poster: string;
  alt: string;
  sizes?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set here as well as on the element's own event: when the file is already
    // cached, loadedmetadata fires before React hydrates and the handler never
    // runs, which left every preview playing at full speed.
    const applyRate = () => {
      element.playbackRate = PREVIEW_RATE;
    };
    applyRate();
    element.addEventListener("loadedmetadata", applyRate);

    // Phones refuse autoplay outright in iOS Low Power Mode and under Android's
    // data saver, and the rejection is silent — the card only ever showed its
    // poster. The refusal is lifted for the rest of the session by the first
    // real gesture, so retry then. It has to be a document-level listener: the
    // preview sits inside a link, so tapping the video itself navigates away.
    let waiting = false;
    const retry = () => {
      waiting = false;
      void element.play().catch(() => undefined);
    };
    const attempt = () => {
      element.play().catch(() => {
        if (waiting) return;
        waiting = true;
        document.addEventListener("pointerdown", retry, { once: true, passive: true });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attempt();
        else element.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      element.removeEventListener("loadedmetadata", applyRate);
      document.removeEventListener("pointerdown", retry);
      element.pause();
    };
  }, [video]);

  return (
    <div className="relative size-full overflow-hidden bg-paper-deep">
      <Image src={poster} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      {video && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="project-motion-video absolute inset-0 size-full object-cover object-top"
        >
          {/* H.264 first. Every browser decodes it, so Safari can never pick a
              WebM it then fails on — and it is the smaller file for most of
              these previews, which matters most on the phones that need it. */}
          <source src={video.replace(/\.webm$/, ".mp4")} type="video/mp4" />
          <source src={video} type="video/webm" />
        </video>
      )}
    </div>
  );
}
