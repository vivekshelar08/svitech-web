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
  | "maintenance"
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
    label: "Publish content",
    items: ["posts", "events", "programs", "impact_stories", "reports"],
  },
  {
    label: "Edit website pages",
    items: ["home", "pages", "listings", "navigation", "board"],
  },
  {
    label: "Look & controls",
    items: ["site", "theme", "popup", "cache", "maintenance", "detail"],
  },
  { label: "You", items: ["account"] },
];

/** Quick map used on the dashboard — every public surface → admin tab */
export const websiteEditorMap: {
  label: string;
  preview: string;
  tab: AdminTab;
  hint: string;
}[] = [
  { label: "Home", preview: "/", tab: "home", hint: "Hero, focus areas, campaigns" },
  { label: "About", preview: "/about", tab: "pages", hint: "Story, values, images" },
  { label: "Programs", preview: "/programs", tab: "programs", hint: "Programme cards & categories" },
  { label: "Events", preview: "/events", tab: "events", hint: "Listings & registration" },
  { label: "News", preview: "/news", tab: "posts", hint: "Articles & covers" },
  { label: "Impact", preview: "/impact", tab: "impact_stories", hint: "Stories & metrics" },
  { label: "Reports", preview: "/reports", tab: "reports", hint: "PDFs & board list" },
  { label: "Get involved", preview: "/get-involved", tab: "pages", hint: "Ways to help" },
  { label: "Volunteer", preview: "/volunteer", tab: "listings", hint: "Volunteer page copy" },
  { label: "Donate", preview: "/donate", tab: "listings", hint: "Donate intro & notes" },
  { label: "Contact", preview: "/contact", tab: "pages", hint: "Contact copy & form" },
  { label: "Navigation", preview: "/", tab: "navigation", hint: "Header, donate CTA, sticky bar" },
  { label: "Brand & logo", preview: "/", tab: "site", hint: "Name, logo, SEO, footer" },
  { label: "Colors", preview: "/", tab: "theme", hint: "Brand palette" },
  { label: "Site popup", preview: "/", tab: "popup", hint: "Announcement overlay" },
  { label: "Cache", preview: "/", tab: "cache", hint: "Live vs cached pages" },
  { label: "Maintenance", preview: "/", tab: "maintenance", hint: "Take the public site offline" },
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
  maintenance: "Maintenance",
  account: "Account",
};

export const tabHints: Record<AdminTab, string> = {
  dashboard: "Quick toggles for popup, cache & maintenance, plus activity and content health",
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
  maintenance: "Take the public website offline with a custom message — admin stays available",
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
  "maintenance",
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
