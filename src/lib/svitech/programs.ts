/** Practice portfolios from SVITECH Foundation Institutional Capability Docket (2025). */

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
    name: "Lok Adhikaar · Samriddhi Kendras",
    shortName: "Samriddhi",
    focus: "Citizen Rights, Workforce Welfare & Permanent Community Service Hubs",
    highlight:
      "600+ field welfare campaigns; 4 permanent Samriddhi Kendras; multi-state migrant labor outreach.",
    problem:
      "Eligible households remain outside the safety net because of documentation poverty, digital administrative exclusion, and information asymmetry around entitlements, deadlines, and documentation norms.",
    model:
      "Four-stage service delivery—household enumeration & gap mapping, document preparation & verification, digital registration & biometric processing, entitlement delivery & follow-up—plus full-time walk-in E-Seva at four permanent Kendras.",
    metrics: [
      { value: "600+", label: "Field welfare campaigns" },
      { value: "42,000+", label: "Households linked" },
      { value: "89,000+", label: "Individuals linked" },
      { value: "≈ ₹1 Cr", label: "OOPE saved" },
    ],
    sections: [
      {
        title: "Four-stage service delivery framework",
        bullets: [
          "Household enumeration & gap mapping — identify households, assess documentation gaps, prioritize entitlements",
          "Document preparation & verification — prepare, verify, and authenticate documents as per government norms",
          "Digital registration & biometric processing — online registrations, biometric authentication, and data validation",
          "Entitlement delivery & follow-up — ensure sanction, delivery of benefits, and continuous follow-up",
        ],
      },
      {
        title: "Categorized public welfare & social protection portfolio",
        rows: [
          {
            label: "Universal Healthcare & Cashless Medical Insurance",
            value: "24,774 families and individuals",
            detail: "AB-PMJAY and ABHA",
          },
          {
            label: "Unorganized Workforce Social Security",
            value: "22,590+ workers",
            detail:
              "National E-Shram and Maharashtra Building and Other Construction Workers Welfare Board",
          },
          {
            label: "Accidental Disability & Life Safety Protection",
            value: "17,800+ beneficiaries",
            detail: "PMSBY",
          },
          {
            label: "Women's Economic Security & Direct Support",
            value: "4,100+ women and expectant mothers",
            detail: "Mazi Ladki Bahin Yojana and PMMVY",
          },
          {
            label: "Civil Legal Identity & Revenue Proofs",
            value: "1,580+ households",
            detail: "PAN and income/domicile certificates",
          },
          {
            label: "Micro-Enterprise Formalization & Credit",
            value: "108 women entrepreneurs",
            detail: "Udyam",
          },
          {
            label: "Food Security & Subsidized Nutrition",
            value: "12,500+ households protected",
            detail: "NFSA, Mera Ration and PDS audits",
          },
        ],
      },
      {
        title: "Economic value & community sustainability",
        rows: [
          {
            label: "OOPE saved",
            value: "Approximately ₹1 Crore",
            detail: "Out-of-pocket expenditure saved for vulnerable families",
          },
          {
            label: "Direct cost savings at E-Seva desks",
            value: "₹18.14 Lakhs",
            detail:
              "Families avoided unauthorized commercial agent fees through transparent facilitation",
          },
          {
            label: "Women-led collective income",
            value: "₹3.61 Lakhs",
            detail:
              "Legitimate administrative income earned by women-led collectives",
          },
        ],
      },
      {
        title: "Four permanent Samriddhi Kendras",
        copy: "Full-time walk-in E-Seva open 6 days a week, run by trained local youth and women facilitators with dual-screen workstations, STQC biometrics, iris recognition, broadband, and UPS backup.",
        rows: [
          {
            label: "Asalpha Kendra, Ghatkopar West",
            value: "Asalpha & surrounding low-income settlements",
            detail: "Priority community focus · Full-time walk-in",
          },
          {
            label: "Kandivali Kendra, Western Suburbs",
            value: "Western Suburbs slum belt",
            detail: "Priority community focus · Full-time walk-in",
          },
          {
            label: "Vashinaka Hub, Chembur M-Ward",
            value: "Chembur M-Ward slum belt",
            detail: "Priority community focus · Full-time walk-in",
          },
          {
            label: "Vishnu Nagar Kendra, Chembur Central",
            value: "Chembur Central slum cluster",
            detail: "Priority community focus · Full-time walk-in",
          },
        ],
      },
      {
        title: "Industrial workforce & multi-state migrant labor",
        copy: "UAN and E-Shram onboarding, zero-balance Jan Dhan accounts, PMSBY accident coverage, and Mera Ration / One Nation One Ration Card portability—aligned to SEBI BRSR Principles 3 and 5.",
        rows: [
          {
            label: "Maharashtra",
            value: "Automotive, Engineering, Pharma, Textiles, Construction",
            detail: "Contract laborers, factory workers, logistics crews, inter-state migrants",
          },
          {
            label: "Gujarat",
            value: "Textiles, Chemicals, Engineering, Ports & Logistics",
            detail: "Contract laborers, factory workers, logistics crews, inter-state migrants",
          },
          {
            label: "Haryana",
            value: "Manufacturing, Electronics, E-commerce, Warehousing",
            detail: "Contract laborers, factory workers, logistics crews, inter-state migrants",
          },
          {
            label: "Delhi NCR",
            value: "Automotive, Agro-processing, Logistics, Warehousing",
            detail: "Contract laborers, factory workers, logistics crews, inter-state migrants",
          },
        ],
      },
    ],
  },
  {
    slug: "techshala",
    name: "Svitech Shiksha Kendra",
    shortName: "Shiksha Kendra",
    focus: "Foundational Digital Skills, Workplace Computing & Women Learning Centers",
    highlight:
      "16,100+ learners certified; 78% female enrollment; 86% verified placement among active job seekers.",
    problem:
      "The digital divide continues to affect first-generation learners, underserved youth, and women—limiting access to skills, opportunities, and economic independence.",
    model:
      "Inclusive, practical, job-oriented digital education aligned with CSC Academy and PMGDISHA guidelines, plus Women Learning Centers and community-owned computer labs.",
    metrics: [
      { value: "16,100+", label: "Learners certified" },
      { value: "78%", label: "Female enrollment" },
      { value: "86%", label: "Verified placement rate" },
      { value: "2,290", label: "Women Learning Center reach" },
    ],
    sections: [
      {
        title: "Program highlights",
        bullets: [
          "16,100+ total learners certified",
          "78% female enrollment",
          "Alignment with CSC Academy and PMGDISHA guidelines",
          "Prioritization of SC, OBC, and EWS communities",
          "25 certified technical trainers",
        ],
      },
      {
        title: "Tier 1 — Practical curriculum",
        bullets: [
          "Computer systems & architecture",
          "Internet & digital communications",
          "E-governance & citizen applications",
          "Cyber safety & digital awareness",
          "Outcome: verified Certificate of Completion after practical curriculum and weekly topic assessments",
        ],
      },
      {
        title: "Tier 2 — 60-hour career track",
        bullets: [
          "Microsoft Word for office drafting — professional documents, formatting, templates",
          "Advanced Microsoft Excel — formulas, filtering, VLOOKUP, pivot tables, MIS reporting",
          "Microsoft PowerPoint — presentations, data, and visual communication",
          "Digital workflow systems — cloud collaboration, PDF workflows, scanning, secure backups",
        ],
      },
      {
        title: "Employment outcomes",
        rows: [
          {
            label: "Verified placement rate",
            value: "86%",
            detail: "Among active job seekers",
          },
          {
            label: "Hiring partnerships",
            value: "250+ SMEs across Mumbai",
            detail: "Small and medium-sized businesses",
          },
          {
            label: "Female candidates placed",
            value: "53%",
            detail: "Creating dignified work and economic independence",
          },
        ],
      },
      {
        title: "Case spotlight — Shubham Vidhate",
        copy: "Shubham Vidhate began working in a small office earning ₹2,000 per month. After completing Advanced Excel training, he secured a formal back-office role with stable income, benefits, and career growth. Skills open doors. We walk with him through them.",
      },
      {
        title: "Women Learning Centers & Padho, Likho, Bolo",
        copy: "Network across Ghatkopar, Kandivali, and community clusters — 2,290 beneficiaries building digital confidence for everyday life.",
        rows: [
          { label: "Adolescent girls & out-of-school youth", value: "980" },
          { label: "Self-help group women", value: "680" },
          { label: "Community residents", value: "408" },
          { label: "Specialized workshop attendees", value: "222" },
        ],
      },
      {
        title: "Padho · Likho · Bolo curriculum",
        rows: [
          {
            label: "Padho — Functional Workplace Reading",
            value: "Notices, instructions, forms, digital content",
            detail: "Understand workplace materials with confidence",
          },
          {
            label: "Likho — Written Professional Communication",
            value: "Messages, reports, emails, applications",
            detail: "Write clearly for work and daily needs",
          },
          {
            label: "Bolo — Conversational Workplace Speaking",
            value: "Meetings, calls, presentations, client interactions",
            detail: "Speak clearly and confidently",
          },
        ],
      },
      {
        title: "The Vashinaka model — community ownership",
        copy: "Transparent setup → supervised incubation → handover to Adhikaar Mahila Bachat Gat → long-term community operation of a 10-workstation center run by the community, for the community.",
      },
      {
        title: "Academic coaching & youth self-defense",
        bullets: [
          "Foundational primary support (Classes 1–5) — literacy, numeracy, learning habits",
          "Middle school conceptual tutoring — key subjects",
          "10th grade board exam preparation — guidance, practice, mentoring",
          "Monthly parent-teacher meetings for attendance and continuity",
          "2,000+ students trained in self-defense: situational awareness, verbal assertiveness, basic physical tactics, emergency protocols (100, 103, 112)",
        ],
      },
    ],
  },
  {
    slug: "swasthya-setu",
    name: "Swasthya Setu",
    shortName: "Swasthya Setu",
    focus: "Preventive Healthcare, Diagnostics, Menstrual Hygiene & Institutional Public Health",
    highlight:
      "5,800+ community members evaluated; 4,200+ women and girls reached on menstrual hygiene; 7,100+ citizens sensitized.",
    problem:
      "Informal settlements and industrial worker colonies face a heavier burden of illness and poorer access to care—delayed care, undiagnosed chronic conditions, lost livelihoods, and medical debt.",
    model:
      "Multi-specialty screenings, vision care, menstrual hygiene workshops, and institutional health awareness through peer-led dialogue, confidential counseling helpdesks, and institutional coordination.",
    metrics: [
      { value: "5,800+", label: "Community members evaluated" },
      { value: "7,100+", label: "Health sensitized" },
      { value: "4,200+", label: "MHM reach" },
      { value: "4,382", label: "HIV/AIDS session participants" },
    ],
    sections: [
      {
        title: "Multi-specialty screenings",
        bullets: [
          "Blood pressure and cardiovascular screening — early detection of heart and BP-related risks",
          "Diabetes and random blood glucose testing — screen for diabetes and pre-diabetes",
          "Hemoglobin and nutritional evaluation — identify anemia and nutritional gaps",
          "General physician consultation — clinical review, basic treatment guidance, preventive advice",
          "Medical referral networks — linkages to trusted hospitals and specialists",
        ],
      },
      {
        title: "Vision care for all",
        bullets: [
          "Optometrist consultations — comprehensive eye examinations and vision assessment",
          "Free prescription spectacles — corrective glasses to improve daily functioning",
          "Cataract and surgical screening — early identification of eye conditions",
          "Links to charitable eye hospitals — referrals for surgery and advanced treatment",
        ],
      },
      {
        title: "Menstrual hygiene & reproductive wellness",
        copy: "Over 4,200 adolescent girls and women across 35+ structured school and community workshops.",
        bullets: [
          "Biological awareness and puberty education",
          "Hygiene practices and infection prevention",
          "Safe and eco-friendly disposal practices",
          "Peer support and school retention",
        ],
      },
      {
        title: "Institutional health awareness",
        rows: [
          {
            label: "HIV/AIDS and STD awareness",
            value: "4,382 participants",
            detail: "Across 50+ sessions",
          },
          {
            label: "Anti-tobacco education and addiction control",
            value: "2,780 participants",
            detail: "Across 22 sessions",
          },
        ],
      },
    ],
  },
  {
    slug: "lok-adhikar",
    name: "Lok Adhikaar · Civic Leadership & Kala-Sanvad",
    shortName: "Lok Adhikaar",
    focus: "Grassroots Leadership, Food Security Audits, Civic Infrastructure & Participatory Theatre",
    highlight:
      "50 Community Vigilance Groups; 40+ civic victories; 980 cultural performances; Anganwadi modernization.",
    problem:
      "Vulnerable communities often lack organized platforms to monitor public services and communicate infrastructure deficits to local administrative bodies.",
    model:
      "Community Vigilance Groups, Adhikaar Mitras, and ABHA Sakhis audit PDS shops and petition civic bodies; Kala-Sanvad uses street theatre to turn awareness into action; Anganwadis are modernized with BALA murals and child-friendly amenities.",
    metrics: [
      { value: "50", label: "Community Vigilance Groups" },
      { value: "40+", label: "Civic infrastructure victories" },
      { value: "980", label: "Cultural performances" },
      { value: "12,500+", label: "Families with food entitlements secured" },
    ],
    sections: [
      {
        title: "Grassroots leadership architecture",
        rows: [
          {
            label: "50 Community Vigilance Groups",
            value: "250 active members",
            detail: "Across 24 slum settlements — audits of fair-price shops, sanitation, and utilities",
          },
          {
            label: "100+ trained Adhikaar Mitras",
            value: "Active community leaders",
            detail: "Grievance submissions, paperwork, and institutional follow-ups",
          },
          {
            label: "100 certified ABHA Sakhis",
            value: "Health & welfare guides",
            detail: "Health cards, maternal schemes, digital welfare guidance",
          },
        ],
      },
      {
        title: "PDS audit process for 40+ fair-price ration shops",
        bullets: [
          "Verifying stock availability, distribution records, and actual grain issued",
          "Checking shop operating hours against notified timings",
          "Verifying accuracy of e-PoS devices and weigh-scales",
          "Ensuring statutory information boards are clearly displayed and up to date",
          "Corrective action across 18+ non-compliant shops",
          "Full food-grain entitlements secured for over 12,500 families",
        ],
      },
      {
        title: "Field vignette — Mukund Nagar & Shivaji Nagar",
        copy: "Residents faced irregular access to monthly food grains. CBOs documented issues and submitted written representation. Authorities conducted inspections and ensured display of statutory boards. Regular monthly food-grain access was restored for all entitled families.",
      },
      {
        title: "Key civic infrastructure victories",
        bullets: [
          "Arterial roadway reconstruction in Sakinaka and Pereira Wadi — benefiting 20,000+ residents, factory workers, and schoolchildren",
          "Pedestrian footpath reconstruction in Sahyadri Nagar and KGN Nagar — 1,500+ households",
          "18+ solar and electric streetlights installed for women's safety",
          "Solid waste remediation near schools in Mukund Nagar and Bharat Nagar",
          "Sanitation processing plant reactivation in KGN Nagar — 2,500+ families",
          "Drinking water pipeline repairs in Vishnu Nagar — restoring safe water access",
          "Overall: 40+ major civic infrastructure victories",
        ],
      },
      {
        title: "Anganwadi building, renovation & modernization",
        copy: "At Prabuddha Nagar SRA (serving 1,000+ low-income families): dampness treatment, anti-skid flooring, LED lighting, clean drinking water storage, child-friendly furniture, BALA murals, phonics lines, height charts, developmental toys — formally handed to Anganwadi Sevika & CDPO with continuing maternal health and immunization support.",
      },
      {
        title: "Kala-Sanvad — grassroots theatre for social change",
        copy: "Interactive street-play, music, puppetry and storytelling help audiences remember, reflect, and act. Consolidated total: 980 cultural performances and 230,000+ citizens mobilized; 230 performers trained.",
        rows: [
          { label: "2024", value: "134 performances · ~32,000 citizens" },
          { label: "2025", value: "348 performances · ~85,000 citizens" },
          { label: "2026", value: "498 performances · 120,000+ citizens" },
        ],
      },
      {
        title: "Thematic campaign portfolio",
        bullets: [
          "Right to Food and Fair-Price Shop Transparency — Mera Ration verification",
          "Cyber Safety and Digital Banking Awareness — OTP phishing prevention",
          "Democratic Participation and Voting Rights — voter registration",
          "Women's Legal Rights and Child Protection — domestic violence and POCSO awareness",
          "Preventive Health, Clean Water and Menstrual Hygiene Awareness",
        ],
      },
      {
        title: "Affirmative inclusion, youth sports & Nirbhaya Pathak",
        bullets: [
          "Bhivgad Fort inclusive trek — 38 visually challenged young individuals with 26 trained corporate employee volunteers",
          "Konkan grassroots youth sports mentorship — weekly cricket coaching, athletic conditioning, life-skills",
          "Nirbhaya Pathak workshops — 520+ women, adolescent girls, and youth sensitized on legal protections, emergency response (100, 103, 112), and free institutional legal aid",
        ],
      },
    ],
  },
  {
    slug: "urja-prayas",
    name: "Mission Ankur",
    shortName: "Mission Ankur",
    focus: "Environmental Stewardship, Green Schools, Tree Plantation & Road Safety",
    highlight:
      "2,400 students across 20 partner schools; 60 practical workshops; 1,650 DIY road safety toolkits.",
    problem:
      "Primary and secondary students need applied STEM, energy literacy, community greening, and early pedestrian safety habits—especially in dense urban corridors.",
    model:
      "Green School Initiative with student conservation teams, monthly energy audits, water-leak monitoring, interactive technical sessions, science fairs, native tree plantations, and Traffic Police–partnered road safety toolkits.",
    metrics: [
      { value: "2,400+", label: "Conservation champions" },
      { value: "20", label: "Partner schools" },
      { value: "60", label: "Practical workshops" },
      { value: "1,650", label: "Road safety toolkits" },
    ],
    sections: [
      {
        title: "Mission Ankur dashboard",
        rows: [
          { label: "Partner schools", value: "20" },
          { label: "Conservation champions", value: "2,400" },
          { label: "Practical workshops", value: "60" },
          { label: "Active school conservation units", value: "5" },
          { label: "Annual science fairs", value: "5" },
        ],
      },
      {
        title: "The Green School Initiative",
        bullets: [
          "Student Conservation Teams — students lead conservation as active change-makers",
          "Monthly Classroom Energy Audits — track and reduce energy consumption",
          "Water-Leak Monitoring — students monitor and report leaks",
          "Interactive Technical Sessions — 60 sessions on solar power, clean energy, and electricity conservation",
          "Svitech Science Fair — students showcase working environmental prototypes",
          "National Science Quiz Competition — 1st prize winner received national recognition",
        ],
      },
      {
        title: "Community greening & tree plantations",
        bullets: [
          "Native air-purifying trees including Neem, Peepal, Jamun, and Karanj",
          "Student and community sapling adoption",
          "Urban chawl greening with Tulsi, Aloe Vera, and Lemongrass",
          "Localized cleanliness and greening campaigns",
        ],
      },
      {
        title: "Road safety initiative",
        copy: "1,650 DIY road safety toolkits teach core habits with Traffic Police demonstrations.",
        bullets: [
          "Zebra crossing and signal discipline",
          "Blind-spot awareness",
          "Protective gear and bicycle safety",
          "Safe walking habits",
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
