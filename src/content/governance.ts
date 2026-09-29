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
      "Founding year: access-to-services camps across 30 locations, basic computer training with 30 placements from 100 trainees, and a cricket camp in Ratnagiri. Published 14 June 2024.",
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
    bio: "Founded Svitech Computer Training Institute in 2016 and incorporated SVITECH Foundation on 5 September 2023. Bachelor of Computer Applications (IT), Tilak Maharashtra Vidyapeeth, and Master of Social Work, IGNOU. Recognised under Digital India and for implementing e-Shram.",
  },
  {
    name: "Rajani G. Kulaye",
    role: "Secretary & Director — Operations",
    bio: "More than a decade teaching IT. Bachelor of Social Work, Yashwantrao Chavan Maharashtra Open University. Runs the Ghatkopar West skill centre and oversees operations and finances.",
  },
];
