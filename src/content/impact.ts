export type ImpactStory = {
  slug: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  metricLabel: string;
  metricValue: string;
  summary: string;
  body: string;
  coverImage: string;
  sortOrder: number;
};

/**
 * Geographic programme map:
 * - Maharashtra: full suite of activities
 * - Pune (Maharashtra): Digital Literacy (in addition to state-wide work)
 * - Other states: Financial Inclusion project only
 */
export const impactStories: ImpactStory[] = [
  {
    slug: "maharashtra-all-activities",
    title: "Full programme suite across Maharashtra",
    location: "Mumbai, Maharashtra",
    lat: 19.076,
    lng: 72.8777,
    metricLabel: "Maharashtra",
    metricValue: "All activities",
    summary:
      "Home base for SVITECH Foundation’s complete work—Financial and Digital Inclusion, skills training, health and welfare facilitation, education, women empowerment, road safety, CSR, and community outreach.",
    body: `Maharashtra is where SVITECH Foundation delivers its full range of activities.

From Ghatkopar West and Mumbai suburbs such as Mankhurd, Govandi, and Malad, programmes include Financial and Digital Inclusion, digital skills training, health awareness and PM-JAY facilitation, school education support, women empowerment, road safety campaigns, corporate CSR engagement, digital service camps, and community outreach.

This is the Foundation’s deepest footprint—need-based awareness, capacity building, and beneficiary support with schools, agencies, CSR partners, and local communities.`,
    coverImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 1,
  },
  {
    slug: "pune-digital-literacy",
    title: "Digital Literacy in Pune",
    location: "Pune, Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    metricLabel: "Pune focus",
    metricValue: "Digital Literacy",
    summary:
      "Alongside Maharashtra’s full programme suite, Pune hosts dedicated digital literacy sessions on safe technology use, UPI basics, and cyber awareness.",
    body: `In Pune, SVITECH Foundation runs focused Digital Literacy programmes in schools, colleges, and community centres.

Participants learn responsible internet use, cyber safety, online fraud prevention, and practical digital tools—complementing the Foundation’s wider Maharashtra activities and the flagship Financial and Digital Inclusion work.`,
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 2,
  },
  {
    slug: "mumbai-financial-digital-inclusion",
    title: "Financial and Digital Inclusion",
    location: "Mumbai suburbs, Maharashtra",
    lat: 19.05,
    lng: 72.93,
    metricLabel: "Flagship",
    metricValue: "Inclusion",
    summary:
      "Flagship programme in Maharashtra: digital banking, UPI safety, financial planning, and access to citizen digital services.",
    body: `Financial and Digital Inclusion is the Foundation’s flagship programme in Maharashtra—helping underserved families use digital banking and UPI safely, plan everyday finances, and complete citizen-centric digital services.

Sessions and facilitation run through community centres and neighbourhood support points across Mumbai, as part of the state’s full activity suite.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 3,
  },
  {
    slug: "delhi-financial-inclusion",
    title: "Financial Inclusion",
    location: "New Delhi, Delhi",
    lat: 28.6139,
    lng: 77.209,
    metricLabel: "Project",
    metricValue: "Financial Inclusion",
    summary:
      "Outside Maharashtra, SVITECH Foundation’s work in Delhi focuses on the Financial Inclusion project—digital banking awareness, UPI safety, and financial planning.",
    body: `In Delhi, SVITECH Foundation implements the Financial Inclusion project for underserved communities.

Sessions cover digital banking, UPI transactions, cyber safety, budgeting, and savings—so participants can manage money and digital payments with greater confidence. Broader programme suites remain centred in Maharashtra.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 4,
  },
  {
    slug: "gujarat-financial-inclusion",
    title: "Financial Inclusion",
    location: "Ahmedabad, Gujarat",
    lat: 23.0225,
    lng: 72.5714,
    metricLabel: "Project",
    metricValue: "Financial Inclusion",
    summary:
      "Financial Inclusion project sessions in Gujarat on digital payments, fraud prevention, budgeting, and safer everyday banking.",
    body: `In Gujarat, SVITECH Foundation’s presence is through the Financial Inclusion project.

Awareness sessions in community venues help participants understand digital banking, UPI, online fraud risks, and basic financial planning. Full multi-programme delivery is focused in Maharashtra.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 5,
  },
  {
    slug: "haryana-financial-inclusion",
    title: "Financial Inclusion",
    location: "Gurugram, Haryana",
    lat: 28.4595,
    lng: 77.0266,
    metricLabel: "Project",
    metricValue: "Financial Inclusion",
    summary:
      "Financial Inclusion project outreach in Haryana—practical sessions on UPI, cyber safety, and household financial planning.",
    body: `In Haryana, SVITECH Foundation delivers the Financial Inclusion project.

Community sessions introduce digital payments, fraud prevention, budgeting, and savings habits for economically weaker and underserved groups. Other activity areas are delivered primarily in Maharashtra.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 6,
  },
  {
    slug: "uttar-pradesh-financial-inclusion",
    title: "Financial Inclusion",
    location: "Lucknow, Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    metricLabel: "Project",
    metricValue: "Financial Inclusion",
    summary:
      "Financial Inclusion project in Uttar Pradesh—digital banking literacy, UPI safety, and financial awareness for underserved communities.",
    body: `In Uttar Pradesh, SVITECH Foundation implements the Financial Inclusion project.

Participants learn digital banking basics, safe UPI use, cyber awareness, and everyday financial planning. The Foundation’s complete activity suite—health, education, women empowerment, road safety, and more—is concentrated in Maharashtra.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 7,
  },
];
