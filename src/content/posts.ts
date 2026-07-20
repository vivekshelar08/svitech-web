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
    slug: "note-on-activities",
    title: "Note on Activities of SVITECH Foundation",
    excerpt:
      "An overview of programmes conducted during the year—digital and financial literacy, health and welfare facilitation, education, women empowerment, road safety, CSR engagement, and community outreach.",
    body: `SVITECH Foundation is a charitable organization committed to promoting education, digital inclusion, health awareness, financial literacy, community development, and social welfare among economically weaker and underserved sections of society. The Foundation conducts need-based awareness programmes, capacity-building workshops, community outreach initiatives, and beneficiary support activities in collaboration with educational institutions, government agencies, corporate CSR partners, and local communities.

During the year, the Foundation successfully organized and implemented the following activities:

1. Digital & Financial Literacy Programmes
The Foundation conducted digital and financial literacy awareness sessions in schools, colleges, community centres, and residential communities. Participants were educated on digital banking, UPI transactions, cyber safety, online fraud prevention, responsible internet usage, budgeting, savings, and financial planning to promote financial inclusion and digital empowerment.

2. Community Awareness & Capacity Building
Awareness meetings and interactive workshops were organized for community members, women, youth, and senior citizens on various social welfare schemes, digital services, citizen rights, government initiatives, and community participation. These programmes encouraged informed decision-making and improved access to public welfare benefits.

3. Health Awareness & Government Welfare Facilitation
The Foundation organized health awareness campaigns and facilitated enrolment under various Government welfare schemes, including Ayushman Bharat–Pradhan Mantri Jan Arogya Yojana (PM-JAY). Volunteers assisted eligible beneficiaries in document verification, digital registration, and awareness regarding health insurance benefits and healthcare services.

4. Educational Support & School Awareness Programmes
Educational sessions were conducted in schools focusing on digital literacy, financial awareness, life skills, cyber safety, and responsible use of technology. Interactive learning methods were adopted to encourage active student participation and improve practical knowledge beyond the classroom.

5. Women Empowerment Initiatives
The Foundation organized awareness meetings and training programmes for women on financial independence, digital literacy, government welfare schemes, health awareness, and livelihood opportunities. These initiatives aimed to strengthen women's participation in social and economic development.

6. Road Safety Awareness Campaigns
Road safety campaigns were conducted in association with schools, volunteers, and local authorities to educate students and the general public on traffic rules, pedestrian safety, helmet usage, seat belt compliance, and accident prevention through rallies, awareness drives, and community interactions.

7. Corporate CSR Engagement
The Foundation collaborated with corporate organizations for employee volunteering programmes, ethics awareness sessions, environmental initiatives, community service activities, and social responsibility projects. These collaborations promoted sustainable community development and encouraged active employee participation in social causes.

8. Digital Service Facilitation Camps
The Foundation organized community service camps providing assistance for digital documentation, online registrations, beneficiary enrolment, Aadhaar-linked services, government scheme applications, and other citizen-centric digital services, particularly benefiting economically weaker sections.

9. Community Outreach & Social Development
Regular outreach programmes were conducted in urban and semi-urban communities to identify local needs, create awareness about public welfare schemes, encourage community participation, and facilitate access to education, healthcare, digital services, and social security benefits.

Impact of Activities
Through its various programmes, SVITECH Foundation has:

• Conducted awareness sessions benefiting students, women, youth, senior citizens, and community members.
• Promoted digital and financial literacy among underserved populations.
• Facilitated access to government welfare schemes and healthcare benefits.
• Supported educational institutions through life-skill and digital awareness programmes.
• Encouraged road safety awareness and responsible citizenship.
• Strengthened community participation through outreach and volunteer-driven initiatives.

The Foundation continues to work towards creating an informed, digitally empowered, healthy, and self-reliant society through education, awareness, capacity building, and inclusive community development programmes.`,
    coverImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-07-20",
  },
  {
    slug: "transforming-lives-through-education",
    title: "Transforming lives through education",
    excerpt:
      "How Education for All and school awareness programmes provide learning resources, digital literacy, and life skills in underserved communities.",
    body: `Quality education remains out of reach for many children in underserved areas of Mumbai—even in India's financial capital.

Through Education for All, SVITECH Foundation provides free educational resources and support so children in slum communities can build strong academic foundations.

School awareness sessions add digital literacy, financial awareness, life skills, cyber safety, and responsible technology use—interactive learning that goes beyond the classroom and helps young people participate confidently in a digital society.`,
    coverImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-06-15",
  },
  {
    slug: "health-camps-doorstep-care",
    title: "Health camps: bringing healthcare to the doorstep",
    excerpt:
      "Free health camps and Ayushman Bharat (PM-JAY) enrolment support for underserved communities.",
    body: `Access to preventive care and health insurance can change a family's future—yet paperwork and distance often stand in the way.

SVITECH Foundation organizes free health camps offering essential medical services and health education, alongside awareness campaigns in underserved communities.

Volunteers also help eligible beneficiaries enrol under Ayushman Bharat–Pradhan Mantri Jan Arogya Yojana (PM-JAY): document verification, digital registration, and clear guidance on benefits—so healthcare is not only explained, but reachable.`,
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-05-28",
  },
  {
    slug: "digital-skills-to-employment",
    title: "From digital skills to employment",
    excerpt:
      "IT, office applications, digital marketing, and entrepreneurship training that links learning to livelihood pathways.",
    body: `Digital empowerment means job-ready skills—not just awareness.

SVITECH Foundation’s digital skills programmes cover IT fundamentals, office applications, digital marketing, and entrepreneurship. Training prepares underprivileged youth and women for roles in local SMEs and emerging digital sectors.

Capacity-building continues through digital skills centres and community sessions—so participants leave with practical skills and clearer pathways to employment and entrepreneurship.`,
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-04-22",
  },
];
