export type EventItem = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  location: string;
  startsAt: string;
  endsAt?: string;
  coverImage: string;
  registrationOpen: boolean;
};

export const events: EventItem[] = [
  {
    slug: "digital-literacy-facilitator-training",
    title: "Digital literacy facilitator training",
    summary:
      "A free weekend intensive for educators and organizers who want to host Community Digital Labs.",
    body: `Join a hands-on training for people ready to facilitate digital literacy workshops in their communities.

You will practice lesson flows, accessibility basics, and how to run a lab with limited devices. Graduates can request curriculum kits and ongoing mentor support.`,
    location: "Pune · Hybrid",
    startsAt: "2026-08-15T09:30:00+05:30",
    endsAt: "2026-08-16T16:00:00+05:30",
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    registrationOpen: true,
  },
  {
    slug: "open-education-meetup",
    title: "Open education meetup",
    summary:
      "An evening for teachers and nonprofit teams remixing open learning materials.",
    body: `Bring a lesson you want to adapt. We will workshop licensing questions, translation tips, and how to share improvements back with other facilitators.`,
    location: "Online",
    startsAt: "2026-09-10T18:00:00+05:30",
    endsAt: "2026-09-10T19:30:00+05:30",
    coverImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80",
    registrationOpen: true,
  },
  {
    slug: "community-tech-demo-day",
    title: "Community tech demo day",
    summary:
      "Mentor Circle cohorts present tools and workshops built with local partners.",
    body: `See projects from our latest Mentor Circle cohort—intake sites, lab playbooks, and open curriculum adaptations.

Open to partners, volunteers, and anyone curious about community-owned technology.`,
    location: "Mumbai",
    startsAt: "2026-10-04T11:00:00+05:30",
    endsAt: "2026-10-04T15:00:00+05:30",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    registrationOpen: true,
  },
];
