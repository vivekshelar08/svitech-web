export type AdminTab =
  | "dashboard"
  | "inbox"
  | "posts"
  | "events"
  | "programs"
  | "impact_stories"
  | "reports"
  | "site"
  | "theme"
  | "navigation"
  | "pages"
  | "listings"
  | "board"
  | "detail"
  | "account";

export type {
  ActivityItem,
  ActivityKind,
  AdminInbox,
  AdminStats,
  ContentCounts,
} from "@/lib/admin-dashboard";
export { activityLabels } from "@/lib/admin-dashboard";

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
  {
    label: "Customize",
    items: ["site", "theme", "navigation", "pages", "listings", "board", "detail"],
  },
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
  site: "Brand & SEO",
  theme: "Colors",
  navigation: "Navigation",
  pages: "Core pages",
  listings: "List pages",
  board: "Board",
  detail: "Detail pages",
  account: "Account",
};

export const tabHints: Record<AdminTab, string> = {
  dashboard: "Command center — activity, content health, and quick actions",
  inbox: "Form submissions and registrations",
  posts: "Publish and edit news articles",
  events: "Manage upcoming and past events",
  programs: "Program pages and summaries",
  impact_stories: "Impact stories and map metrics",
  reports: "Annual reports and downloads",
  site: "Site name, logo, contact email, SEO, footer",
  theme: "Brand colors applied across the whole site",
  navigation: "Header and footer links",
  pages: "Home, about, contact, and get involved copy",
  listings: "Donate, volunteer, programs, events, news, impact, reports intros",
  board: "Governance board members",
  detail: "Back links and CTAs on detail pages",
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

export const settingsTabs = [
  "site",
  "theme",
  "navigation",
  "pages",
  "listings",
  "board",
  "detail",
] as const;

export type SettingsTabType = (typeof settingsTabs)[number];

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
