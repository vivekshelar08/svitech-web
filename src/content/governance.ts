export type Report = {
  year: number;
  title: string;
  description: string;
  fileUrl: string;
};

export const reports: Report[] = [
  {
    year: 2025,
    title: "Institutional Capability Docket 2025",
    description:
      "Cumulative impact dashboard, programme portfolios, Samriddhi Kendras, and governance credentials.",
    fileUrl: "/reports/annual-report-2025.pdf",
  },
  {
    year: 2024,
    title: "Annual report 2024",
    description:
      "Founding-year programme outcomes, financial overview, and governance notes. Published 14 June 2024.",
    fileUrl: "/reports/annual-report-2024.pdf",
  },
];

export type BoardMember = {
  name: string;
  role: string;
  bio: string;
};

export const board: BoardMember[] = [
  {
    name: "Vivek Ganpat Shelar",
    role: "Chairman & Managing Director · Founder & President",
    bio: "MSW, BCA. Strategic vision, institutional partnerships, and community engagement. Guides SVITECH Foundation as a registered Section 8 not-for-profit organization.",
  },
  {
    name: "Rajani G. Kulaye",
    role: "Director",
    bio: "Over a decade of IT skills instruction and institutional training center management. Oversees skill centers, curriculum quality, and operations.",
  },
  {
    name: "Vishal Ladku Jadhav",
    role: "Director",
    bio: "Specialist in child protection, unorganized labor rights, and public welfare access. Leads citizen entitlement and civic partnership programmes.",
  },
  {
    name: "Pramod Yashwant Gaikwad",
    role: "Director",
    bio: "Cultural movement leader and grassroots mobilization pioneer. Directs community outreach and women-led street theatre (Kala-Sanvad).",
  },
];
