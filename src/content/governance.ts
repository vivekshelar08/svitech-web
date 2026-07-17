export type Report = {
  year: number;
  title: string;
  description: string;
  fileUrl: string;
};

export const reports: Report[] = [
  {
    year: 2025,
    title: "Annual report 2025",
    description:
      "Program outcomes, financial overview, and governance notes for the year.",
    fileUrl: "/reports/annual-report-2025.pdf",
  },
  {
    year: 2024,
    title: "Annual report 2024",
    description:
      "Founding-year summary of labs launched, partners engaged, and open materials released.",
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
    name: "Asha Menon",
    role: "Chair",
    bio: "Educator and open-learning advocate with two decades in community colleges.",
  },
  {
    name: "Rohan Desai",
    role: "Treasurer",
    bio: "Finance professional focused on nonprofit stewardship and transparent reporting.",
  },
  {
    name: "Priya Nair",
    role: "Secretary",
    bio: "Community organizer bridging grassroots groups with digital literacy programs.",
  },
  {
    name: "Imran Khan",
    role: "Board member",
    bio: "Technologist building maintainable tools for small civil-society teams.",
  },
];
