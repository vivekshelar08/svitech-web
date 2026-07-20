export type AdminTab =
  | "dashboard"
  | "inbox"
  | "posts"
  | "events"
  | "programs"
  | "impact_stories"
  | "reports"
  | "home"
  | "site"
  | "theme"
  | "navigation"
  | "pages"
  | "listings"
  | "board"
  | "detail"
  | "popup"
  | "cache"
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
    label: "Website",
    items: ["home", "popup", "cache", "site", "theme", "navigation"],
  },
  {
    label: "Pages & people",
    items: ["pages", "listings", "board", "detail"],
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
  home: "Home page",
  site: "Brand & SEO",
  theme: "Colors",
  navigation: "Navigation",
  pages: "Core pages",
  listings: "List pages",
  board: "Board",
  detail: "Detail pages",
  popup: "Site popup",
  cache: "Cache policy",
  account: "Account",
};

export const tabHints: Record<AdminTab, string> = {
  dashboard: "Quick toggles for popup & cache, plus activity and content health",
  inbox: "Form submissions and registrations",
  posts: "News — upload covers, duplicate drafts, publish/unpublish",
  events: "Events with covers, registration toggle, and live preview",
  programs: "Programs with cover upload and sort order",
  impact_stories: "Impact stories with metrics, map coords, and covers",
  reports: "Annual reports — upload PDF or paste a URL",
  home: "Hero image, focus areas (with photos), campaigns, and homepage blocks",
  site: "Brand, logo upload, SEO counters, and footer copy",
  theme: "Brand colors applied across the whole site",
  navigation: "Header/footer links and sticky donate — reorder with ↑↓",
  pages: "About, get involved, and contact page copy & images",
  listings: "Donate, volunteer, programs, events, news, impact, reports intros",
  board: "Board members with optional photos — add, reorder, remove",
  detail: "Back links and CTAs on detail pages",
  popup: "Homepage announcement popup — enable, copy, image, and CTA",
  cache: "Live vs cached pages, revalidate interval, and purge",
  account: "Password, recovery, and full website data backup",
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
  "home",
  "site",
  "theme",
  "navigation",
  "pages",
  "listings",
  "board",
  "detail",
  "popup",
  "cache",
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
