import { board as seedBoard } from "@/content/governance";

export type FocusArea = { title: string; copy: string };
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
};

export type SiteSettings = {
  general: {
    siteName: string;
    tagline: string;
    contactEmail: string;
    responseTime: string;
    footerBlurb: string;
    copyrightNote: string;
    newsletterBlurb: string;
    seoTitle: string;
    seoDescription: string;
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
  };
  getInvolved: {
    eyebrow: string;
    headline: string;
    intro: string;
    ways: InvolveWay[];
    donateHeadline: string;
    donateCopy: string;
  };
  contact: {
    eyebrow: string;
    headline: string;
    intro: string;
  };
  reports: {
    eyebrow: string;
    headline: string;
    intro: string;
    boardTitle: string;
  };
  board: BoardMemberSetting[];
};

export const defaultSiteSettings: SiteSettings = {
  general: {
    siteName: "SVITECH Foundation",
    tagline: "Technology for Social Good",
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
  },
  contact: {
    eyebrow: "Contact",
    headline: "Let’s start a conversation.",
    intro:
      "Tell us about your community, your organization, or how you’d like to help. We read every message.",
  },
  reports: {
    eyebrow: "Transparency",
    headline: "Reports, board, and how we steward gifts.",
    intro: "Governance should be findable in two clicks. Here is ours.",
    boardTitle: "Board",
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
