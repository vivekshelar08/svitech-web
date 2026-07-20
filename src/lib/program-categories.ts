export const PROGRAM_CATEGORY_OPTIONS = [
  { id: "digital", label: "Digital" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health" },
  { id: "community", label: "Community" },
  { id: "women", label: "Women" },
  { id: "csr", label: "CSR" },
] as const;

export type ProgramCategoryId = (typeof PROGRAM_CATEGORY_OPTIONS)[number]["id"];

export function isProgramCategoryId(value: string): value is ProgramCategoryId {
  return PROGRAM_CATEGORY_OPTIONS.some((option) => option.id === value);
}

/** Fallback when older rows have no category column/value yet. */
export function inferProgramCategory(
  slug: string,
  name = "",
): ProgramCategoryId {
  const hay = `${slug} ${name}`.toLowerCase();
  if (/women|empowerment/.test(hay)) return "women";
  if (/health|welfare|ayushman|pm-jay|medical/.test(hay)) return "health";
  if (/school|education|literacy|vidya/.test(hay) && !/financial|digital/.test(hay)) {
    return "education";
  }
  if (/csr|corporate|road.?safety/.test(hay)) return "csr";
  if (/community|capacity|awareness|camp/.test(hay) && !/digital|financial/.test(hay)) {
    return "community";
  }
  if (/digital|financial|upi|skills|it\b|cyber/.test(hay)) return "digital";
  return "community";
}

export function resolveProgramCategory(
  category: string | null | undefined,
  slug: string,
  name = "",
): ProgramCategoryId {
  if (category && isProgramCategoryId(category)) return category;
  return inferProgramCategory(slug, name);
}

export function programCategoryLabel(id: ProgramCategoryId) {
  return PROGRAM_CATEGORY_OPTIONS.find((option) => option.id === id)?.label || id;
}
