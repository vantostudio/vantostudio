import { ImageResponse } from "next/og";

export const alt = "Vanto — Independent website strategy, design, and development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Instrument Serif is fetched at build time so the card matches the site's
 * typography. If the fetch fails the card still renders in the runtime's
 * default face rather than failing the build.
 */
async function serifFont() {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((res) => res.text());
    const url = css.match(/src: url\((https:\/\/[^)]+\.(?:ttf|woff2?))\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((res) => res.arrayBuffer());
    return { name: "Instrument Serif", data, style: "normal" as const, weight: 400 as const };
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await serifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14110d",
          color: "#f4eddf",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 2,
            color: "rgba(244,237,223,0.55)",
          }}
        >
          <span>INDEPENDENT DESIGN &amp; DEVELOPMENT STUDIO</span>
          <span>WORKING WORLDWIDE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1.04,
              letterSpacing: -3,
              fontFamily: font ? "Instrument Serif" : undefined,
            }}
          >
            A website worth trusting
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1.04,
              letterSpacing: -3,
              color: "#d39150",
              fontFamily: font ? "Instrument Serif" : undefined,
            }}
          >
            before you say a word.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 46, fontFamily: font ? "Instrument Serif" : undefined }}>Vanto</span>
            <span
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 12,
                background: "#9a6a3c",
              }}
            />
          </div>
          <span style={{ fontSize: 24, letterSpacing: 1.5, color: "rgba(244,237,223,0.55)" }}>
            STRATEGY · DESIGN · DEVELOPMENT
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [font] : undefined },
  );
}
