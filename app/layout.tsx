import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Grain } from "@/components/ui/Grain";
import { SiteEffects } from "@/components/motion/SiteEffects";
import { RouteScrollReset } from "@/components/motion/RouteScrollReset";
import "./styles/globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vanto.studio"),
  title: { default: "Vanto — Websites worth trusting", template: "%s — Vanto" },
  description:
    "Independent website strategy, design, and development for professional firms, service businesses, and growing brands.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <RouteScrollReset />
        <SiteEffects />
        <Grain />
      </body>
    </html>
  );
}
