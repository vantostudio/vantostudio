import { amaniKibwana } from "./case-studies/amani-kibwana";
import { brieshon } from "./case-studies/brieshon";
import { littlePaws } from "./case-studies/little-paws";
import { oderaPartners } from "./case-studies/odera-partners";

export type { Project, ProjectSector, ProjectSlug } from "./case-studies/types";

export const projects = [brieshon, littlePaws, oderaPartners, amaniKibwana];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
