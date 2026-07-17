export type Program = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  body: string;
  coverImage?: string;
  sortOrder: number;
};

export const programs: Program[] = [
  {
    slug: "community-digital-labs",
    name: "Community Digital Labs",
    summary:
      "In-person workshops covering internet safety, productivity tools, and pathways into remote work.",
    detail: "Running in partnership with libraries, schools, and youth centers.",
    body: `Community Digital Labs bring facilitators and shared devices into places people already gather.

Participants leave with practical skills—safe browsing, document tools, and job-ready digital habits—plus local peer networks that keep learning going after the workshop ends.

We train local facilitators so each lab can continue without depending on our team.`,
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 1,
  },
  {
    slug: "open-learning-paths",
    name: "Open Learning Paths",
    summary:
      "Curriculum kits any facilitator can adapt—covering civic tech, data basics, and accessible design.",
    detail: "Published under open licenses and translated with local educators.",
    body: `Open Learning Paths are modular curriculum kits designed for remixing.

Educators can translate, shorten, or expand modules for their context. Everything is released under open licenses so communities keep ownership of the materials they improve.`,
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 2,
  },
  {
    slug: "nonprofit-tooling",
    name: "Nonprofit Tooling",
    summary:
      "Lightweight websites, intake forms, and reporting helpers for small organizations.",
    detail: "Designed to be maintainable by volunteers with modest tech skills.",
    body: `Small nonprofits often need reliable tools more than flashy products.

We help partners launch maintainable websites, intake forms, and simple reporting helpers—chosen for longevity, not novelty.`,
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 3,
  },
  {
    slug: "mentor-circles",
    name: "Mentor Circles",
    summary:
      "Peer mentoring that pairs experienced practitioners with emerging community technologists.",
    detail: "Monthly cohorts focused on projects with real local impact.",
    body: `Mentor Circles connect practitioners with emerging community technologists for monthly project coaching.

Cohorts focus on real local work—labs, curriculum, or tooling—so mentoring translates into shipped outcomes.`,
    coverImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 4,
  },
];
