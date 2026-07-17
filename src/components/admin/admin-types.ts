export type AdminTab =
  | "dashboard"
  | "inbox"
  | "posts"
  | "events"
  | "programs"
  | "impact_stories"
  | "reports"
  | "site"
  | "pages"
  | "board"
  | "account";

export type AdminStats = {
  contact: number;
  volunteers: number;
  newsletter: number;
  donations: number;
  eventRegistrations: number;
  posts: number;
  events: number;
  programs: number;
  impactStories: number;
  reports: number;
};

export type AdminInbox = {
  mode: string;
  message?: string;
  stats: AdminStats | null;
  contact: Array<Record<string, unknown>>;
  volunteers: Array<Record<string, unknown>>;
  newsletter: Array<Record<string, unknown>>;
  donations: Array<Record<string, unknown>>;
  eventRegistrations: Array<Record<string, unknown>>;
};

export type NavGroup = {
  label: string;
  items: AdminTab[];
};

export const navGroups: NavGroup[] = [
  { label: "Overview", items: ["dashboard", "inbox"] },
  {
    label: "Content",
    items: ["posts", "events", "programs", "impact_stories", "reports"],
  },
  { label: "Site", items: ["site", "pages", "board"] },
  { label: "You", items: ["account"] },
];

export const tabLabels: Record<AdminTab, string> = {
  dashboard: "Dashboard",
  inbox: "Inbox",
  posts: "News",
  events: "Events",
  programs: "Programs",
  impact_stories: "Impact",
  reports: "Reports",
  site: "Site settings",
  pages: "Page copy",
  board: "Board",
  account: "Account",
};

export const tabHints: Record<AdminTab, string> = {
  dashboard: "Activity snapshot and starter content import",
  inbox: "Form submissions and registrations",
  posts: "Publish and edit news articles",
  events: "Manage upcoming and past events",
  programs: "Program pages and summaries",
  impact_stories: "Impact stories and map metrics",
  reports: "Annual reports and downloads",
  site: "Brand name, contact email, SEO, footer",
  pages: "Home, about, get involved, and contact placeholders",
  board: "Governance board members shown on reports",
  account: "Password change and recovery",
};

export const contentTabs = [
  "posts",
  "events",
  "programs",
  "impact_stories",
  "reports",
] as const;

export type ContentTabType = (typeof contentTabs)[number];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(value: unknown) {
  if (!value || typeof value !== "string") return "—";
  return new Date(value).toLocaleString("en-IN");
}
