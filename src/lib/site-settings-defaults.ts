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
  { label: "Our Work", href: "/work" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
  { label: "Partner", href: "/partner" },
  { label: "Contact", href: "/contact" },
];

const defaultProgramsMenu: NavLink[] = [
  { label: "All practices", href: "/work" },
  { label: "Samriddhi", href: "/work/samriddhi" },
  { label: "TechShala", href: "/work/techshala" },
  { label: "Swasthya-Setu", href: "/work/swasthya-setu" },
  { label: "Lok-Adhikar", href: "/work/lok-adhikar" },
  { label: "Urja-Prayas", href: "/work/urja-prayas" },
];

export const defaultSiteSettings: SiteSettings = {
  general: {
    siteName: "SVITECH Foundation",
    tagline: "Technology · Education · Community Happiness",
    logoUrl: "/svitech-logo.png",
    logoAlt: "SVITECH Foundation — Education, Technology, Community",
    logoAriaLabel: "SVITECH Foundation home",
    contactEmail: "info@svitech.in",
    contactPhone: "+91 82684 59392",
    officeAddress:
      "4, Bhaiyalal Chawl, N.S.S. Road, Asalpha Village, Ghatkopar (West), Mumbai, Maharashtra – 400084, India",
    responseTime: "Usually within 2–3 business days",
    footerBlurb:
      "Process-driven non-profit implementation agency translating CSR and government programmes into verified community progress across MMR and industrial corridors.",
    copyrightNote: "ISO 9001:2015 · 12A · 80G · CSR-1",
    newsletterBlurb: "Programme updates and impact notes—rarely, and never spam.",
    seoTitle: "SVITECH Foundation — Verified Grassroots Implementation",
    seoDescription:
      "SVITECH Foundation: Mumbai-based nodal implementation agency. 570,000+ citizens mobilized, ₹667+ crores in entitlements unlocked. 12A, 80G, CSR-1, ISO 9001:2015.",
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
    donateLabel: "Donate",
    donateHref: "/donate",
    donateShortLabel: "Give",
    programsMenuLinks: defaultProgramsMenu,
    stickyDonate: {
      enabled: false,
      message: "Support verified field programmes across Mumbai and industrial corridors.",
      ctaLabel: "Donate now",
      ctaHref: "/donate",
    },
    showTopBar: false,
    trustBadge: "12A · 80G · CSR-1 · ISO 9001:2015",
    showMemberLogin: false,
    memberLoginLabel: "Member login",
    memberLoginHref: "/member-login",
  },
  footer: {
    exploreHeading: "Our work",
    exploreLinks: [
      { label: "Our Work", href: "/work" },
      { label: "Impact", href: "/impact" },
      { label: "About", href: "/about" },
      { label: "Partner", href: "/partner" },
    ],
    takePartHeading: "Take part",
    takePartLinks: [
      { label: "Partner with us", href: "/partner" },
      { label: "Donate", href: "/donate" },
      { label: "Contact", href: "/contact" },
    ],
    legalHeading: "Legal",
    legalLinks: [
      { label: "Contact", href: "/contact" },
      { label: "About governance", href: "/about" },
    ],
    newsletterHeading: "Newsletter",
    donateLabel: "Donate",
    donateHref: "/donate",
    tagline: "Verified grassroots implementation",
  },
  home: {
    heroEyebrow: "SVITECH Foundation",
    heroHeadline: "Institutionalize self-reliance at the last mile.",
    heroSubhead:
      "A process-driven implementation agency connecting vulnerable families to public entitlements, digital skills, preventive health, and civic voice across Mumbai and industrial corridors.",
    heroImage: "",
    heroImageAlt: "",
    heroSecondaryImage: "",
    heroSecondaryImageAlt: "",
    heroCtaPrimary: "Partner with us",
    heroCtaPrimaryHref: "/partner",
    heroCtaSecondary: "Donate",
    heroCtaSecondaryHref: "/donate",
    heroTrustChecks: [
      "12A · 80G · CSR-1",
      "ISO 9001:2015 certified",
      "Geo-tagged field verification",
    ],
    heroImpactBadge: "570,000+ citizens mobilized",
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
    reachHeadline: "Five-state reach with Maharashtra at the centre",
    reachIntro:
      "Maharashtra hosts the full activity suite. Pune adds dedicated Digital Literacy. Delhi, Gujarat, Haryana, and Uttar Pradesh focus on Financial Inclusion projects.",
    reachStates: [
      { name: "Maharashtra", note: "Full programme suite" },
      { name: "Delhi", note: "Financial Inclusion" },
      { name: "Gujarat", note: "Financial Inclusion" },
      { name: "Haryana", note: "Financial Inclusion" },
      { name: "Uttar Pradesh", note: "Financial Inclusion" },
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
      { value: "₹667+", label: "Crores in entitlements unlocked" },
      { value: "42,000+", label: "Households linked to welfare" },
      { value: "16,100+", label: "Learners digitally certified" },
    ],
    missionBandEnabled: true,
    missionEyebrow: "Mission",
    visionEyebrow: "Vision",
    programsItemCtaLabel: "Explore practice",
    donateStripEyebrow: "Give today",
    programsEyebrow: "Practice portfolios",
    programsHeadline: "Five practices. One last-mile system.",
    programsIntro:
      "Samriddhi, TechShala, Swasthya-Setu, Lok-Adhikar, and Urja-Prayas turn CSR and government programmes into audited community progress.",
    programsCtaLabel: "View our work →",
    programsCtaHref: "/work",
    spotlightEyebrow: "Field systems",
    spotlightHeadline: "Permanent E-Seva touchpoints",
    spotlightViewAllLabel: "See impact dashboard →",
    spotlightViewAllHref: "/impact",
    quoteEyebrow: "Director’s perspective",
    quote: {
      text: "When corporate investments are paired with verifiable field systems, grassroots transformation becomes permanent.",
      attribution: "Vivek Ganpat Shelar",
      role: "Director, SVITECH Foundation",
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
        title: "Project Samriddhi",
        copy: "Financial inclusion camps and E-Seva desks linking households to statutory welfare.",
        href: "/work/samriddhi",
        cta: "Explore →",
      },
      {
        title: "Project TechShala",
        copy: "Accredited digital labs and Women Learning Centers with community asset handover.",
        href: "/work/techshala",
        cta: "Explore →",
      },
      {
        title: "Project Swasthya-Setu",
        copy: "Preventive diagnostics, menstrual dignity kits, and emergency medical enablement.",
        href: "/work/swasthya-setu",
        cta: "Explore →",
      },
      {
        title: "Project Lok-Adhikar",
        copy: "Community vigilance, PDS audits, and civic infrastructure resolutions.",
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
    governanceLinkHref: "/reports",
    programsLinkHref: "/programs",
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
      "Contact SVITECH Foundation in Asalpha, Ghatkopar West, Mumbai — +91 82684 59392 · info@svitech.in.",
  },
  donate: {
    eyebrow: "Donate",
    headline: "Give under 80G to verified last-mile work.",
    intro:
      "Individual gifts support welfare camps, digital labs, health drives, and civic leadership. SVITECH Foundation is registered under Section 12A and 80G of the Income Tax Act.",
    bullets: [
      "80G and 12A registered · MCA CSR-1 · ISO 9001:2015",
      "Online checkout via Razorpay when payment keys are configured",
      "For bank transfer or CSR gifts, write to info@svitech.in — we do not publish unverified account details here",
    ],
    footerNote:
      "Prefer a corporate package? See the Partner page for Schedule VII investment tiers. For individual giving questions, email info@svitech.in or call +91 82684 59392.",
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
      "Maharashtra hosts the full activity suite. Pune adds dedicated Digital Literacy. Delhi, Gujarat, Haryana, and Uttar Pradesh focus on the Financial Inclusion project.",
    mapEyebrow: "Where we work",
    mapHeadline: "Maharashtra full suite · Financial Inclusion elsewhere",
    storyCtaLabel: "Support work like this",
    storyCtaHref: "/donate",
    seoTitle: "Impact",
    seoDescription:
      "SVITECH Foundation: all activities in Maharashtra, Digital Literacy in Pune, and Financial Inclusion projects in Delhi, Gujarat, Haryana, and Uttar Pradesh.",
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
      "Section 8 governance, 80G & 12AA status, leadership bios, and annual reports—findable in two clicks.",
    boardTitle: "Leadership",
    annualReportsTitle: "Annual reports",
    downloadLabel: "Download PDF",
    adminNote:
      "Replace placeholder PDFs in public/reports/ with filed annual reports. Keep 80G / 12AA certificates available here when sharing with donors.",
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
