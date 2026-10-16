import { media } from "@/lib/svitech/media";

export const GALLERY_CATEGORIES = [
  "Digital Literacy",
  "Women Empowerment",
  "Health",
  "Education",
  "Community",
  "Road Safety",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  slug: string;
  title: string;
  category: GalleryCategory;
  summary: string;
  image: string;
  sortOrder: number;
};

export const galleryItems: GalleryItem[] = [
  {
    slug: "eseva-welfare-camp",
    title: "Multi-desk welfare enrollment camp",
    category: "Community",
    summary:
      "Samriddhi field camp linking households to PMJAY, E-Shram, and civil certificates.",
    image: media.welfareCamp,
    sortOrder: 1,
  },
  {
    slug: "techshala-digital-lab",
    title: "Shiksha Kendra community digital lab",
    category: "Digital Literacy",
    summary:
      "CSC Academy / PMGDISHA practical sessions for youth and women learners.",
    image: media.heroDigital,
    sortOrder: 2,
  },
  {
    slug: "women-learning-center",
    title: "Women Learning Center batch",
    category: "Women Empowerment",
    summary:
      "Neighbourhood WLC sessions on mobile literacy, UPI safety, and workplace English.",
    image: media.womenLearning,
    sortOrder: 3,
  },
  {
    slug: "swasthya-diagnostic-drive",
    title: "Swasthya-Setu diagnostic drive",
    category: "Health",
    summary:
      "Community screening for hypertension, glucose, hemoglobin, and eye care.",
    image: media.healthCamp,
    sortOrder: 4,
  },
  {
    slug: "lok-adhikar-civic-meeting",
    title: "Community Vigilance Group meeting",
    category: "Community",
    summary:
      "Grassroots leaders coordinating PDS audits and municipal infrastructure petitions.",
    image: media.civicMeeting,
    sortOrder: 5,
  },
  {
    slug: "urja-stem-school",
    title: "Mission Ankur STEM school session",
    category: "Education",
    summary:
      "Energy champions and hands-on sustainability workshops across partner schools.",
    image: media.schoolStem,
    sortOrder: 6,
  },
  {
    slug: "bhivgad-inclusion-trek",
    title: "Bhivgad Fort inclusive trek",
    category: "Community",
    summary:
      "Adaptive mountain ascent for visually challenged youth with corporate volunteers.",
    image: media.inclusionTrek,
    sortOrder: 7,
  },
  {
    slug: "industrial-corridor-outreach",
    title: "Industrial corridor labour outreach",
    category: "Community",
    summary:
      "Multi-state migrant worker enrollments for UAN, Jan Dhan, and accident insurance.",
    image: media.factoryCorridor,
    sortOrder: 8,
  },
];
