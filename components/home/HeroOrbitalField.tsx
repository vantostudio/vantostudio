export const heroPrisms = [
  "polygon(50% 0,64% 0,49% 100%,35% 100%)",
  "polygon(69% 0,77% 0,68% 100%,57% 100%)",
  "polygon(82% 8%,96% 21%,78% 82%,67% 70%)",
] as const;

export const heroShards = [
  "right-[8%] top-[14%] size-[54px] md:size-[82px]",
  "right-[29%] top-[20%] size-[30px] md:size-[44px]",
  "right-[18%] bottom-[14%] size-[46px] md:size-[72px]",
  "right-[42%] bottom-[24%] size-[24px] md:size-[38px]",
] as const;

export function HeroOrbitalField() {
  return (
    <svg className="absolute inset-0 z-[1] size-full overflow-visible mix-blend-screen" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hero-orbit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8d99b" stopOpacity="0" />
          <stop offset=".42" stopColor="#f3b56f" stopOpacity=".7" />
          <stop offset=".74" stopColor="#7fa893" stopOpacity=".52" />
          <stop offset="1" stopColor="#f8d99b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path data-orbit d="M47 51C49 12 70 0 91 17C111 34 101 75 78 93C55 111 39 84 47 51Z" fill="none" stroke="url(#hero-orbit)" strokeWidth=".13" strokeDasharray="8 5 2 7" opacity=".32" />
      <path data-orbit d="M58 72C40 44 55 13 80 8C105 3 116 32 101 59C86 86 69 89 58 72Z" fill="none" stroke="url(#hero-orbit)" strokeWidth=".1" strokeDasharray="3 8 14 5" opacity=".28" />
      <path data-orbit d="M40 61C53 31 75 19 98 30C112 37 112 62 96 78C77 97 52 87 40 61Z" fill="none" stroke="#f4eddf" strokeWidth=".07" strokeDasharray="1 7" opacity=".2" />
      <circle data-pulse cx="82" cy="20" r=".55" fill="none" stroke="#f4c17d" strokeWidth=".16" opacity=".5" />
      <circle data-pulse cx="68" cy="73" r=".45" fill="none" stroke="#8db7a3" strokeWidth=".14" opacity=".5" />
      <circle data-pulse cx="94" cy="55" r=".38" fill="#f4c17d" opacity=".45" />
    </svg>
  );
}
