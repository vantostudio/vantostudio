import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "monthly"],
    ["/work", 0.9, "monthly"],
    ["/services", 0.9, "monthly"],
    ["/about", 0.7, "yearly"],
    ["/contact", 0.8, "yearly"],
    ["/privacy", 0.2, "yearly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    // Case studies come from the same array the site renders, so a new project
    // is in the sitemap the moment it is published.
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
