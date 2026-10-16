import { board as seedBoard } from "@/content/governance";

export type NavLink = { label: string; href: string };
export type FocusArea = {
  title: string;
  copy: string;
  image?: string;
  href?: string;
};
export type SitePopupSettings = {
  enabled: boolean;
  title: string;
  body: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  dismissLabel: string;
  /** once = forever after dismiss; session = until browser closes; daily = once per day */
  frequency: "once" | "session" | "daily";
};
export type SiteCacheSettings = {
  /** live = always fresh; cached = allow ISR / page revalidate */
  mode: "live" | "cached";
  /** Seconds used when mode is cached (page ISR hint) */
  revalidateSeconds: number;
  /** Keep header/footer/nav reading live even in cached mode */
  forceLiveChrome: boolean;
};
export type SiteMaintenanceSettings = {
  enabled: boolean;
  title: string;
  message: string;
  /** Optional note e.g. "Back online this evening" */
  note: string;
  showContact: boolean;
};
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
export type ReachState = { name: string; note: string };
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
    donateShortLabel: string;
    /** Dropdown under Programs — e.g. Projects, Activities, Upcoming Events */
    programsMenuLinks: NavLink[];
    stickyDonate: StickyDonateSettings;
    showTopBar: boolean;
    trustBadge: string;
    showMemberLogin: boolean;
    memberLoginLabel: string;
    memberLoginHref: string;
  };
  footer: {
    exploreHeading: string;
    exploreLinks: NavLink[];
    takePartHeading: string;
    takePartLinks: NavLink[];
    legalHeading: string;
    legalLinks: NavLink[];
    newsletterHeading: string;
    donateLabel: string;
    donateHref: string;
    tagline: string;
  };
  home: {
    heroEyebrow: string;
    heroHeadline: string;
    heroSubhead: string;
    heroImage: string;
    heroImageAlt: string;
    heroSecondaryImage: string;
    heroSecondaryImageAlt: string;
    heroCtaPrimary: string;
    heroCtaPrimaryHref: string;
    heroCtaSecondary: string;
    heroCtaSecondaryHref: string;
    heroTrustChecks: string[];
    heroImpactBadge: string;
    marqueeItems: string[];
    wayEyebrow: string;
    wayHeadline: string;
    wayIntro: string;
    wayPillars: ValueItem[];
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
    reachEyebrow: string;
    reachHeadline: string;
    reachIntro: string;
    reachStates: ReachState[];
    reachCtaLabel: string;
    reachCtaHref: string;
    galleryEyebrow: string;
    galleryHeadline: string;
    galleryIntro: string;
    galleryCtaLabel: string;
    galleryCtaHref: string;
    ctaHeadline: string;
    ctaCopy: string;
    ctaButtons: NavLink[];
    impactStatsEyebrow: string;
    impactStatsHeadline: string;
    impactStats: ImpactStat[];
    missionBandEnabled: boolean;
    missionEyebrow: string;
    visionEyebrow: string;
    programsItemCtaLabel: string;
    donateStripEyebrow: string;
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
    governanceLinkHref: string;
    programsLinkHref: string;
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
    formNameLabel: string;
    formEmailLabel: string;
    formTopicLabel: string;
    formMessageLabel: string;
    formSubmitLabel: string;
    formSuccessMessage: string;
    formTopics: string[];
    seoTitle: string;
    seoDescription: string;
  };
  donate: {
    eyebrow: string;
    headline: string;
    intro: string;
    bullets: string[];
    footerNote: string;
    presetAmounts: number[];
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
    filtersTitle: string;
    bannerImage: string;
    breadcrumbHome: string;
    emptyMessage: string;
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
    storyCtaHref: string;
    seoTitle: string;
    seoDescription: string;
  };
  gallery: {
    eyebrow: string;
    headline: string;
    intro: string;
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
    contactLinkLabel: string;
    emailAutomation: {
      /** Send activity mail when a project starts */
      sendActivityMailAtProjectStart: boolean;
      /** Send activity mail later during project execution */
      sendActivityMailLater: boolean;
      /** Keep beneficiary status mails off until workflow is finalized */
      sendStatusMail: boolean;
      /** Include report links/files in selected formats */
      reportFormats: {
        pdf: boolean;
        csv: boolean;
        xlsx: boolean;
      };
    };
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
  popup: SitePopupSettings;
  cache: SiteCacheSettings;
  maintenance: SiteMaintenanceSettings;
  board: BoardMemberSetting[];
};

const defaultNav: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Intervention", href: "/work" },
  { label: "Impact", href: "/impact" },
  { label: "Partners", href: "/partner" },
  { label: "Contact Us", href: "/contact" },
];

const defaultProgramsMenu: NavLink[] = [
  { label: "Our Intervention", href: "/work" },
  { label: "Lok Adhikaar · Samriddhi Kendras", href: "/work/samriddhi" },
  { label: "Svitech Shiksha Kendra", href: "/work/techshala" },
  { label: "Swasthya Setu", href: "/work/swasthya-setu" },
  { label: "Lok Adhikaar · Civic & Kala-Sanvad", href: "/work/lok-adhikar" },
  { label: "Mission Ankur", href: "/work/urja-prayas" },
];

export const defaultSiteSettings: SiteSettings = {
  general: {
    siteName: "SVITECH Foundation",
    tagline: "Right Entitlements. Lasting Change.",
    logoUrl: "/svitech-logo.png",
    logoAlt: "SVITECH Foundation — Social Venture Initiative for Technology Education and Community Happiness",
    logoAriaLabel: "SVITECH Foundation home",
    contactEmail: "info@svitechfoundation.org",
    contactPhone: "+91 82684 59392",
    officeAddress:
      "Room No. 4, Bhaiyalal Chawl, N.S.S. Road, Asalpha Village, Ghatkopar (West), Mumbai, Maharashtra – 400084, India",
    responseTime: "Usually within 2–3 business days",
    footerBlurb:
      "Social Venture Initiative for Technology Education and Community Happiness — connecting families to rightful entitlements through systems, partnerships and presence across Mumbai and industrial corridors.",
    copyrightNote: "ISO 9001:2015 · 12A · 80G · CSR-1 · NGO Darpan",
    newsletterBlurb: "Programme updates and impact notes—rarely, and never spam.",
    seoTitle: "SVITECH Foundation — Right Entitlements. Lasting Change.",
    seoDescription:
      "SVITECH Foundation: Mumbai Section 8 NGO. 570,000+ citizens mobilized, 42,000+ households linked to welfare, ≈ ₹1 Crore OOPE saved. ISO 9001:2015 · 12A · 80G · CSR-1 · NGO Darpan.",
  },
  theme: {
    bg: "#F4EFE6",
    bgDeep: "#12263A",
    ink: "#12263A",
    inkMuted: "#5A6B7A",
    brand: "#C65A2E",
    brandBright: "#D9784A",
    accent: "#1B6B56",
    accentSoft: "#DCECE6",
    surface: "#FBF8F2",
  },
  navigation: {
    primaryLinks: defaultNav,
    donateLabel: "DONATE NOW",
    donateHref: "/donate",
    donateShortLabel: "DONATE",
    programsMenuLinks: defaultProgramsMenu,
    stickyDonate: {
      enabled: false,
      message: "Support verified field programmes across Mumbai and industrial corridors.",
      ctaLabel: "DONATE NOW",
      ctaHref: "/donate",
    },
    showTopBar: false,
    trustBadge: "12A · 80G · CSR-1 · ISO 9001:2015 · NGO Darpan",
    showMemberLogin: false,
    memberLoginLabel: "Member login",
    memberLoginHref: "/member-login",
  },
  footer: {
    exploreHeading: "Quick Links",
    exploreLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Vision / Mission", href: "/about#vision" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Our Intervention", href: "/work" },
      { label: "Impact", href: "/impact" },
      { label: "Partners", href: "/partner" },
      { label: "Contact Us", href: "/contact" },
    ],
    takePartHeading: "Resources & More",
    takePartLinks: [
      { label: "CSR Partnership", href: "/partner" },
      { label: "Donate", href: "/donate" },
      { label: "Gallery", href: "/gallery" },
      { label: "Reports", href: "/reports" },
      { label: "Admin login", href: "/admin" },
    ],
    legalHeading: "Legal",
    legalLinks: [
      { label: "Contact", href: "/contact" },
      { label: "Governance", href: "/about#governance" },
    ],
    newsletterHeading: "Keep helping. Stay updated.",
    donateLabel: "DONATE NOW",
    donateHref: "/donate",
    tagline: "People. Entitlements. Dignity. Delivered.",
  },
  home: {
    heroEyebrow: "SVITECH Foundation",
    heroHeadline: "Right Entitlements. Lasting Change.",
    heroSubhead:
      "We mobilize citizens and connect families to their rightful entitlements—strengthening dignity, security and self-reliance through systems, partnerships and presence.",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80",
    heroImageAlt: "Community members gathered for a SVITECH outreach programme",
    heroSecondaryImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    heroSecondaryImageAlt: "Learners practising digital skills together",
    heroCtaPrimary: "Donate now",
    heroCtaPrimaryHref: "/donate",
    heroCtaSecondary: "Partner with us",
    heroCtaSecondaryHref: "/partner",
    heroTrustChecks: [
      "Section 8 · 12A · 80G · CSR-1",
      "ISO 9001:2015 certified",
      "NITI Aayog NGO Darpan",
    ],
    heroImpactBadge: "570,000+ citizens mobilized · ≈ ₹1 Cr OOPE saved",
    marqueeItems: [
      "Digital Literacy",
      "डिजिटल साक्षरता",
      "Financial Inclusion",
      "वित्तीय समावेश",
      "Women Empowerment",
      "महिला सशक्तिकरण",
      "Health & Welfare",
      "स्वास्थ्य सेवा",
      "Road Safety",
      "सड़क सुरक्षा",
      "Community Happiness",
      "सामुदायिक खुशहाली",
    ],
    wayEyebrow: "The SVITECH Way",
    wayHeadline: "Six pillars that guide every programme",
    wayIntro:
      "From digital skills to community mobilisation, our approach stays practical, ethical, and rooted in local need.",
    wayPillars: [
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
      {
        title: "Access",
        copy: "Help families navigate e-governance, welfare schemes, and essential digital services.",
      },
      {
        title: "Dignity",
        copy: "Skills and support that protect agency—so people lead change in their own lives.",
      },
    ],
    focusEyebrow: "Core programmes",
    focusHeadline: "Skills, access, and community empowerment.",
    focusIntro:
      "We break cycles of poverty with digital skills training, e-government facilitation, health and education outreach, and partnerships with schools, agencies, and CSR teams.",
    focusAreas: [
      {
        title: "Financial and Digital Inclusion",
        copy: "Flagship programme for digital banking, UPI safety, financial planning, and citizen digital service access.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
        href: "/programs/financial-digital-inclusion",
      },
      {
        title: "Health & welfare facilitation",
        copy: "Health camps and enrolment support for schemes including Ayushman Bharat (PM-JAY).",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
        href: "/programs/health-welfare-facilitation",
      },
      {
        title: "Education & women empowerment",
        copy: "School programmes, education support in underserved areas, and livelihood training for women.",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
        href: "/programs/women-empowerment",
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
    reachEyebrow: "Where we work",
    reachHeadline: "Mumbai Metropolitan Region and industrial corridors",
    reachIntro:
      "Four permanent Samriddhi Kendras across Mumbai, plus multi-state migrant workforce outreach in Maharashtra, Gujarat, Haryana, and Delhi NCR.",
    reachStates: [
      { name: "Maharashtra", note: "MMR · full programme suite" },
      { name: "Gujarat", note: "Industrial workforce corridor" },
      { name: "Haryana", note: "Industrial workforce corridor" },
      { name: "Delhi NCR", note: "Industrial workforce corridor" },
    ],
    reachCtaLabel: "Explore the impact map",
    reachCtaHref: "/impact",
    galleryEyebrow: "In the field",
    galleryHeadline: "Moments from programmes across states",
    galleryIntro:
      "A glimpse of digital labs, health camps, education outreach, and community days—filtered by theme on our full gallery.",
    galleryCtaLabel: "View full gallery",
    galleryCtaHref: "/gallery",
    ctaHeadline: "Join us in building a more self-reliant society",
    ctaCopy:
      "Volunteer, partner through CSR, or donate—help expand Financial and Digital Inclusion, health camps, and education outreach.",
    ctaButtons: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Upcoming events", href: "/events" },
    ],
    impactStatsEyebrow: "Verified cumulative impact",
    impactStatsHeadline: "Numbers from the field ledger",
    impactStats: [
      { value: "570,000+", label: "Citizens mobilized" },
      { value: "≈ ₹1 Cr", label: "OOPE saved" },
      { value: "42,000+", label: "Households linked to welfare" },
      { value: "16,100+", label: "Digital learners certified" },
    ],
    missionBandEnabled: true,
    missionEyebrow: "Mission",
    visionEyebrow: "Vision",
    programsItemCtaLabel: "Explore practice",
    donateStripEyebrow: "Give today",
    programsEyebrow: "Practice portfolios",
    programsHeadline: "People. Entitlements. Dignity. Delivered.",
    programsIntro:
      "Lok Adhikaar & Samriddhi Kendras, Svitech Shiksha Kendra, Swasthya Setu, civic leadership & Kala-Sanvad, and Mission Ankur — scalable community delivery systems.",
    programsCtaLabel: "View our work →",
    programsCtaHref: "/work",
    spotlightEyebrow: "Field systems",
    spotlightHeadline: "Permanent E-Seva touchpoints",
    spotlightViewAllLabel: "See impact dashboard →",
    spotlightViewAllHref: "/impact",
    quoteEyebrow: "Director’s perspective",
    quote: {
      text: "Lasting community development cannot be evaluated by the volume of temporary relief handed out... It can only be measured by how effectively people are connected to their rightful entitlements.",
      attribution: "Vivek Ganpat Shelar",
      role: "Founder & President, SVITECH Foundation",
    },
    donateStripHeadline: "Fund verified last-mile delivery",
    donateStripCopy:
      "Individual gifts support welfare camps, digital labs, health drives, and civic leadership—backed by geo-tagged field verification.",
    donateStripAmounts: [500, 1000, 2500, 5000],
    donateStripLabel: "Donate now",
    campaignsEyebrow: "Support a practice",
    campaignsHeadline: "Turnkey programmes ready for partnership",
    campaigns: [
      {
        title: "Lok Adhikaar · Samriddhi Kendras",
        copy: "600+ welfare campaigns and 4 permanent E-Seva hubs linking households to statutory entitlements.",
        href: "/work/samriddhi",
        cta: "Explore →",
      },
      {
        title: "Svitech Shiksha Kendra",
        copy: "16,100+ digital learners certified; Women Learning Centers with community asset handover.",
        href: "/work/techshala",
        cta: "Explore →",
      },
      {
        title: "Swasthya Setu",
        copy: "Preventive diagnostics, vision care, and menstrual hygiene awareness across MMR.",
        href: "/work/swasthya-setu",
        cta: "Explore →",
      },
      {
        title: "Lok Adhikaar · Civic & Kala-Sanvad",
        copy: "Community vigilance, PDS audits, civic victories, and 980 cultural performances.",
        href: "/work/lok-adhikar",
        cta: "Explore →",
      },
    ],
    accreditationsEyebrow: "Trust & transparency",
    accreditationsHeadline: "Statutory credentials",
    accreditations: [
      {
        name: "ISO 9001:2015",
        description: "Certified quality management system for process-driven delivery.",
      },
      {
        name: "Section 12A & 80G",
        description: "Income Tax Act registrations enabling tax-efficient giving for eligible donors.",
      },
      {
        name: "MCA CSR-1 · NGO Darpan",
        description: "Registered with MCA Form CSR-1 and NITI Aayog NGO Darpan.",
      },
      {
        name: "Secure online giving",
        description: "Donations processed through Razorpay with emailed receipts after successful payment.",
      },
    ],
    partnersEyebrow: "Corridors we serve",
    partners: [
      { name: "Maharashtra" },
      { name: "Gujarat" },
      { name: "Haryana" },
      { name: "Delhi NCR" },
    ],
  },
  about: {
    eyebrow: "About",
    headline: "Social Venture Initiative for Technology Education and Community Happiness.",
    intro:
      "SVITECH Foundation is a registered Section 8 not-for-profit organization (incorporated 2023) headquartered in Asalpha, Ghatkopar West, Mumbai. We mobilize citizens and connect families to their rightful entitlements—strengthening dignity, security and self-reliance.",
    heroImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
    heroImageAlt: "Team collaborating around a shared workspace",
    missionTitle: "Our mission",
    missionCopy:
      "To build scalable, community-rooted delivery systems that eliminate documentation poverty, provide quality education, safeguard preventive health and menstrual awareness, and foster civic participation—empowering individuals and communities to thrive with dignity, equity, and self-reliance.",
    howTitle: "Our vision",
    howCopy:
      "An inclusive, equitable, and self-reliant society where vulnerable families, unorganized workforces, and emerging youth exercise full legal, economic, and digital agency to lead lives of dignity.",
    valuesTitle: "Values we hold",
    values: [
      {
        title: "Integrity & Transparency",
        copy: "Board-led stewardship, audit-ready evidence, and accountable use of resources.",
      },
      {
        title: "Participatory Governance",
        copy: "Inclusive decision-making with communities, civic partners, and frontline leaders.",
      },
      {
        title: "Last-Mile Delivery",
        copy: "Documentation support, digital registration, and follow-up until entitlements are delivered.",
      },
      {
        title: "Local Ownership",
        copy: "Trained youth and women facilitators, SHG-run centers, and sustainable neighborhood access.",
      },
    ],
    governanceTitle: "Governance",
    governanceCopy:
      "Guided by integrity, transparency and participatory governance. Board of Directors: Vivek Ganpat Shelar (Chairman & Managing Director), Rajani G. Kulaye, Vishal Ladku Jadhav, and Pramod Yashwant Gaikwad. Registered Section 8 · 12A · 80G · CSR-1 · ISO 9001:2015 · NGO Darpan.",
    governanceLinkLabel: "View reports & board",
    programsLinkLabel: "Explore our programmes",
    governanceLinkHref: "/reports",
    programsLinkHref: "/work",
    seoTitle: "About",
    seoDescription:
      "SVITECH Foundation—Section 8 NGO in Mumbai—connects families to entitlements through Samriddhi Kendras, digital skills, health, and civic leadership. ISO 9001:2015 · 12A · 80G.",
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
    eyebrow: "Contact Us",
    headline: "Reach the foundation office.",
    intro:
      "Partnerships, donations, media, and field visit requests—write to us at the Ghatkopar West head office.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Head office",
    responseTimeLabel: "Response time",
    formNameLabel: "Name",
    formEmailLabel: "Email",
    formTopicLabel: "Topic",
    formMessageLabel: "Message",
    formSubmitLabel: "Send message",
    formSuccessMessage: "Thanks — we received your message and will reply soon.",
    formTopics: ["Partnership", "Donation", "Media", "Field visit", "Other"],
    seoTitle: "Contact",
    seoDescription:
      "Contact SVITECH Foundation in Asalpha, Ghatkopar West, Mumbai — +91 82684 59392 · info@svitechfoundation.org.",
  },
  donate: {
    eyebrow: "Donate",
    headline: "Give under 80G to verified last-mile work.",
    intro:
      "Individual gifts support welfare campaigns, digital labs, health drives, and civic leadership. SVITECH Foundation is registered under Section 12A and 80G of the Income Tax Act.",
    bullets: [
      "80G and 12A registered · MCA CSR-1 · ISO 9001:2015 · NGO Darpan",
      "Online checkout via Razorpay when payment keys are configured",
      "For bank transfer or CSR gifts, write to info@svitechfoundation.org — we do not publish unverified account details here",
    ],
    footerNote:
      "Prefer a corporate package? See the Partner page for investment tiers. For individual giving questions, email info@svitechfoundation.org or call +91 82684 59392.",
    presetAmounts: [500, 1000, 2500, 5000],
    seoTitle: "Donate",
    seoDescription:
      "Donate to SVITECH Foundation under 80G. Support verified welfare camps, digital literacy, health, and civic programmes.",
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
    itemCtaLabel: "Read more",
    bottomCtaLabel: "Partner with a programme",
    bottomCtaHref: "/get-involved",
    filtersTitle: "Programmes",
    bannerImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80",
    breadcrumbHome: "Home",
    emptyMessage: "Programmes will appear here once they are published in the admin.",
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
    eyebrow: "Activities",
    headline: "Notes from the work.",
    intro: "Activity notes, education and health stories, and how skills programmes turn into livelihoods.",
    seoTitle: "Activities",
    seoDescription: "Activity updates and field notes from SVITECH Foundation.",
  },
  impact: {
    eyebrow: "Impact",
    headline: "Outcomes you can measure.",
    intro:
      "Verified cumulative impact: 570,000+ citizens mobilized, 42,000+ households linked to welfare, approximately ₹1 Crore OOPE saved, and 4 permanent Samriddhi Kendras across Mumbai.",
    mapEyebrow: "Where we work",
    mapHeadline: "MMR Samriddhi Kendras · multi-state industrial corridors",
    storyCtaLabel: "Support work like this",
    storyCtaHref: "/donate",
    seoTitle: "Impact",
    seoDescription:
      "SVITECH Foundation impact: 570,000+ citizens, 42,000+ households, ≈ ₹1 Crore OOPE saved, 16,100+ digital learners, 980 cultural performances.",
  },
  gallery: {
    eyebrow: "Gallery",
    headline: "Field notes in photographs",
    intro:
      "Browse moments from Digital Literacy labs, women empowerment workshops, health camps, education outreach, community days, and road safety drives.",
    seoTitle: "Gallery",
    seoDescription:
      "Photo gallery from SVITECH Foundation programmes across Maharashtra and partner states.",
  },
  reports: {
    eyebrow: "Transparency",
    headline: "Reports, board, and how we steward gifts.",
    intro:
      "Section 8 governance, 12A & 80G status, Board of Directors, and annual reports—findable in two clicks.",
    boardTitle: "Board of Directors",
    annualReportsTitle: "Annual reports",
    downloadLabel: "Download PDF",
    adminNote:
      "Replace placeholder PDFs in public/reports/ with filed annual reports. Keep 80G / 12A certificates available here when sharing with donors.",
    contactPrompt: "Questions about finances or partnerships?",
    contactLinkLabel: "Contact us",
    emailAutomation: {
      sendActivityMailAtProjectStart: true,
      sendActivityMailLater: false,
      sendStatusMail: false,
      reportFormats: {
        pdf: true,
        csv: false,
        xlsx: false,
      },
    },
    seoTitle: "Reports & governance",
    seoDescription:
      "Annual reports, Board of Directors, and transparency notes from SVITECH Foundation (Section 8 · 12A · 80G · ISO 9001:2015).",
  },
  detailPages: {
    programsBack: "← All programmes",
    programsPartnerCta: "Partner with this programme",
    programsVolunteerCta: "Volunteer",
    eventsBack: "← All events",
    eventsClosedNote: "Registration is closed.",
    newsBack: "← All news",
  },
  popup: {
    enabled: false,
    title: "Support community programmes today",
    body: "Your gift funds digital skills, health camps, and welfare access for underserved families across Maharashtra.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Donate now",
    ctaHref: "/donate",
    dismissLabel: "Maybe later",
    frequency: "session",
  },
  cache: {
    mode: "live",
    revalidateSeconds: 60,
    forceLiveChrome: true,
  },
  maintenance: {
    enabled: false,
    title: "We’ll be right back",
    message:
      "SVITECH Foundation’s website is undergoing brief maintenance. Thank you for your patience — please check again shortly.",
    note: "",
    showContact: true,
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
