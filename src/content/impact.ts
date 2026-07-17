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

export const impactStories: ImpactStory[] = [
  {
    slug: "pune-library-lab",
    title: "Digital lab at a public library",
    location: "Pune, India",
    lat: 18.5204,
    lng: 73.8567,
    metricLabel: "Learners trained",
    metricValue: "240+",
    summary:
      "A 12-week lab helped library visitors gain internet safety and job-ready digital skills.",
    body: `Working with a neighborhood library, we ran weekend labs for first-time computer users and job seekers.

Facilitators trained by SVITECH Foundation now run the sessions independently. Attendance stayed high because the program lived where people already felt welcome.`,
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 1,
  },
  {
    slug: "nashik-open-curriculum",
    title: "Open curriculum for rural educators",
    location: "Nashik district, India",
    lat: 19.9975,
    lng: 73.7898,
    metricLabel: "Teachers using kits",
    metricValue: "48",
    summary:
      "Educators remixed our open learning kits into Marathi workshop tracks for youth centers.",
    body: `Local educators adapted civic-tech and data-literacy modules into Marathi workshop tracks.

Because the materials are open, teachers keep improving them after our partnership ends—exactly the stewardship model we design for.`,
    coverImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 2,
  },
  {
    slug: "mumbai-nonprofit-site",
    title: "Tools for a grassroots nonprofit",
    location: "Mumbai, India",
    lat: 19.076,
    lng: 72.8777,
    metricLabel: "Volunteer intake time",
    metricValue: "−60%",
    summary:
      "A lightweight intake site cut volunteer onboarding time and improved donor follow-up.",
    body: `A grassroots partner replaced scattered WhatsApp forms with a maintainable intake site and newsletter flow.

Volunteers now manage updates without a developer on call—and donors hear back with clear impact notes.`,
    coverImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 3,
  },
];
