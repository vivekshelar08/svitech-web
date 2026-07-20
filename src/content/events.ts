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
    slug: "community-health-awareness-drive",
    title: "Community Health Awareness Drive",
    summary:
      "Workshops and camps on preventive care, health education, and enrolment guidance for government health schemes including PM-JAY.",
    body: `Join a series of workshops and camps focused on health education and preventive care for underserved communities.

Sessions cover healthy living habits, when to seek care, and how to enrol under schemes such as Ayushman Bharat (PM-JAY). Volunteers will be available to help with basic documentation questions.

Open to community members, volunteers, and partner organisations.`,
    location: "Mumbai · Community venues",
    startsAt: "2026-08-23T10:00:00+05:30",
    endsAt: "2026-08-23T16:00:00+05:30",
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    registrationOpen: true,
  },
  {
    slug: "digital-literacy-facilitator-workshop",
    title: "Digital & Financial Literacy Workshop",
    summary:
      "A practical workshop for volunteers and educators on teaching UPI safety, cyber awareness, budgeting, and digital banking basics.",
    body: `Learn how to facilitate digital and financial literacy sessions in schools and community centres.

You will practice lesson flows covering digital banking, UPI transactions, cyber safety, online fraud prevention, and everyday budgeting—so participants leave with confidence, not just information.

Ideal for teachers, community mobilizers, and CSR volunteers.`,
    location: "Ghatkopar West, Mumbai · Hybrid",
    startsAt: "2026-09-13T09:30:00+05:30",
    endsAt: "2026-09-13T15:30:00+05:30",
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    registrationOpen: true,
  },
  {
    slug: "annual-fundraising-gathering",
    title: "Annual Fundraising Gathering",
    summary:
      "An evening to support Financial and Digital Inclusion, digital skills centres, education, and health outreach—meet the team and hear impact stories.",
    body: `Join supporters, partners, and volunteers for an evening dedicated to expanding SVITECH Foundation programmes.

Hear updates on Financial and Digital Inclusion, digital skills training, women empowerment, and community health work. Proceeds strengthen outreach that helps families access education, healthcare, and public entitlements.

Registration details and venue confirmation will be shared by email after you sign up.`,
    location: "Mumbai",
    startsAt: "2026-11-15T18:00:00+05:30",
    endsAt: "2026-11-15T21:00:00+05:30",
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    registrationOpen: true,
  },
];
