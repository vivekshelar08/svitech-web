export type ContentCounts = {
  total: number;
  published: number;
  drafts: number;
};

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
  donationsInr: number;
  donationsPaid: number;
  upcomingEvents: number;
  inboxTotal: number;
  weekContact: number;
  weekVolunteers: number;
  weekDonations: number;
  content: {
    posts: ContentCounts;
    events: ContentCounts;
    programs: ContentCounts;
    impactStories: ContentCounts;
    reports: ContentCounts;
  };
};

export type ActivityKind =
  | "contact"
  | "volunteer"
  | "newsletter"
  | "donation"
  | "event_registration";

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  title: string;
  subtitle?: string;
  meta?: string;
  createdAt: string;
};

export type AdminInbox = {
  mode: string;
  message?: string;
  stats: AdminStats | null;
  activity: ActivityItem[];
  fetchedAt: string;
  contact: Array<Record<string, unknown>>;
  volunteers: Array<Record<string, unknown>>;
  newsletter: Array<Record<string, unknown>>;
  donations: Array<Record<string, unknown>>;
  eventRegistrations: Array<Record<string, unknown>>;
};

export const activityLabels: Record<ActivityKind, string> = {
  contact: "Contact",
  volunteer: "Volunteer",
  newsletter: "Newsletter",
  donation: "Donation",
  event_registration: "Event signup",
};

export const emptyContentCounts = (): ContentCounts => ({
  total: 0,
  published: 0,
  drafts: 0,
});
