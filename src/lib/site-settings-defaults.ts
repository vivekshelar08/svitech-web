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
    contactPhone: string;
    officeAddress: string;
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
    phoneLabel: string;
    addressLabel: string;
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
    tagline: "Technology · Education · Community Happiness",
    logoUrl: "/svitech-logo.png",
    logoAlt: "SVITECH Foundation — Education, Technology, Community",
    logoAriaLabel: "SVITECH Foundation home",
    contactEmail: "info@svitech.in",
    contactPhone: "+91 93210 23332",
    officeAddress:
      "Bhaiyalal Chawl, R No. 4, NSS Road, Ghatkopar West, Mumbai 400084, Maharashtra, India",
    responseTime: "Usually within 2–3 business days",
    footerBlurb:
      "Section 8 nonprofit based in Maharashtra—full community programmes at home, Digital Literacy in Pune, and Financial Inclusion projects in other states.",
    copyrightNote: "Working for inclusive community development.",
    newsletterBlurb: "Programme updates and impact notes—rarely, and never spam.",
    seoTitle: "SVITECH Foundation — Digital Skills, Education & Community Welfare",
    seoDescription:
      "SVITECH Foundation: Section 8 nonprofit in Mumbai delivering Financial and Digital Inclusion, health camps, and community outreach. 80G & 12AA registered.",
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
      message: "Support Financial and Digital Inclusion, health camps, and education outreach.",
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
    heroHeadline: "Digital skills. Dignity. Opportunity.",
    heroSubhead:
      "SVITECH Foundation empowers underprivileged youth, women, children, and seniors through digital training, welfare access, education, and community development.",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80",
    heroImageAlt: "Community members gathered for an awareness programme",
    heroCtaPrimary: "Donate",
    heroCtaPrimaryHref: "/donate",
    heroCtaSecondary: "See our impact",
    heroCtaSecondaryHref: "/impact",
    focusEyebrow: "What we do",
    focusHeadline: "Skills, access, and community empowerment.",
    focusIntro:
      "We break cycles of poverty with digital skills training, e-government facilitation, health and education outreach, and partnerships with schools, agencies, and CSR teams.",
    focusAreas: [
      {
        title: "Financial and Digital Inclusion",
        copy: "Flagship programme for digital banking, UPI safety, financial planning, and citizen digital service access.",
      },
      {
        title: "Health & welfare facilitation",
        copy: "Health camps and enrolment support for schemes including Ayushman Bharat (PM-JAY).",
      },
      {
        title: "Education & women empowerment",
        copy: "School programmes, education support in underserved areas, and livelihood training for women.",
      },
    ],
    approachEyebrow: "Our approach",
    approachHeadline: "Train. Facilitate. Mobilize.",
    approachCopy:
      "Capacity building, community mobilization, and strategic partnerships—with educational institutions, government agencies, corporate CSR partners, and local communities—drive sustainable change where it is needed most.",
    approachImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    approachImageAlt: "Workshop facilitator helping a learner at a shared table",
    approachLinkLabel: "Learn about SVITECH Foundation",
    approachLinkHref: "/about",
    ctaHeadline: "Join us in building a more self-reliant society",
    ctaCopy:
      "Volunteer, partner through CSR, or donate—help expand Financial and Digital Inclusion, health camps, and education outreach.",
    ctaButtons: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Upcoming events", href: "/events" },
    ],
    impactStatsEyebrow: "Our impact",
    impactStatsHeadline: "Where the work reaches",
    impactStats: [
      { value: "MH", label: "Full activity suite across Maharashtra" },
      { value: "Pune", label: "Dedicated Digital Literacy programmes" },
      { value: "4", label: "other states with Financial Inclusion projects" },
      { value: "5", label: "states with mapped programme presence" },
    ],
    programsEyebrow: "Our programmes",
    programsHeadline: "Flagship work serving underserved communities",
    programsIntro:
      "From Financial and Digital Inclusion to health camps, education support, and women empowerment—each programme is built for measurable community need.",
    programsCtaLabel: "View all programmes →",
    programsCtaHref: "/programs",
    spotlightEyebrow: "Stories & updates",
    spotlightHeadline: "Latest from the field",
    spotlightViewAllLabel: "View all news →",
    spotlightViewAllHref: "/news",
    quoteEyebrow: "Voices from the work",
    quote: {
      text: "Awareness alone is not enough—SVITECH volunteers helped our community complete documents and enrol for benefits we were entitled to but could not navigate alone.",
      attribution: "Community outreach participant",
      role: "Mumbai, Maharashtra",
    },
    donateStripHeadline: "Your gift funds skills, camps, and access",
    donateStripCopy:
      "Choose a quick amount or give what you can. Contributions support Financial and Digital Inclusion, health camps, and volunteer-driven outreach.",
    donateStripAmounts: [500, 1000, 2500, 5000],
    donateStripLabel: "Donate now",
    campaignsEyebrow: "Support a cause",
    campaignsHeadline: "Programmes you can stand behind",
    campaigns: [
      {
        title: "Financial and Digital Inclusion",
        copy: "Support our flagship programme for digital banking literacy, cyber safety, and access to citizen digital services.",
        href: "/programs/financial-digital-inclusion",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Digital Skills Training",
        copy: "Fund job-ready IT and digital entrepreneurship training for youth and women.",
        href: "/programs/digital-skills-training",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Women Empowerment",
        copy: "Support vocational and livelihood training that builds women's financial independence.",
        href: "/programs/women-empowerment",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Health & Welfare",
        copy: "Enable health camps and PM-JAY enrolment support for underserved families.",
        href: "/programs/health-welfare-facilitation",
        cta: "Know more →",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    accreditationsEyebrow: "Trust & transparency",
    accreditationsHeadline: "Accountability we publish",
    accreditations: [
      {
        name: "Section 8 company",
        description: "Registered under the Companies Act, 2013 as a nonprofit with formal governance.",
      },
      {
        name: "80G & 12AA",
        description: "Income-tax exemptions enabling tax-efficient giving for eligible donors.",
      },
      {
        name: "Published annual reports",
        description: "Financial notes and board information available for public review.",
      },
      {
        name: "Secure online giving",
        description: "Donations processed through Razorpay with emailed receipts after successful payment.",
      },
    ],
    partnersEyebrow: "States we serve",
    partners: [
      { name: "Maharashtra" },
      { name: "Delhi" },
      { name: "Gujarat" },
      { name: "Haryana" },
      { name: "Uttar Pradesh" },
    ],
  },
  about: {
    eyebrow: "About",
    headline: "Social venture for technology, education, and community happiness.",
    intro:
      "SVITECH Foundation was established in 2023 by Vivek G. Shelar and Rajani G. Kulaye in Ghatkopar West, Mumbai. ‘Svitech’ means social venture initiative for technology, education, and community happiness. We empower underprivileged women, youth, children, and senior citizens across Maharashtra through digital innovation and inclusive development.",
    heroImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
    heroImageAlt: "Team collaborating around a shared workspace",
    missionTitle: "Our mission",
    missionCopy:
      "Provide digital skills that make beneficiaries job-ready, connect communities to essential government services, and build capacity for long-term socio-economic growth—so every person can realize their potential with dignity.",
    howTitle: "Our vision",
    howCopy:
      "A society where every underprivileged woman and youth can lead a life of dignity and purpose through digital innovation, quality education, healthcare access, and sustainable employment.",
    valuesTitle: "Values we hold",
    values: [
      {
        title: "Inclusivity",
        copy: "Opportunities for all—regardless of socio-economic background.",
      },
      {
        title: "Integrity",
        copy: "The highest ethical standards in programmes, partnerships, and stewardship.",
      },
      {
        title: "Innovation",
        copy: "Digital tools and practical methods to solve complex community challenges.",
      },
      {
        title: "Collaboration",
        copy: "Partnerships with schools, agencies, CSR teams, and communities to multiply impact.",
      },
    ],
    governanceTitle: "Governance",
    governanceCopy:
      "Registered as a Section 8 company under the Companies Act, 2013, with 80G and 12AA exemptions. An Executive Board provides strategic oversight; community stakeholders inform participatory decision-making. Leadership bios and annual reports are published for public review.",
    governanceLinkLabel: "View reports & board",
    programsLinkLabel: "Explore our programmes",
    seoTitle: "About",
    seoDescription:
      "SVITECH Foundation—founded 2023 in Mumbai—delivers digital skills, welfare access, education, and community development. Section 8 · 80G · 12AA.",
  },
  getInvolved: {
    eyebrow: "Get involved",
    headline: "Help expand skills, access, and opportunity.",
    intro:
      "Whether you give time, expertise, or resources, you strengthen programmes that train youth, empower women, and help families reach public services.",
    ways: [
      {
        title: "Volunteer",
        copy: "Teach, coordinate events, support digital camps, or help with welfare facilitation—flexible local options.",
        href: "/volunteer",
        cta: "Apply to volunteer",
      },
      {
        title: "Corporate partnership",
        copy: "Collaborate on CSR volunteering, ethics sessions, and large-scale community projects.",
        href: "/contact",
        cta: "Start a partnership",
      },
      {
        title: "Sponsor education",
        copy: "Support a child’s learning resources and wellbeing through our Education for All programme.",
        href: "/donate",
        cta: "Give toward education",
      },
    ],
    donateHeadline: "Donate",
    donateCopy:
      "Support Financial and Digital Inclusion, health camps, and volunteer-driven outreach with a one-time or monthly gift.",
    donateCtaPrimary: "Give now",
    donateCtaPrimaryHref: "/donate",
    donateCtaSecondary: "See how gifts are used",
    donateCtaSecondaryHref: "/reports",
    seoTitle: "Get Involved",
    seoDescription:
      "Volunteer, partner, or donate to support SVITECH Foundation’s community programmes.",
  },
  contact: {
    eyebrow: "Contact",
    headline: "Let’s start a conversation.",
    intro:
      "Tell us about your community, CSR goals, or how you’d like to help. We welcome partnerships, volunteering, and donations.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Office",
    responseTimeLabel: "Response time",
    seoTitle: "Contact",
    seoDescription:
      "Reach SVITECH Foundation in Ghatkopar West, Mumbai for partnerships, volunteering, and support.",
  },
  donate: {
    eyebrow: "Donate",
    headline: "Fund programmes that change lives.",
    intro:
      "Your gift provides education, healthcare access, digital skills, and livelihood opportunities. Every contribution helps us reach more underserved families across Maharashtra.",
    bullets: [
      "80G & 12AA registered Section 8 nonprofit",
      "Receipt emailed after successful online payment",
      "Card, UPI, and netbanking via Razorpay · bank transfer & cheque on request",
    ],
    footerNote:
      "Prefer bank transfer, cheque, or CSR partnership? Contact us at info@svitech.in. Cheques may be mailed to our Ghatkopar West office. See impact stories and reports for how gifts are used.",
    seoTitle: "Donate",
    seoDescription:
      "Support SVITECH Foundation with a one-time or monthly donation for digital skills, welfare access, and community programmes.",
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
    headline: "Share time where it multiplies.",
    intro:
      "Teach children, coordinate events, support digital camps, or help families enrol for welfare schemes. Orientation is provided for facilitation roles.",
    bullets: [
      "Volunteer teacher: ~4 hours/week preferred; teaching experience helpful but not required",
      "Event coordinator: organise camps and gatherings with strong communication skills",
      "Flexible local and campaign-based options · also see our donate page",
    ],
    seoTitle: "Volunteer",
    seoDescription:
      "Apply to volunteer with SVITECH Foundation—teaching, events, digital camps, and welfare facilitation.",
  },
  programs: {
    eyebrow: "Programmes",
    headline: "Skills, access, and community development.",
    intro:
      "Financial and Digital Inclusion, digital skills training, women empowerment, health camps, education support, literacy sessions, digital service camps, road safety, and CSR partnerships.",
    itemCtaLabel: "Learn more →",
    bottomCtaLabel: "Partner with a programme",
    bottomCtaHref: "/get-involved",
    seoTitle: "Programmes",
    seoDescription:
      "Financial and Digital Inclusion, digital skills, women empowerment, health, education, and community outreach from SVITECH Foundation.",
  },
  events: {
    eyebrow: "Events",
    headline: "Camps, workshops, and gatherings you can join.",
    intro: "Register online—we’ll confirm by email.",
    registerOpenCta: "View & register",
    registerClosedCta: "View details",
    seoTitle: "Events",
    seoDescription:
      "Upcoming health drives, digital literacy workshops, and fundraising gatherings from SVITECH Foundation.",
  },
  news: {
    eyebrow: "News",
    headline: "Notes from the work.",
    intro: "Activity notes, education and health stories, and how skills programmes turn into livelihoods.",
    seoTitle: "News",
    seoDescription: "Updates and activity notes from SVITECH Foundation.",
  },
  impact: {
    eyebrow: "Impact",
    headline: "Outcomes you can measure.",
    intro:
      "Maharashtra hosts the full activity suite. Pune adds dedicated Digital Literacy. Delhi, Gujarat, Haryana, and Uttar Pradesh focus on the Financial Inclusion project.",
    mapEyebrow: "Where we work",
    mapHeadline: "Maharashtra full suite · Financial Inclusion elsewhere",
    storyCtaLabel: "Support work like this",
    seoTitle: "Impact",
    seoDescription:
      "SVITECH Foundation: all activities in Maharashtra, Digital Literacy in Pune, and Financial Inclusion projects in Delhi, Gujarat, Haryana, and Uttar Pradesh.",
  },
  reports: {
    eyebrow: "Transparency",
    headline: "Reports, board, and how we steward gifts.",
    intro:
      "Section 8 governance, 80G & 12AA status, leadership bios, and annual reports—findable in two clicks.",
    boardTitle: "Leadership",
    annualReportsTitle: "Annual reports",
    downloadLabel: "Download PDF",
    adminNote:
      "Replace placeholder PDFs in public/reports/ with filed annual reports. Keep 80G / 12AA certificates available here when sharing with donors.",
    contactPrompt: "Questions about finances or partnerships?",
    seoTitle: "Reports & governance",
    seoDescription:
      "Annual reports, leadership, and transparency notes from SVITECH Foundation (Section 8 · 80G · 12AA).",
  },
  detailPages: {
    programsBack: "← All programmes",
    programsPartnerCta: "Partner with this programme",
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
