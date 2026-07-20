import type { ProgramCategoryId } from "@/lib/program-categories";

export type Program = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  body: string;
  coverImage?: string;
  category: ProgramCategoryId;
  sortOrder: number;
};

export const programs: Program[] = [
  {
    slug: "financial-digital-inclusion",
    category: "digital",
    name: "Financial and Digital Inclusion",
    summary:
      "Flagship programme promoting digital banking, UPI literacy, cyber safety, financial planning, and access to citizen digital services for underserved communities.",
    detail: "Awareness sessions, skills pathways, and community facilitation across Mumbai and Maharashtra.",
    body: `Financial and Digital Inclusion is SVITECH Foundation’s flagship programme—helping economically weaker and underserved communities participate confidently in the digital economy and access public services.

The programme combines awareness and capacity building on digital banking, UPI transactions, cyber safety, online fraud prevention, budgeting, savings, and financial planning with hands-on facilitation for digital documentation, online registrations, and government scheme applications.

Work is delivered through schools, colleges, community centres, residential communities, and neighbourhood support points in Mumbai suburbs such as Mankhurd, Govandi, Malad, and Ghatkopar—so families gain both literacy and practical access.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 1,
  },
  {
    slug: "digital-skills-training",
    category: "digital",
    name: "Digital Skills Training",
    summary:
      "IT, computer applications, and digital entrepreneurship training for underprivileged youth and women—building pathways to livelihoods.",
    detail: "Programmes covering IT fundamentals, office applications, digital marketing, and entrepreneurship.",
    body: `SVITECH Foundation delivers comprehensive training in IT fundamentals, advanced office applications, digital marketing, and digital entrepreneurship.

Training prepares underprivileged youth and women for roles in local SMEs and emerging digital sectors, linking learning to employment and entrepreneurship pathways. Capacity-building work continues through digital skills centres and community-based sessions.`,
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 2,
  },
  {
    slug: "digital-financial-literacy",
    category: "digital",
    name: "Digital & Financial Literacy",
    summary:
      "Awareness sessions on digital banking, UPI, cyber safety, budgeting, and financial planning for schools, colleges, and communities.",
    detail: "Conducted in schools, colleges, community centres, and residential communities.",
    body: `The Foundation conducts digital and financial literacy awareness sessions in schools, colleges, community centres, and residential communities.

Participants are educated on digital banking, UPI transactions, cyber safety, online fraud prevention, responsible internet usage, budgeting, savings, and financial planning to promote financial inclusion and digital empowerment.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 3,
  },
  {
    slug: "women-empowerment",
    category: "women",
    name: "Women Empowerment Initiatives",
    summary:
      "Vocational training, financial independence, digital literacy, welfare schemes, and livelihood pathways for women.",
    detail: "Awareness meetings and training on financial independence, digital literacy, and livelihoods.",
    body: `The Foundation organizes awareness meetings and training programmes for women on financial independence, digital literacy, government welfare schemes, health awareness, and livelihood opportunities.

Vocational and skill-development tracks help women become financially independent and contribute to household income. These initiatives aim to strengthen women's participation in social and economic development.`,
    coverImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 4,
  },
  {
    slug: "health-welfare-facilitation",
    category: "health",
    name: "Health Awareness & Welfare Facilitation",
    summary:
      "Health camps, awareness campaigns, and enrolment support for schemes including Ayushman Bharat (PM-JAY).",
    detail: "Health camps, awareness campaigns, and PM-JAY enrolment facilitation.",
    body: `The Foundation organizes free health camps and awareness campaigns in underserved communities, offering essential medical services and health education.

Volunteers also facilitate enrolment under government welfare schemes, including Ayushman Bharat–Pradhan Mantri Jan Arogya Yojana (PM-JAY)—assisting with document verification, digital registration, and guidance on health insurance benefits.`,
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 5,
  },
  {
    slug: "educational-support-schools",
    category: "education",
    name: "Education for All & School Awareness",
    summary:
      "Educational resources for children in underserved areas, plus school sessions on digital literacy, life skills, and cyber safety.",
    detail: "Educational resources for underserved children, plus interactive school awareness sessions.",
    body: `Education for All provides free educational resources and support to children in slum and underserved areas so they can pursue quality learning.

Complementary school awareness sessions focus on digital literacy, financial awareness, life skills, cyber safety, and responsible use of technology—using interactive methods that encourage participation beyond the classroom.`,
    coverImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 6,
  },
  {
    slug: "community-awareness-capacity-building",
    category: "community",
    name: "Community Awareness & Capacity Building",
    summary:
      "Interactive workshops on welfare schemes, digital services, citizen rights, and community participation.",
    detail: "For community members, women, youth, and senior citizens.",
    body: `Awareness meetings and interactive workshops are organized for community members, women, youth, and senior citizens on social welfare schemes, digital services, citizen rights, government initiatives, and community participation.

These programmes encourage informed decision-making and improve access to public welfare benefits.`,
    coverImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 7,
  },
  {
    slug: "digital-service-camps",
    category: "digital",
    name: "Digital Service Facilitation Camps",
    summary:
      "Community camps for digital documentation, online registrations, Aadhaar-linked services, and government scheme applications.",
    detail: "Citizen-centric digital services for economically weaker sections.",
    body: `The Foundation organizes community service camps providing assistance for digital documentation, online registrations, beneficiary enrolment, Aadhaar-linked services, government scheme applications, pensions, rations, subsidies, and other citizen-centric digital services.

Trained volunteers use digital platforms to streamline applications—particularly benefiting economically weaker sections.`,
    coverImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 8,
  },
  {
    slug: "road-safety-awareness",
    category: "csr",
    name: "Road Safety Awareness Campaigns",
    summary:
      "Campaigns on traffic rules, pedestrian safety, helmet usage, seat belt compliance, and accident prevention.",
    detail: "In association with schools, volunteers, and local authorities.",
    body: `Road safety campaigns are conducted in association with schools, volunteers, and local authorities to educate students and the general public on traffic rules, pedestrian safety, helmet usage, seat belt compliance, and accident prevention.

Activities include rallies, awareness drives, and community interactions.`,
    coverImage:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 9,
  },
  {
    slug: "corporate-csr-engagement",
    category: "csr",
    name: "Corporate CSR Engagement",
    summary:
      "Employee volunteering, ethics awareness, environmental initiatives, and social responsibility projects with corporate partners.",
    detail: "CSR collaborations for sustainable community development.",
    body: `The Foundation collaborates with corporate organizations for employee volunteering programmes, ethics awareness sessions, environmental initiatives, community service activities, and social responsibility projects.

These collaborations promote sustainable community development, encourage active employee participation in social causes, and help implement larger-scale programmes for more beneficiaries.`,
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 10,
  },
];
