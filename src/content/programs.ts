import type { ProgramCategoryId } from "@/lib/program-categories";
import { programs as practicePrograms } from "@/lib/svitech/programs";

export type Program = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  body: string;
  coverImage?: string;
  category: ProgramCategoryId;
  sortOrder: number;
};

const categoryBySlug: Record<string, ProgramCategoryId> = {
  samriddhi: "digital",
  techshala: "education",
  "swasthya-setu": "health",
  "lok-adhikar": "community",
  "urja-prayas": "education",
};

/** Seed programmes aligned to the foundation profile practice portfolios. */
export const programs: Program[] = practicePrograms.map((program, index) => ({
  slug: program.slug,
  name: program.name,
  summary: program.focus,
  detail: program.highlight,
  body: [
    program.problem,
    "",
    program.model,
    "",
    ...program.metrics.map((metric) => `${metric.value} — ${metric.label}`),
  ].join("\n"),
  category: categoryBySlug[program.slug] ?? "community",
  sortOrder: index + 1,
}));
