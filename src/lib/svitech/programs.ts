/** Five practice portfolios from SVITECH Foundation profile. */

export type ProgramMetric = { value: string; label: string };
export type ProgramSection = {
  title: string;
  copy?: string;
  bullets?: string[];
  rows?: { label: string; value: string; detail?: string }[];
};

export type PracticeProgram = {
  slug: string;
  name: string;
  shortName: string;
  focus: string;
  highlight: string;
  problem: string;
  model: string;
  metrics: ProgramMetric[];
  sections: ProgramSection[];
};

export const programs: PracticeProgram[] = [
  {
    slug: "samriddhi",
    name: "Project Samriddhi",
    shortName: "Samriddhi",
    focus: "Financial Inclusion, Social Security & Workforce Welfare",
    highlight:
      "445+ welfare camps; 4 permanent E-Seva Kendras; multi-state contractor labor outreach.",
    problem:
      "Eligible households remain outside the safety net because of documentation gaps, digital administrative barriers, and information asymmetry around eligibility, timelines, and DBT verification.",
    model:
      "Neighborhood welfare enrollment camps, door-to-door enumeration, and integrated administrative coordination bring public services into settlements—from identification and verification through biometric registration and benefit confirmation.",
    metrics: [
      { value: "445+", label: "Field welfare camps" },
      { value: "42,000+", label: "Households linked" },
      { value: "₹667+", label: "Crores unlocked" },
      { value: "4", label: "E-Seva Kendras" },
    ],
    sections: [
      {
        title: "Service delivery pipeline",
        bullets: [
          "Step 1 — Identification: door-to-door surveys find eligible households and document gaps",
          "Step 2 — Verification: cross-referencing identity proofs and organizing records",
          "Step 3 — Registration: biometric e-KYC via official state and central portals",
          "Step 4 — Confirmation: delivering verified cards and tracking DBT",
        ],
      },
      {
        title: "Scheme linkage portfolio",
        rows: [
          {
            label: "Ayushman Bharat (PMJAY)",
            value: "18,314 families & individuals",
            detail: "Up to ₹5 lakh cashless hospitalization coverage per household",
          },
          {
            label: "ABHA Digital Health Accounts",
            value: "6,460 individuals",
            detail: "Longitudinal medical history across empaneled hospitals",
          },
          {
            label: "Mazi Ladki Bahin Yojana",
            value: "3,071 women & girls",
            detail: "Direct monthly transfers for nutrition, education, and self-reliance",
          },
          {
            label: "Maharashtra Labour Welfare Board",
            value: "4,590 construction workers",
            detail: "Cash assistance, education stipends, and family welfare allowances",
          },
          {
            label: "E-Shram National Database",
            value: "2,900 laborers",
            detail: "UAN, accidental death cover, and social security integration",
          },
          {
            label: "PMSBY Accident Insurance",
            value: "1,844 beneficiaries",
            detail: "₹2 lakh accidental death and disability coverage",
          },
          {
            label: "PAN Cards Issued",
            value: "1,200+ citizens",
            detail: "Foundational tax ID enabling bank accounts and verified transactions",
          },
          {
            label: "Civil Certifications",
            value: "380+ households",
            detail: "Income and domicile certificates for education and subsidies",
          },
          {
            label: "Udyam MSME Formalization",
            value: "108 women entrepreneurs",
            detail: "Access to formal credit and government grants",
          },
        ],
      },
      {
        title: "Multi-state migrant labor corridors",
        copy: "UAN and E-Shram integration, zero-balance Jan Dhan accounts, PMSBY enrollment, and One Nation One Ration Card guidance across Maharashtra, Gujarat, Delhi NCR, and Haryana industrial belts—supporting SEBI BRSR Principles 3 and 5 for corporate partners.",
      },
    ],
  },
  {
    slug: "techshala",
    name: "Project TechShala",
    shortName: "TechShala",
    focus: "Digital Competency, Future Skills & Employability",
    highlight:
      "16,100+ learners certified; 78% female enrollment; CSC Academy & PMGDISHA labs.",
    problem:
      "First-generation learners in low-income settlements face a digital divide: no computers at home and limited structured technical instruction in vernacular-medium schools.",
    model:
      "Neighborhood-based, accredited digital training labs deliver foundational DLC courses and advanced 60-hour workplace computing tracks, with community asset handover to women’s SHGs.",
    metrics: [
      { value: "16,100+", label: "Learners certified" },
      { value: "78%", label: "Female enrollment" },
      { value: "40%", label: "Progress to advanced track" },
      { value: "2,290", label: "Women Learning Center reach" },
    ],
    sections: [
      {
        title: "Foundational curriculum (Tier 1: DLC)",
        bullets: [
          "Computer hardware & systems — OS navigation and typing independence",
          "Digital communications & web — email, search, and information retrieval",
          "E-governance tools — DigiLocker, UMANG, Mera Ration, certificate verification",
          "Cyber safety & digital ethics — phishing recognition and safe mobile internet",
          "Outcome: CSC Academy Certificate of Completion after a 20-hour practical course",
        ],
      },
      {
        title: "Advanced workplace computing (Tier 2)",
        bullets: [
          "Microsoft Word — business letters, tabulated reporting, formal formatting",
          "Advanced Excel — formulas, filters, VLOOKUP, pivot tables, financial logs",
          "PowerPoint — structured layouts, charts, and presentation skills",
          "Digital workflows — cloud collaboration, PDF editing, scanning, backups",
        ],
      },
      {
        title: "Women Learning Centers & workplace English",
        copy: "Centers in Ghatkopar, Backbay, and Kandivali reached 2,290 beneficiaries—adolescent girls, SHG women, and community residents—with applied mobile literacy and Likho-Padho-Bolo English modules for job readiness.",
        rows: [
          { label: "Adolescent girls & out-of-school youth", value: "980 (42.8%)" },
          { label: "Self-help group women", value: "680 (29.7%)" },
          { label: "Community residents", value: "408 (17.8%)" },
          { label: "Specialized workshop attendees", value: "222 (9.7%)" },
        ],
      },
      {
        title: "Asset stewardship — the Vashinaka model",
        copy: "Competitive vendor procurement, supervised incubation of training batches, then formal handover of 10 Dell desktop setups, networking, and air-conditioning to Adhikaar Mahila Bachat Gat under signed deeds—so local women manage operations and session fees sustain utilities.",
      },
    ],
  },
  {
    slug: "swasthya-setu",
    name: "Project Swasthya-Setu",
    shortName: "Swasthya-Setu",
    focus: "Preventive Healthcare, Hygiene & Diagnostics",
    highlight:
      "Multi-specialty diagnostic drives; 18,000+ sanitary kits; Type B emergency ambulance outfitting.",
    problem:
      "Families in informal settlements delay routine care because of daily wage demands and private clinic costs, so treatable conditions escalate into emergencies.",
    model:
      "Mobile diagnostic clinics and health education enter community halls and worker colonies; menstrual dignity drives and emergency medical outfitting close the last-mile gap.",
    metrics: [
      { value: "5,800+", label: "Diagnostic evaluations" },
      { value: "7,100+", label: "Health sensitized" },
      { value: "18,000+", label: "Sanitary kits distributed" },
      { value: "4,200+", label: "Women & girls reached on MHM" },
    ],
    sections: [
      {
        title: "Community screening camps",
        bullets: [
          "Hypertension screening for adults and senior citizens",
          "Blood glucose testing for unorganized laborers",
          "Hemoglobin assessments for adolescent girls and expectant mothers",
          "Refractive eye examinations with free corrective glasses",
          "General physician checkups and generic medicine distribution",
        ],
      },
      {
        title: "Institutional health awareness",
        rows: [
          {
            label: "HIV/AIDS & STD awareness",
            value: "4,382 participants",
            detail: "50+ sessions across colleges, ITIs, police trainees, and youth",
          },
          {
            label: "Anti-tobacco education",
            value: "2,780 participants",
            detail: "22 sessions for labourers, youth, and secondary students",
          },
        ],
      },
      {
        title: "Menstrual health & dignity",
        bullets: [
          "4,200+ women and girls sensitized on hygiene and infection prevention",
          "18,000+ dermatologically tested sanitary napkin packs distributed",
          "35+ school and community drives to reduce stigma and absenteeism",
        ],
      },
      {
        title: "Type B ambulance outfitting",
        copy: "Transparent L1/L2/L3 procurement delivered multipara monitors, medical suction, 10L oxygen systems, and trauma kits for emergency response serving informal settlements and industrial corridors.",
      },
    ],
  },
  {
    slug: "lok-adhikar",
    name: "Project Lok-Adhikar",
    shortName: "Lok-Adhikar",
    focus: "Grassroots Civic Leadership & Public Infrastructure",
    highlight:
      "50 Community Vigilance Groups; 40+ civic wins; 40+ ration shop audits; Anganwadi upgrades.",
    problem:
      "Vulnerable communities often lack organized platforms to communicate service breakdowns and infrastructure deficits to local administrative bodies.",
    model:
      "Community Vigilance Groups, Adhikaar Mitras, and ABHA Sakhis create constructive channels with civic bodies—auditing PDS shops, petitioning BMC, and modernizing Anganwadis.",
    metrics: [
      { value: "50", label: "Community Vigilance Groups" },
      { value: "40+", label: "Civic infrastructure wins" },
      { value: "40+", label: "PDS ration shop audits" },
      { value: "12,500+", label: "Families with food entitlements secured" },
    ],
    sections: [
      {
        title: "Grassroots leadership architecture",
        rows: [
          {
            label: "50 Community Vigilance Groups",
            value: "250 active members",
            detail: "Audits of fair-price shops, sanitation, and public utilities",
          },
          {
            label: "100+ Certified Adhikaar Mitras",
            value: "Urban chawls & rehab colonies",
            detail: "Grievance submissions, paperwork, and institutional follow-ups",
          },
          {
            label: "100 Certified ABHA Sakhis",
            value: "Eastern Mumbai clusters",
            detail: "Health cards, maternal schemes, digital welfare guidance",
          },
        ],
      },
      {
        title: "Major civic infrastructure resolutions",
        bullets: [
          "Arterial roadway & pothole reconstruction — Sakinaka & Pereira Wadi (20,000+ daily commuters)",
          "Pedestrian footpath reconstruction — Sahyadri Nagar & KGN Nagar (1,500+ households)",
          "18+ solar and electric streetlights — KGN Nagar, Bhim Nagar, Asalpha, Ashok Nagar",
          "Solid waste remediation — Mukund Nagar & Bharat Nagar (1,700+ families)",
          "Sanitation plant reactivation — KGN Nagar (2,500 households)",
          "Drinking water main pipeline repairs — Vishnu Nagar chawl settlement",
        ],
      },
      {
        title: "Anganwadi modernization & BALA art",
        copy: "At Prabuddha Nagar SRA, SVITECH secured ICDS formalization (January 2026), installed electrical and water infrastructure, child-safe furniture, educational materials, and Building as Learning Aid murals—then handed the facility to the Anganwadi Sevika under signed inventory.",
      },
    ],
  },
  {
    slug: "urja-prayas",
    name: "Project Urja-Prayas",
    shortName: "Urja-Prayas",
    focus: "Environmental Sustainability, STEM & Road Safety",
    highlight:
      "2,400 students across 20 schools; National Urja Quiz winner; 1,650 DIY road safety kits.",
    problem:
      "Primary and secondary students need applied STEM, energy literacy, and early pedestrian safety habits—especially in dense urban corridors.",
    model:
      "School co-curricular modules, student conservation clubs, science fairs, traffic-police toolkit drives, plus affirmative inclusion through adaptive adventure, youth sports, and police digital enablement.",
    metrics: [
      { value: "2,400+", label: "STEM energy champions" },
      { value: "20", label: "Partner schools" },
      { value: "1,650", label: "Road safety toolkits" },
      { value: "38", label: "Visually challenged trekkers" },
    ],
    sections: [
      {
        title: "Sustainability & STEM education",
        bullets: [
          "2,400 students trained across 20 Mumbai schools",
          "5 student-led mini conservation clubs for campus energy and water audits",
          "60 hands-on STEM workshops on solar energy and resource efficiency",
          "National Urja Mela Quiz Competition — first prize for a partner school student",
        ],
      },
      {
        title: "Experiential road safety",
        copy: "In partnership with traffic authorities, 1,650 DIY safety toolkits—five hands-on models and three illustrated workbooks—teach zebra crossings, vehicle blind spots, bicycle safety, and alert commuting habits.",
      },
      {
        title: "Affirmative inclusion — Bhivgad Fort trek",
        copy: "On Chhatrapati Shivaji Maharaj Jayanti, 38 visually challenged young trekkers completed the Bhivgad Fort ascent in Karjat with 26 trained corporate volunteers, trail-side medical support, and verbal navigation protocols.",
      },
      {
        title: "Youth cricket (Konkan) & police digital enablement",
        bullets: [
          "Weekly cricket coaching clinics with kits and footwear for low-income players in coastal Konkan",
          "RCF Police Station Nirbhaya Cell: three desktops, three laser printers, and office software to accelerate case documentation for vulnerable complainants",
        ],
      },
    ],
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}

export const programNav = programs.map((p) => ({
  label: p.shortName,
  href: `/work/${p.slug}`,
}));
