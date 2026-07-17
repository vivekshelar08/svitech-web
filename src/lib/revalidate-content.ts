import { revalidatePath } from "next/cache";
import type { ContentType } from "@/lib/admin-content";

const pathsByType: Record<ContentType, string[]> = {
  posts: ["/news"],
  events: ["/events"],
  programs: ["/programs"],
  impact_stories: ["/impact"],
  reports: ["/reports"],
};

export function revalidatePublicContent(type: ContentType, slug?: string) {
  for (const path of pathsByType[type]) {
    revalidatePath(path);
  }
  if (slug) {
    const detail =
      type === "posts"
        ? `/news/${slug}`
        : type === "events"
          ? `/events/${slug}`
          : type === "programs"
            ? `/programs/${slug}`
            : null;
    if (detail) revalidatePath(detail);
  }
  revalidatePath("/", "layout");
}

export function revalidateAllPublicContent() {
  const types: ContentType[] = [
    "posts",
    "events",
    "programs",
    "impact_stories",
    "reports",
  ];
  for (const type of types) {
    revalidatePublicContent(type);
  }
}
