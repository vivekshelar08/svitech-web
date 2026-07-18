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
  posts: "News — upload covers, duplicate drafts, publish/unpublish",
  events: "Events with covers, registration toggle, and live preview",
  programs: "Programs with cover upload and sort order",
  impact_stories: "Impact stories with metrics, map coords, and covers",
  reports: "Annual reports — upload PDF or paste a URL",
  site: "Brand, logo upload, SEO counters, and footer copy",
  theme: "Brand colors applied across the whole site",
  navigation: "Header/footer links and sticky donate — reorder with ↑↓",
  pages: "Every homepage and core-page block — add, edit, remove lists",
  listings: "Donate, volunteer, programs, events, news, impact, reports intros",
  board: "Board members with optional photos — add, reorder, remove",
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
