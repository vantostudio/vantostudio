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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => undefined);
        else element.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      element.pause();
    };
  }, [video]);

  function slowPreview() {
    if (videoRef.current) videoRef.current.playbackRate = PREVIEW_RATE;
  }

  return (
    <div className="relative size-full overflow-hidden bg-paper-deep">
      <Image src={poster} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      {video && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={slowPreview}
          className="project-motion-video absolute inset-0 size-full object-cover object-top"
        >
          <source src={video} type="video/webm" />
        </video>
      )}
    </div>
  );
}
