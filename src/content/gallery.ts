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
    slug: "digital-literacy-pune-lab",
    title: "Digital literacy lab, Pune",
    category: "Digital Literacy",
    summary:
      "Learners practise online banking safety and citizen service portals in a guided lab session.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 1,
  },
  {
    slug: "women-livelihood-workshop",
    title: "Women livelihood workshop",
    category: "Women Empowerment",
    summary:
      "Vocational and digital skills sessions that support women’s financial independence.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 2,
  },
  {
    slug: "community-health-camp",
    title: "Community health camp",
    category: "Health",
    summary:
      "Health screening and scheme enrolment support for families navigating public benefits.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 3,
  },
  {
    slug: "school-education-outreach",
    title: "School education outreach",
    category: "Education",
    summary:
      "Classroom support and learning resources for children in underserved neighbourhoods.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 4,
  },
  {
    slug: "community-mobilisation-day",
    title: "Community mobilisation day",
    category: "Community",
    summary:
      "Local volunteers and partners gather to expand awareness of digital and welfare services.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 5,
  },
  {
    slug: "road-safety-awareness",
    title: "Road safety awareness drive",
    category: "Road Safety",
    summary:
      "Street-level awareness sessions promoting safer habits for students and daily commuters.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 6,
  },
  {
    slug: "senior-digital-inclusion",
    title: "Senior digital inclusion circle",
    category: "Digital Literacy",
    summary:
      "Seniors learn UPI basics, scam awareness, and how to access essential online services.",
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 7,
  },
  {
    slug: "youth-financial-inclusion",
    title: "Youth financial inclusion session",
    category: "Community",
    summary:
      "Young adults explore digital banking tools and responsible financial planning together.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    sortOrder: 8,
  },
];
