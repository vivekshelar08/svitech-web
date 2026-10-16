/** Multi-year impact dashboard from SVITECH Foundation Institutional Capability Docket (2025). */

export const headlineMetrics = [
  {
    value: "570,000+",
    label: "Citizens mobilized",
    note: "Awareness drives, campaigns, and community meetings",
  },
  {
    value: "≈ ₹1 Cr",
    label: "OOPE saved",
    note: "Out-of-pocket expenditure saved for vulnerable families",
  },
  {
    value: "42,000+",
    label: "Households linked to welfare",
    note: "89,000+ individuals with verified scheme linkages",
  },
  {
    value: "16,100+",
    label: "Digital learners certified",
    note: "CSC Academy / PMGDISHA-aligned labs and Women Learning Centers",
  },
] as const;

export const masterDashboard = [
  {
    dimension: "Total Citizen Mobilization",
    output: "570,000+ Individuals",
    detail: "Reached through awareness drives, campaigns, and community meetings",
  },
  {
    dimension: "Out-of-Pocket Expenditure Saved",
    output: "Approximately ₹1 Crore",
    detail: "Families avoided unauthorized commercial agent fees and related OOPE",
  },
  {
    dimension: "Public Resource Multiplier",
    output: "₹1 → ₹15 to ₹25+",
    detail: "Every rupee invested unlocks approximately ₹15–₹25+ in direct statutory public welfare value",
  },
  {
    dimension: "Direct Welfare Scheme Linkages",
    output: "42,000+ Households",
    detail: "89,000+ individuals linked across PMJAY/ABHA, E-Shram, PMSBY, Ladki Bahin, PDS and more",
  },
  {
    dimension: "Field Welfare Campaigns",
    output: "600+ Field Campaigns",
    detail: "Multi-desk camps across 30+ settlements in Mumbai and industrial corridors",
  },
  {
    dimension: "Cultural Performances (Kala-Sanvad)",
    output: "980 Performances",
    detail: "Street plays, music, puppetry and storytelling mobilizing 230,000+ citizens",
  },
  {
    dimension: "Grassroots Artists Trained",
    output: "230 Performers",
    detail: "Women from SHGs, first-generation college students, out-of-school youth, Anganwadi workers",
  },
  {
    dimension: "Public Infrastructure & Civic Resolutions",
    output: "40+ Major Victories",
    detail: "Restored roadways, streetlights, waste clearance, water pipelines, upgraded Anganwadis",
  },
  {
    dimension: "Community Vigilance Groups (CVGs)",
    output: "50 Active Groups",
    detail: "250 trained grassroots monitors overseeing public distribution services across 24 slum settlements",
  },
  {
    dimension: "Food Security & Ration Shop Audits",
    output: "40+ PDS Centers",
    detail: "Compliance audits securing full food-grain entitlements for 12,500+ families",
  },
  {
    dimension: "Digital & Technical Certifications",
    output: "16,100+ Students",
    detail: "Certified across CSC Academy / PMGDISHA-aligned courses and Women Learning Centers",
  },
  {
    dimension: "Self-Defense Training",
    output: "2,000+ Students",
    detail: "Situational awareness, verbal assertiveness, basic physical defense, and legal helplines",
  },
  {
    dimension: "Menstrual Hygiene Education",
    output: "4,200+ Women & Girls",
    detail: "35+ structured school and community workshops",
  },
  {
    dimension: "Preventive Health Sensitization",
    output: "7,100+ Citizens",
    detail: "HIV/AIDS, anti-tobacco, and multi-specialty screening outreach",
  },
  {
    dimension: "Green School Students (Mission Ankur)",
    output: "2,400+ Students",
    detail: "Across 20 partner schools; 60 practical workshops; 5 annual science fairs",
  },
  {
    dimension: "Pedestrian Road Safety Toolkits",
    output: "1,650 Toolkits",
    detail: "DIY kits distributed in partnership with Traffic Police",
  },
  {
    dimension: "Permanent Samriddhi Kendras",
    output: "4 Dedicated Centers",
    detail: "Walk-in E-Seva hubs in Asalpha, Kandivali, Vashinaka, and Vishnu Nagar",
  },
] as const;

export const yearOnYear = {
  columns: [
    "FY 2023–24",
    "FY 2024–25",
    "FY 2025–26",
    "Cumulative Footprint",
  ],
  rows: [
    {
      indicator: "Total Citizen Outreach",
      values: ["1,72,000+", "2,05,000+", "1,93,000+", "570,000+ Citizens"],
    },
    {
      indicator: "Cultural Performances (Street Plays)",
      values: ["320+", "300+", "360+", "980 Performances"],
    },
    {
      indicator: "Digital Learners Certified",
      values: ["4,300+", "5,700+", "6,100+", "16,100+ Learners"],
    },
    {
      indicator: "OOPE Saved (Approximate)",
      values: ["₹30 Lakhs+", "₹40 Lakhs+", "₹30 Lakhs+", "≈ ₹1 Crore"],
    },
    {
      indicator: "Field Welfare Campaigns",
      values: ["180+", "240+", "180+", "600+ Campaigns"],
    },
    {
      indicator: "Households Linked to Welfare",
      values: ["—", "—", "—", "42,000+ Households"],
    },
    {
      indicator: "Individuals Linked to Welfare",
      values: ["—", "—", "—", "89,000+ Individuals"],
    },
    {
      indicator: "Geographic Footprint",
      values: [
        "Chembur & Ghatkopar",
        "Asalpha, Kandivali, Vishnu Nagar",
        "Pan-MMR, Gujarat, Delhi NCR, Haryana",
        "4 States / Multi-Corridor",
      ],
    },
  ],
} as const;

export const eSevaCenters = [
  {
    name: "Asalpha Kendra",
    catchment: "Ghatkopar West — Asalpha & surrounding low-income settlements",
    needs: "Full-time walk-in E-Seva · Open 6 days a week",
    status: "Operational Full-Time",
  },
  {
    name: "Kandivali Kendra",
    catchment: "Western Suburbs slum belt communities",
    needs: "Full-time walk-in E-Seva · Open 6 days a week",
    status: "Operational Full-Time",
  },
  {
    name: "Vashinaka Hub",
    catchment: "Chembur M-Ward slum belt communities",
    needs: "Full-time walk-in E-Seva · Open 6 days a week",
    status: "Operational Full-Time",
  },
  {
    name: "Vishnu Nagar Kendra",
    catchment: "Chembur Central slum cluster communities",
    needs: "Full-time walk-in E-Seva · Open 6 days a week",
    status: "Operational Full-Time",
  },
] as const;

export const eSevaInfrastructure = [
  {
    title: "Dual-screen workstations",
    copy: "Dual-screen desktops with laser printers and document scanners for walk-in citizen assistance.",
  },
  {
    title: "STQC biometric & iris recognition",
    copy: "STQC-certified fingerprint scanners and iris recognition devices for secure portal-based authentication.",
  },
  {
    title: "Network & power resilience",
    copy: "Broadband connectivity supported by UPS backup for consistent portal connectivity.",
  },
  {
    title: "Trained local facilitators",
    copy: "Managed by trained local youth and women facilitators skilled in regional-language portals and first-time users.",
  },
] as const;

export const eSevaServices = {
  identity: [
    "Aadhaar enrollment & updates",
    "PAN card services",
    "Voter ID registration",
    "Address & domicile certificates",
    "Income & caste certificates",
  ],
  financial: [
    "Bank account opening",
    "PMJJBY / PMSBY enrollment",
    "Pension & PF services",
    "Micro-insurance support",
    "DBT enablement",
  ],
  utilities: [
    "Ration card services",
    "Health scheme enrollment",
    "Electricity & water connections",
    "Property tax assistance",
    "Online grievance redressal",
  ],
} as const;

export const economicProtection = [
  {
    value: "≈ ₹1 Cr",
    label: "OOPE saved",
    detail:
      "Approximate out-of-pocket expenditure saved for vulnerable households through transparent facilitation.",
  },
  {
    value: "₹18.14 L",
    label: "Direct cost savings at E-Seva desks",
    detail:
      "Families avoided excessive fees charged by unauthorized commercial agents at E-Seva desks.",
  },
  {
    value: "₹3.61 L",
    label: "Women-led collective income",
    detail:
      "Legitimate administrative income earned by women-led collectives managing local documentation desks.",
  },
] as const;
