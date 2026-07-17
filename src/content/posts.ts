export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  publishedAt: string;
};

export const posts: Post[] = [
  {
    slug: "why-open-curriculum-matters",
    title: "Why open curriculum matters for community tech",
    excerpt:
      "Closed lesson packs lock communities into vendors. Open kits let educators remix for local language, culture, and pace.",
    body: `When curriculum is locked behind a vendor license, communities lose the ability to adapt materials to their own language, culture, and pace.

SVITECH Foundation publishes learning kits under open licenses so facilitators can translate, shorten, or expand modules without asking permission.

That is not a branding choice—it is how skills survive after a project grant ends.`,
    coverImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-05-12",
  },
  {
    slug: "designing-labs-people-return-to",
    title: "Designing digital labs people return to",
    excerpt:
      "The best labs feel like libraries, not classrooms: familiar places, peer support, and facilitators from the community.",
    body: `People return when a lab feels like a library, not a one-off classroom.

That means familiar venues, peer support, and facilitators who live nearby. Our Community Digital Labs model trains local hosts first so sessions continue after our team steps back.

Retention is the real KPI—not enrollment day photos.`,
    coverImage:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-06-03",
  },
  {
    slug: "transparency-notes-q2",
    title: "Transparency notes: how gifts fund programs",
    excerpt:
      "A clear look at where support goes—facilitator stipends, shared devices, and open materials.",
    body: `Donors deserve specifics.

Public gifts primarily fund facilitator stipends, shared lab devices, translation of open materials, and partner travel for remote communities.

We publish annual reports and keep board information on this site so trust is easy to verify—not buried in a PDF nobody can find.`,
    coverImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-06-28",
  },
];
