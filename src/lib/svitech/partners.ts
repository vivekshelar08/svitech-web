/** Public partners and CSR investment menu from SVITECH Foundation Docket (2025). */

export const publicPartners = {
  civic: [
    "BMC Wards M-East, M-West and L-Ward",
    "Slum Rehabilitation Authority (SRA)",
    "Integrated Child Development Services (ICDS)",
    "District Rationing Offices",
  ],
  safety: [
    "Mumbai Police and Nirbhaya Pathak units",
    "Mumbai Traffic Police",
    "Regional Transport Office (RTO)",
  ],
  financial: [
    "Indian Postal Network and IPPB",
    "Public-sector banks",
    "CSC e-Governance Services India",
  ],
  education: [
    "More than 32 municipal and low-income private schools",
    "ITIs, night degree colleges, and municipal health posts",
  ],
} as const;

export const partnershipModels = [
  {
    title: "Community digital classrooms & Women Learning Centers",
    impact: "Digital literacy, skill-building, and empowerment",
  },
  {
    title: "Mobile workforce inclusion & migrant labor drives",
    impact: "Job access, documentation, and social security",
  },
  {
    title: "Anganwadi modernization",
    impact: "Better nutrition, early learning, and child development",
  },
  {
    title: "Green schools, energy labs & tree plantations",
    impact: "Environment education and sustainable communities",
  },
  {
    title: "Structured corporate employee volunteering",
    impact: "Skilled support and community engagement",
  },
] as const;

export const csrTiers = [
  {
    tier: "Tier 1",
    name: "Community Micro-Grant",
    budget: "₹2.5 Lakhs – ₹5 Lakhs",
    package: "Anganwadi Center Modernization or School Road Safety Toolkit Drive",
    outputs:
      "1 preschool completely refurbished (water, furniture, BALA murals) OR students equipped with interactive traffic safety toolkits.",
  },
  {
    tier: "Tier 2",
    name: "Programmatic Cohort",
    budget: "₹8 Lakhs – ₹12 Lakhs",
    package: "Women Learning Center (WLC) Setup & 1-Year Operations",
    outputs:
      "1 neighborhood center established; 300+ women and adolescent girls digitally certified and trained in cyber safety.",
  },
  {
    tier: "Tier 3",
    name: "Flagship IT Academy",
    budget: "₹20 Lakhs – ₹25 Lakhs",
    package: "Permanent Community Digital Hub (15 Computer Workstations)",
    outputs:
      "Fully outfitted IT lab; 500+ students certified across basic and advanced tracks; permanent CBO handover.",
  },
  {
    tier: "Tier 4",
    name: "Corridor-Scale Intervention",
    budget: "₹40 Lakhs – ₹50 Lakhs+",
    package: "Mobile Financial Inclusion & Healthcare Unit (Pan-Corridor)",
    outputs:
      "10,000+ migrant/contract workers documented, screened for health, and linked to statutory welfare across industrial zones.",
  },
] as const;
