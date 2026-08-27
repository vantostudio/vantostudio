import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Grain } from "@/components/ui/Grain";
import { SiteEffects } from "@/components/motion/SiteEffects";
import { RouteScrollReset } from "@/components/motion/RouteScrollReset";
import { site } from "@/data/site";
import "./styles/globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vanto.studio"),
  title: { default: "Vanto — Websites worth trusting", template: "%s — Vanto" },
  description:
    "Independent website strategy, design, and development for professional firms, service businesses, and growing brands.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Vanto",
    locale: "en",
    url: "/",
    title: "Vanto — Websites worth trusting",
    description:
      "Independent website strategy, design, and development for professional firms, service businesses, and growing brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanto — Websites worth trusting",
    description:
      "Independent website strategy, design, and development for professional firms, service businesses, and growing brands.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#studio`,
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      image: `${site.url}/opengraph-image`,
      areaServed: "Worldwide",
      knowsAbout: [
        "Website strategy",
        "Web design",
        "Web development",
        "User experience design",
      ],
      founder: { "@id": `${site.url}/#founder` },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategy & web design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ongoing support" } },
      ],
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: site.founder,
      jobTitle: "Designer and developer",
      worksFor: { "@id": `${site.url}/#studio` },
      url: `${site.url}/about`,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#studio` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, author-controlled string — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <RouteScrollReset />
        <SiteEffects />
        <Grain />
        <Analytics />
      </body>
    </html>
  );
}
