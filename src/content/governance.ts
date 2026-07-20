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
      "Programme outcomes, financial overview, and governance notes for the year.",
    fileUrl: "/reports/annual-report-2025.pdf",
  },
  {
    year: 2024,
    title: "Annual report 2024",
    description:
      "Founding-year summary of community outreach, digital skills work, and partnerships.",
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
    name: "Vivek G. Shelar",
    role: "Founder & President",
    bio: "Experienced in accounts and inventory management, and actively engaged in community development using digital technologies. Recognised for contributions to Digital India and the e-Shram Yojana.",
  },
  {
    name: "Rajani G. Kulaye",
    role: "Secretary",
    bio: "Over a decade imparting IT skills to students and communities. Holds a Bachelor of Social Work and leads community outreach programmes.",
  },
];
