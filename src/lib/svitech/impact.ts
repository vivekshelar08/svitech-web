/** Multi-year impact dashboard from SVITECH Foundation profile. */

export const headlineMetrics = [
  {
    value: "570,000+",
    label: "Citizens mobilized",
    note: "Awareness drives, campaigns, and community meetings",
  },
  {
    value: "₹667+",
    label: "Crores in entitlements unlocked",
    note: "Health coverage, insurance, and direct cash benefits",
  },
  {
    value: "42,000+",
    label: "Households linked to welfare",
    note: "89,000+ individuals with verified scheme cards",
  },
  {
    value: "16,100+",
    label: "Learners digitally certified",
    note: "CSC Academy, DLC courses, and Women Learning Centers",
  },
] as const;

export const masterDashboard = [
  {
    dimension: "Total Citizen Mobilization",
    output: "570,000+ Individuals",
    detail: "Reached through awareness drives, campaigns, and community meetings",
  },
  {
    dimension: "Public Entitlement Value Unlocked",
    output: "₹667+ Crores",
    detail: "Statutory health coverage, insurance policies, and direct cash benefits",
  },
  {
    dimension: "Direct Welfare Scheme Linkages",
    output: "42,000+ Households",
    detail: "89,000+ individuals issued verified cards (PMJAY, ABHA, E-Shram, Ladki Bahin)",
  },
  {
    dimension: "Welfare & Financial Inclusion Camps",
    output: "445+ Field Camps",
    detail: "Multi-desk camps across 30+ slum clusters in Mumbai & industrial corridors",
  },
  {
    dimension: "Women-Led Street Plays (Nukkad Nataks)",
    output: "187 Performances",
    detail: "Community performances on food security, voting rights, and cyber safety",
  },
  {
    dimension: "Public Infrastructure & Civic Resolutions",
    output: "40+ Major Victories",
    detail: "Restored roadways, streetlights, waste clearance, upgraded Anganwadis",
  },
  {
    dimension: "Community Vigilance Groups (CVGs)",
    output: "50 Active Groups",
    detail: "250 trained grassroots monitors overseeing public distribution services",
  },
  {
    dimension: "Food Security & Ration Shop Audits",
    output: "40+ PDS Centers",
    detail: "Compliance and grain distribution audits across Mumbai suburbs",
  },
  {
    dimension: "Digital & Technical Certifications",
    output: "16,100+ Students",
    detail: "Certified across CSC Academy, DLC courses, and Women Learning Centers",
  },
  {
    dimension: "Preventive Health & Diagnostics",
    output: "7,100+ Individuals",
    detail: "Sensitized on HIV/AIDS, tobacco risks, and multi-specialty screenings",
  },
  {
    dimension: "STEM Energy Champions Trained",
    output: "2,400+ Students",
    detail: "Trained across 20 partner schools; 1 National Quiz Winner",
  },
  {
    dimension: "Pedestrian Road Safety Toolkits",
    output: "1,650 Toolkits",
    detail: "Interactive kits distributed in partnership with Traffic Police",
  },
  {
    dimension: "Permanent E-Seva Touchpoints",
    output: "4 Dedicated Centers",
    detail: "Walk-in centers in Asalpha, Backbay, Vashinaka, and Vishnu Nagar",
  },
] as const;

export const yearOnYear = {
  columns: [
    "FY 2023–24 (Inception & Scale)",
    "FY 2024–25 (Consolidation & Expansion)",
    "FY 2025–26 (Pan-MMR & Inter-State)",
    "Cumulative Footprint",
  ],
  rows: [
    {
      indicator: "Total Citizen Outreach",
      values: ["241,243 citizens", "152,538 citizens", "164,350 citizens", "570,000+ Citizens"],
    },
    {
      indicator: "Financial Inclusion Camps",
      values: ["112+ camps", "150 camps", "183 camps", "445+ Field Camps"],
    },
    {
      indicator: "Direct Scheme Linkages",
      values: ["12,000+ families", "11,200 individuals", "18,742 individuals", "42,000+ Households"],
    },
    {
      indicator: "Public Resources Mobilized",
      values: ["₹600+ Crores", "₹62.8+ Crores", "₹5.12+ Crores", "₹667+ Crores"],
    },
    {
      indicator: "Street Plays (Nukkad Natak)",
      values: ["100 performances", "70 performances", "17 performances", "187 Performances"],
    },
    {
      indicator: "Civic Infrastructure Wins",
      values: ["8 resolutions", "27 resolutions", "7 resolutions", "40+ Major Victories"],
    },
    {
      indicator: "Digital Learners Certified",
      values: ["1,025 students", "778 learners", "2,447 learners", "16,100+ Learners"],
    },
    {
      indicator: "Geographic Footprint",
      values: [
        "Chembur & Ghatkopar",
        "Asalpha, Backbay, Vishnu Nagar",
        "Pan-MMR, Gujarat, Delhi, Haryana",
        "4 States / Multi-Corridor",
      ],
    },
  ],
} as const;

export const eSevaCenters = [
  {
    name: "Asalpha Kendra",
    catchment: "Ghatkopar West, Mumbai Suburban",
    needs: "Central suburban chawl settlements, transit workers, domestic labor",
    status: "Operational Full-Time",
  },
  {
    name: "Backbay Center",
    catchment: "South Mumbai Coastal Belt",
    needs: "Informal coastal communities, port laborers, and migrant families",
    status: "Operational Full-Time",
  },
  {
    name: "Vashinaka Hub",
    catchment: "Chembur, M-Ward Slum Belt",
    needs: "High-density resettlement colonies and industrial contract workers",
    status: "Operational Full-Time",
  },
  {
    name: "Vishnu Nagar Kendra",
    catchment: "Chembur Central Slum Cluster",
    needs: "Dense informal settlements, food rights, senior citizen welfare",
    status: "Operational Full-Time",
  },
] as const;

export const eSevaInfrastructure = [
  {
    title: "Workstations & processing hardware",
    copy: "Dual-screen desktops (Intel Core i5, 16GB RAM, SSD), heavy-duty laser printers, and flatbed document scanners.",
  },
  {
    title: "Biometric authentication",
    copy: "STQC-certified fingerprint scanners and biometric iris devices for secure portal-based e-KYC submissions.",
  },
  {
    title: "Network & power resilience",
    copy: "Dedicated commercial fiber-optic broadband supported by UPS units for consistent portal connectivity.",
  },
  {
    title: "Trained community operators",
    copy: "Managed by certified local youth and women facilitators skilled in regional-language portals and first-time users.",
  },
] as const;

export const eSevaServices = {
  identity: [
    "PAN Card generation & linking",
    "Demographic record updates",
    "Income, domicile & caste certificates",
    "Voter ID updates and corrections",
    "Gazette name-change documentation",
  ],
  financial: [
    "Jan Dhan basic savings accounts",
    "Direct Benefit Transfer (DBT) linking",
    "Micro-deposits, withdrawals, and remittances",
    "Atal Pension Yojana (APY) registration",
    "PMSBY accident insurance policies",
  ],
  utilities: [
    "Mera Ration app setup and tracking",
    "DigiLocker digital document setup",
    "Online electricity, water & gas bill payments",
    "Udyam MSME enterprise registration",
    "Senior citizen welfare registration",
  ],
} as const;

export const economicProtection = [
  {
    value: "₹667+ Cr",
    label: "Public entitlements unlocked",
    detail:
      "Cashless hospitalization coverage, life-accident insurance, and direct financial transfers secured for vulnerable families.",
  },
  {
    value: "₹18.14 L",
    label: "Out-of-pocket savings",
    detail:
      "Families avoided excessive fees charged by unauthorized commercial agents by using transparent E-Seva desks.",
  },
  {
    value: "₹3.61 L",
    label: "SHG desk income",
    detail:
      "Community self-help groups managing local documentation desks generated supplemental administrative income.",
  },
] as const;
