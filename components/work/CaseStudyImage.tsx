import Image from "next/image";

export function CaseStudyImage({
  src,
  alt,
  parallax = false,
}: {
  src: string;
  alt: string;
  parallax?: boolean;
}) {
  return (
    <div
      data-parallax-inner={parallax ? "" : undefined}
      className="relative size-full min-h-52 overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover object-top"
      />
    </div>
  );
}
