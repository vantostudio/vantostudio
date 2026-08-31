import { advocateDossier } from "./case-studies/advocate-dossier";
import { amaniKibwana } from "./case-studies/amani-kibwana";
import { aperture } from "./case-studies/aperture";
import { kairos } from "./case-studies/kairos";
// Brieshon is paused while its hosting is renewed — restore it to `projects` below
// (and drop the eslint-disable) once brieshon.co.ke is serving again.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { brieshon } from "./case-studies/brieshon";
import { littlePaws } from "./case-studies/little-paws";
import { oderaPartners } from "./case-studies/odera-partners";

export type { Project, ProjectSector, ProjectSlug } from "./case-studies/types";

export const projects = [kairos, aperture, advocateDossier, littlePaws, oderaPartners, amaniKibwana];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
