import { board as seedBoard } from "@/content/governance";

export type NavLink = { label: string; href: string };
export type FocusArea = { title: string; copy: string };
export type ImpactStat = { value: string; suffix?: string; label: string };
export type TestimonialQuote = { text: string; attribution: string; role?: string };
export type CampaignCard = {
  title: string;
  copy: string;
  href: string;
  cta: string;
  image?: string;
};
export type Accreditation = { name: string; description: string; logo?: string };
export type PartnerLogo = { name: string; href?: string; image?: string };
export type StickyDonateSettings = {
  enabled: boolean;
  message: string;
  ctaLabel: string;
  ctaHref: string;
};
export type ValueItem = { title: string; copy: string };
export type InvolveWay = {
  title: string;
  copy: string;
  href: string;
  cta: string;
};
export type BoardMemberSetting = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export type PageSeo = {
  seoTitle: string;
  seoDescription: string;
};

export type SiteSettings = {
  general: {
    siteName: string;
    tagline: string;
    logoUrl: string;
    logoAlt: string;
    logoAriaLabel: string;
    contactEmail: string;
    responseTime: string;
    footerBlurb: string;
    copyrightNote: string;
    newsletterBlurb: string;
    seoTitle: string;
    seoDescription: string;
  };
  theme: {
    bg: string;
    bgDeep: string;
    ink: string;
    inkMuted: string;
    brand: string;
    brandBright: string;
    accent: string;
    accentSoft: string;
    surface: string;
  };
  navigation: {
    primaryLinks: NavLink[];
    donateLabel: string;
    donateHref: string;
    stickyDonate: StickyDonateSettings;
  };
  footer: {
    exploreHeading: string;
    exploreLinks: NavLink[];
    takePartHeading: string;
    takePartLinks: NavLink[];
    newsletterHeading: string;
  };
  home: {
    heroHeadline: string;
    heroSubhead: string;
    heroImage: string;
    heroImageAlt: string;
    heroCtaPrimary: string;
    heroCtaPrimaryHref: string;
    heroCtaSecondary: string;
    heroCtaSecondaryHref: string;
    focusEyebrow: string;
    focusHeadline: string;
    focusIntro: string;
    focusAreas: FocusArea[];
    approachEyebrow: string;
    approachHeadline: string;
    approachCopy: string;
    approachImage: string;
    approachImageAlt: string;
    approachLinkLabel: string;
    approachLinkHref: string;
    ctaHeadline: string;
    ctaCopy: string;
    ctaButtons: NavLink[];
    impactStatsEyebrow: string;
    impactStatsHeadline: string;
    impactStats: ImpactStat[];
    programsEyebrow: string;
    programsHeadline: string;
    programsIntro: string;
    programsCtaLabel: string;
    programsCtaHref: string;
    spotlightEyebrow: string;
    spotlightHeadline: string;
    spotlightViewAllLabel: string;
    spotlightViewAllHref: string;
    quoteEyebrow: string;
    quote: TestimonialQuote;
    donateStripHeadline: string;
    donateStripCopy: string;
    donateStripAmounts: number[];
    donateStripLabel: string;
    campaignsEyebrow: string;
    campaignsHeadline: string;
    campaigns: CampaignCard[];
    accreditationsEyebrow: string;
    accreditationsHeadline: string;
    accreditations: Accreditation[];
    partnersEyebrow: string;
    partners: PartnerLogo[];
  };
  about: {
    eyebrow: string;
    headline: string;
    intro: string;
    heroImage: string;
    heroImageAlt: string;
    missionTitle: string;
    missionCopy: string;
    howTitle: string;
    howCopy: string;
    valuesTitle: string;
    values: ValueItem[];
    governanceTitle: string;
    governanceCopy: string;
    governanceLinkLabel: string;
    programsLinkLabel: string;
    seoTitle: string;
    seoDescription: string;
  };
  getInvolved: {
    eyebrow: string;
    headline: string;
    intro: string;
    ways: InvolveWay[];
    donateHeadline: string;
    donateCopy: string;
    donateCtaPrimary: string;
    donateCtaPrimaryHref: string;
    donateCtaSecondary: string;
    donateCtaSecondaryHref: string;
    seoTitle: string;
    seoDescription: string;
  };
  contact: {
    eyebrow: string;
    headline: string;
    intro: string;
    emailLabel: string;
    responseTimeLabel: string;
    seoTitle: string;
    seoDescription: string;
  };
  donate: {
    eyebrow: string;
    headline: string;
    intro: string;
    bullets: string[];
    footerNote: string;
    seoTitle: string;
    seoDescription: string;
  };
  donateThanks: {
    eyebrow: string;
    headline: string;
    receiptNote: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    seoTitle: string;
    seoDescription: string;
  };
  volunteer: {
    eyebrow: string;
    headline: string;
    intro: string;
    bullets: string[];
    seoTitle: string;
    seoDescription: string;
  };
  programs: {
    eyebrow: string;
    headline: string;
    intro: string;
    itemCtaLabel: string;
    bottomCtaLabel: string;
    bottomCtaHref: string;
    seoTitle: string;
    seoDescription: string;
  };
  events: {
    eyebrow: string;
    headline: string;
    intro: string;
    registerOpenCta: string;
    registerClosedCta: string;
    seoTitle: string;
    seoDescription: string;
  };
  news: {
    eyebrow: string;
    headline: string;
    intro: string;
    seoTitle: string;
    seoDescription: string;
  };
  impact: {
    eyebrow: string;
    headline: string;
    intro: string;
    mapEyebrow: string;
    mapHeadline: string;
    storyCtaLabel: string;
    seoTitle: string;
    seoDescription: string;
  };
  reports: {
    eyebrow: string;
    headline: string;
    intro: string;
    boardTitle: string;
    annualReportsTitle: string;
    downloadLabel: string;
    adminNote: string;
    contactPrompt: string;
    seoTitle: string;
    seoDescription: string;
  };
  detailPages: {
    programsBack: string;
    programsPartnerCta: string;
    programsVolunteerCta: string;
    eventsBack: string;
    eventsClosedNote: string;
    newsBack: string;
  };
  board: BoardMemberSetting[];
};

const defaultNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "News", href: "/news" },
  { label: "Reports", href: "/reports" },
  { label: "Get Involved", href: "/get-involved" },
];

export const defaultSiteSettings: SiteSettings = {
  general: {
    siteName: "SVITECH Foundation",
    tagline: "Technology for Social Good",
    logoUrl: "/svitech-logo.png",
    logoAlt: "SVITECH Foundation — Education, Technology, Community",
    logoAriaLabel: "SVITECH Foundation home",
    contactEmail: "hello@svitech.org",
    responseTime: "Usually within 2–3 business days",
    footerBlurb:
      "A nonprofit putting technology in service of communities—through digital literacy, open education, and tools that people can trust.",
    copyrightNote: "Built for social impact.",
    newsletterBlurb: "Program updates and impact notes—rarely, and never spam.",
    seoTitle: "SVITECH Foundation — Technology for Social Good",
    seoDescription:
      "SVITECH Foundation bridges communities with digital skills, open education, and technology that serves people first.",
  },
  theme: {
    bg: "#f2f5fa",
    bgDeep: "#0b1424",
    ink: "#121c2e",
    inkMuted: "#5c6b82",
    brand: "#1b6ef5",
    brandBright: "#4a8ff7",
    accent: "#f0a202",
    accentSoft: "#fff4d6",
    surface: "#f8fafc",
  },
  navigation: {
    primaryLinks: defaultNav,
    donateLabel: "Donate",
    donateHref: "/donate",
    stickyDonate: {
      enabled: true,
      message: "Restore access to digital skills—your gift funds labs, curriculum, and local facilitators.",
      ctaLabel: "Donate now",
      ctaHref: "/donate",
    },
  },
  footer: {
    exploreHeading: "Our work",
    exploreLinks: [
      { label: "About", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Impact", href: "/impact" },
      { label: "Events", href: "/events" },
      { label: "News", href: "/news" },
    ],
    takePartHeading: "Take part",
    takePartLinks: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Reports", href: "/reports" },
      { label: "Contact", href: "/contact" },
    ],
    newsletterHeading: "Newsletter",
  },
  home: {
    heroHeadline: "Technology that serves people first.",
    heroSubhead:
      "We connect communities with digital skills, open education, and tools built for real-world impact—not just the next trend.",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80",
    heroImageAlt: "People gathered around laptops in a community learning space",
    heroCtaPrimary: "Donate",
    heroCtaPrimaryHref: "/donate",
    heroCtaSecondary: "See our impact",
    heroCtaSecondaryHref: "/impact",
    focusEyebrow: "What we do",
    focusHeadline: "Bridging the gap between people and digital opportunity.",
    focusIntro:
      "SVITECH Foundation partners with local leaders to make technology accessible, ethical, and useful—especially where access has been limited.",
    focusAreas: [
      {
        title: "Digital literacy",
        copy: "Hands-on workshops that help people navigate tools, safety, and opportunity online.",
      },
      {
        title: "Open education",
        copy: "Free learning paths built with local educators—practical, multilingual, and open to all.",
      },
      {
        title: "Community tech",
        copy: "Lightweight tools for nonprofits and organizers who need reliability without complexity.",
      },
    ],
    approachEyebrow: "Our approach",
    approachHeadline: "Local partners. Open methods. Lasting skills.",
    approachCopy:
      "We don’t drop in with one-size-fits-all software. We listen, co-design with communities, and leave behind skills—and systems—people can own.",
    approachImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    approachImageAlt: "Workshop facilitator helping a learner at a shared table",
    approachLinkLabel: "Learn about SVITECH Foundation",
    approachLinkHref: "/about",
    ctaHeadline: "Ready to help us expand access?",
    ctaCopy:
      "Volunteer your skills, partner with a program, or support the work that keeps learning free and open.",
    ctaButtons: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Upcoming events", href: "/events" },
    ],
    impactStatsEyebrow: "Our impact",
    impactStatsHeadline: "Communities reached, skills left behind",
    impactStats: [
      { value: "12000", suffix: "+", label: "learners trained through labs and workshops" },
      { value: "48", suffix: "+", label: "partner sites across villages and cities" },
      { value: "4", label: "core programs built for local ownership" },
      { value: "12", suffix: "+", label: "states where facilitators lead independently" },
    ],
    programsEyebrow: "Our programmes",
    programsHeadline: "Practical work that communities can sustain",
    programsIntro:
      "Like leading NGOs, we organize our work into clear programme areas—each designed to be taught, remixed, and carried forward by local partners.",
    programsCtaLabel: "View all programmes →",
    programsCtaHref: "/programs",
    spotlightEyebrow: "Stories & updates",
    spotlightHeadline: "Latest from the field",
    spotlightViewAllLabel: "View all news →",
    spotlightViewAllHref: "/news",
    quoteEyebrow: "Voices from partners",
    quote: {
      text: "SVITECH didn't drop in with a product pitch—they listened, co-designed with our librarians, and left us facilitators who still run the lab every weekend.",
      attribution: "Neighborhood library partner",
      role: "Pune, India",
    },
    donateStripHeadline: "Your gift turns into labs, curriculum, and lasting skills",
    donateStripCopy:
      "Choose a quick amount or give what you can. Every contribution supports facilitator stipends, shared devices, and open learning materials.",
    donateStripAmounts: [500, 1000, 2500, 5000],
    donateStripLabel: "Donate now",
    campaignsEyebrow: "Support a cause",
    campaignsHeadline: "Campaigns you can stand behind",
    campaigns: [
      {
        title: "Labs for Every Library",
        copy: "Help neighbourhood libraries run weekend digital labs with shared devices and trained facilitators.",
        href: "/programs/community-digital-labs",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Open Curriculum, Local Languages",
        copy: "Fund translation and adaptation of open learning kits for educators in rural and semi-urban centres.",
        href: "/programs/open-learning-paths",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Youth Mentor Circles",
        copy: "Pair emerging community technologists with mentors for monthly project coaching and real outcomes.",
        href: "/programs/mentor-circles",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Tools Nonprofits Can Keep",
        copy: "Support lightweight websites and intake systems that small organizations can maintain themselves.",
        href: "/programs/nonprofit-tooling",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    accreditationsEyebrow: "Trust & transparency",
    accreditationsHeadline: "Empanelment & accreditations",
    accreditations: [
      {
        name: "Published annual reports",
        description: "Financial notes and board information available for public review every year.",
      },
      {
        name: "Open curriculum licenses",
        description: "Learning materials released under open licenses communities can adapt and share.",
      },
      {
        name: "Partner-verified impact",
        description: "Outcomes tracked with local partners—not vanity metrics from a distant dashboard.",
      },
      {
        name: "Secure online giving",
        description: "Donations processed through Razorpay with emailed receipts after successful payment.",
      },
    ],
    partnersEyebrow: "Our partners in change",
    partners: [
      { name: "Public library networks" },
      { name: "Rural educator collectives" },
      { name: "Youth development centres" },
      { name: "Grassroots nonprofits" },
      { name: "CSR & philanthropy partners" },
    ],
  },
  about: {
    eyebrow: "About",
    headline: "Built for communities that deserve better tech.",
    intro:
      "SVITECH Foundation began with a simple conviction: technology should widen opportunity, not deepen divides. Today we work with educators, organizers, and local leaders to make digital skills and tools accessible where they matter most.",
    heroImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
    heroImageAlt: "Team collaborating around a shared workspace",
    missionTitle: "Our mission",
    missionCopy:
      "Equip people with the confidence and capability to use technology for learning, livelihood, and community care—on their own terms.",
    howTitle: "How we work",
    howCopy:
      "We co-design with partners, publish open materials, train facilitators, and measure success by what communities keep long after a project ends.",
    valuesTitle: "Values we hold",
    values: [
      {
        title: "Dignity",
        copy: "People are partners, not beneficiaries of a product pitch.",
      },
      {
        title: "Openness",
        copy: "Knowledge we create should be shareable, adaptable, and free.",
      },
      {
        title: "Stewardship",
        copy: "We choose tools that communities can maintain without us.",
      },
    ],
    governanceTitle: "Governance",
    governanceCopy:
      "Board members, annual reports, and financial notes are published for public review—because trust should not require a scavenger hunt.",
    governanceLinkLabel: "View reports & board",
    programsLinkLabel: "Explore our programs",
    seoTitle: "About",
    seoDescription:
      "Learn how SVITECH Foundation started and why we put communities at the center of technology.",
  },
  getInvolved: {
    eyebrow: "Get involved",
    headline: "Help put technology in service of people.",
    intro:
      "Whether you give time, expertise, or resources, you strengthen programs that communities can grow on their own.",
    ways: [
      {
        title: "Volunteer",
        copy: "Teach a workshop, mentor a cohort, or help translate open learning materials.",
        href: "/volunteer",
        cta: "Apply to volunteer",
      },
      {
        title: "Partner",
        copy: "Bring SVITECH Foundation programs to your school, library, or community organization.",
        href: "/contact",
        cta: "Start a partnership",
      },
      {
        title: "Advocate",
        copy: "Share our open curriculum and help more communities find tools they can trust.",
        href: "/news",
        cta: "Read & share",
      },
    ],
    donateHeadline: "Donate",
    donateCopy:
      "Support facilitator stipends, shared lab equipment, and free curriculum with a one-time or monthly gift.",
    donateCtaPrimary: "Give now",
    donateCtaPrimaryHref: "/donate",
    donateCtaSecondary: "See how gifts are used",
    donateCtaSecondaryHref: "/reports",
    seoTitle: "Get Involved",
    seoDescription:
      "Volunteer, partner, or donate to support SVITECH Foundation’s community technology programs.",
  },
  contact: {
    eyebrow: "Contact",
    headline: "Let’s start a conversation.",
    intro:
      "Tell us about your community, your organization, or how you’d like to help. We read every message.",
    emailLabel: "Email",
    responseTimeLabel: "Response time",
    seoTitle: "Contact",
    seoDescription:
      "Reach the SVITECH Foundation team for partnerships, volunteering, and support.",
  },
  donate: {
    eyebrow: "Donate",
    headline: "Fund skills communities can keep.",
    intro:
      "Your gift supports facilitator stipends, shared devices, and open learning materials—not overhead theater. Choose one-time or monthly giving.",
    bullets: [
      "Transparent programs and published reports",
      "Receipt emailed after successful payment",
      "Card, UPI, and netbanking via Razorpay",
    ],
    footerNote:
      "Prefer partnership or CSR? Talk to us via contact. See impact stories and reports for how gifts are used.",
    seoTitle: "Donate",
    seoDescription:
      "Support SVITECH Foundation with a one-time or monthly donation. Funds facilitator stipends, lab equipment, and open curriculum.",
  },
  donateThanks: {
    eyebrow: "Thank you",
    headline: "Your support is in motion.",
    receiptNote: "A receipt is on its way to your email.",
    ctaPrimary: "See our impact",
    ctaPrimaryHref: "/impact",
    ctaSecondary: "Read the latest",
    ctaSecondaryHref: "/news",
    seoTitle: "Thank you",
    seoDescription: "Thank you for supporting SVITECH Foundation.",
  },
  volunteer: {
    eyebrow: "Volunteer",
    headline: "Share skills where they multiply.",
    intro:
      "Facilitate labs, mentor a cohort, translate open curriculum, or help a partner nonprofit keep their tools running.",
    bullets: [
      "Flexible hours; remote and in-person options",
      "Training and curriculum kits provided",
      "Prefer donating time and money? Also see our donate page",
    ],
    seoTitle: "Volunteer",
    seoDescription:
      "Apply to volunteer with SVITECH Foundation—teach, mentor, translate, or support community labs.",
  },
  programs: {
    eyebrow: "Programs",
    headline: "Practical programs that leave skills behind.",
    intro:
      "Every SVITECH Foundation program is built to be taught, remixed, and sustained by the communities who use it.",
    itemCtaLabel: "Learn more →",
    bottomCtaLabel: "Partner with a program",
    bottomCtaHref: "/get-involved",
    seoTitle: "Programs",
    seoDescription:
      "Digital literacy labs, open learning paths, and community tech builds from SVITECH Foundation.",
  },
  events: {
    eyebrow: "Events",
    headline: "Trainings and gatherings you can join.",
    intro: "Register online—we’ll confirm by email.",
    registerOpenCta: "View & register",
    registerClosedCta: "View details",
    seoTitle: "Events",
    seoDescription:
      "Upcoming trainings, meetups, and demo days from SVITECH Foundation.",
  },
  news: {
    eyebrow: "News",
    headline: "Notes from the work.",
    intro: "Program updates, open curriculum thinking, and how gifts turn into labs.",
    seoTitle: "News",
    seoDescription: "Updates, essays, and transparency notes from SVITECH Foundation.",
  },
  impact: {
    eyebrow: "Impact",
    headline: "Proof over pledges.",
    intro:
      "Specific places, measurable outcomes, and stories communities can verify—not vague statistics.",
    mapEyebrow: "Where we work",
    mapHeadline: "Impact across communities",
    storyCtaLabel: "Support work like this",
    seoTitle: "Impact",
    seoDescription:
      "See where SVITECH Foundation programs create measurable community outcomes.",
  },
  reports: {
    eyebrow: "Transparency",
    headline: "Reports, board, and how we steward gifts.",
    intro: "Governance should be findable in two clicks. Here is ours.",
    boardTitle: "Board",
    annualReportsTitle: "Annual reports",
    downloadLabel: "Download PDF",
    adminNote:
      "Placeholder PDFs can be replaced in public/reports/. For tax exemption / 80G documents, add them here when available.",
    contactPrompt: "Questions about finances or partnerships?",
    seoTitle: "Reports & governance",
    seoDescription:
      "Annual reports, board information, and transparency notes from SVITECH Foundation.",
  },
  detailPages: {
    programsBack: "← All programs",
    programsPartnerCta: "Partner with this program",
    programsVolunteerCta: "Volunteer",
    eventsBack: "← All events",
    eventsClosedNote: "Registration is closed.",
    newsBack: "← All news",
  },
  board: seedBoard.map((m) => ({ ...m })),
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep<T>(base: T, patch: unknown): T {
  if (!isObject(base) || !isObject(patch)) {
    return (patch === undefined ? base : patch) as T;
  }
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    const current = out[key];
    if (Array.isArray(value)) {
      out[key] = value;
    } else if (isObject(current) && isObject(value)) {
      out[key] = mergeDeep(current, value);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

export function mergeSiteSettings(patch: unknown): SiteSettings {
  return mergeDeep(defaultSiteSettings, patch);
}
