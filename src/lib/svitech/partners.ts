/** Public partners and CSR investment menu from SVITECH Foundation profile. */

export const publicPartners = {
  civic: [
    "BMC Wards M-East & M-West",
    "Slum Rehabilitation Authority (SRA)",
    "Integrated Child Development Services (ICDS)",
  ],
  safety: [
    "Mumbai Police Zonal Divisions",
    "Local Police Nirbhaya Cells",
    "Mumbai Traffic Police Department",
    "Regional Transport Office (RTO)",
  ],
  financial: [
    "Indian Post Office (Aziz Baug, Deonar)",
    "India Post Payments Bank (IPPB)",
    "Canara Bank & National Banking Networks",
    "CSC e-Governance Services India",
  ],
} as const;

export const csrTiers = [
  {
    tier: "Tier 1",
    name: "Community Micro-Grant",
    budget: "₹2.5 Lakhs – ₹5 Lakhs",
    package: "Anganwadi Center Modernization or School Road Safety Toolkit Drive",
    outputs:
      "1 preschool completely refurbished (water, furniture, BALA murals) OR 1,500 students equipped with interactive traffic safety toolkits.",
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
