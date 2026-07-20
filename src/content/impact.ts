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
 * Achievements mapped to states where SVITECH Foundation conducted activities:
 * Maharashtra, Delhi, Gujarat, Haryana, Uttar Pradesh.
 * Metrics are qualitative programme labels—not fabricated headcount statistics.
 */
export const impactStories: ImpactStory[] = [
  {
    slug: "maharashtra-financial-digital-inclusion",
    title: "Financial and Digital Inclusion",
    location: "Mumbai, Maharashtra",
    lat: 19.076,
    lng: 72.8777,
    metricLabel: "Flagship focus",
    metricValue: "Inclusion",
    summary:
      "Flagship work on digital banking, UPI safety, financial planning, and citizen digital services in Mumbai suburbs including Mankhurd, Govandi, Malad, and Ghatkopar.",
    body: `In Maharashtra—particularly Mumbai suburbs such as Mankhurd, Govandi, Malad, and Ghatkopar—SVITECH Foundation’s flagship Financial and Digital Inclusion programme helps residents use digital tools safely and access public services.

Volunteers and facilitators support awareness sessions on UPI, cyber safety, and budgeting, alongside practical help with digital documentation, online registrations, and government scheme applications.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 1,
  },
  {
    slug: "maharashtra-digital-skills",
    title: "Digital skills & job pathways",
    location: "Pune, Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    metricLabel: "Active programme",
    metricValue: "IT & livelihoods",
    summary:
      "IT and digital skills training for youth and women across Maharashtra, linking learning to employment and entrepreneurship pathways.",
    body: `Digital skills programmes in Maharashtra equip underprivileged youth and women with IT fundamentals, office applications, digital marketing, and entrepreneurship skills.

Training prepares participants for roles in local SMEs and emerging digital sectors, with centres supporting ongoing capacity-building and livelihood pathways.`,
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 2,
  },
  {
    slug: "maharashtra-health-education",
    title: "Health camps & school awareness",
    location: "Mumbai & Pune, Maharashtra",
    lat: 19.2183,
    lng: 72.9781,
    metricLabel: "Activity type",
    metricValue: "Health & schools",
    summary:
      "Free health camps with PM-JAY facilitation and school programmes on digital literacy, life skills, and cyber safety.",
    body: `Health awareness campaigns and camps in Maharashtra provide essential medical services and enrolment support under Ayushman Bharat (PM-JAY).

Educational support programmes add digital literacy, financial awareness, life skills, and cyber safety in schools across underserved areas.`,
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 3,
  },
  {
    slug: "delhi-women-community",
    title: "Women empowerment & community workshops",
    location: "New Delhi, Delhi",
    lat: 28.6139,
    lng: 77.209,
    metricLabel: "Focus area",
    metricValue: "Women & community",
    summary:
      "Training for women on financial independence, digital literacy, welfare schemes, and livelihoods—plus capacity-building for youth and seniors.",
    body: `In Delhi, SVITECH Foundation organised women empowerment initiatives and community awareness workshops covering financial independence, digital literacy, government welfare schemes, health awareness, and livelihood opportunities.

Interactive sessions also help youth and senior citizens understand digital services, citizen rights, and public welfare benefits.`,
    coverImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 4,
  },
  {
    slug: "gujarat-digital-literacy",
    title: "Digital & financial literacy drives",
    location: "Ahmedabad, Gujarat",
    lat: 23.0225,
    lng: 72.5714,
    metricLabel: "Focus",
    metricValue: "UPI & cyber safety",
    summary:
      "Awareness sessions in schools, colleges, and community centres on digital banking, fraud prevention, budgeting, and safe internet use.",
    body: `In Gujarat, digital and financial literacy programmes educated participants on digital banking, UPI transactions, cyber safety, online fraud prevention, budgeting, savings, and financial planning.

Sessions in Ahmedabad-area schools, colleges, and community centres promoted financial inclusion and digital empowerment among economically weaker and underserved groups.`,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 5,
  },
  {
    slug: "gujarat-community-outreach",
    title: "Community outreach & welfare facilitation",
    location: "Gandhinagar / Ahmedabad, Gujarat",
    lat: 23.2156,
    lng: 72.6369,
    metricLabel: "Outreach",
    metricValue: "Welfare access",
    summary:
      "Need-based outreach identifying local needs and facilitating access to education, healthcare, digital services, and social security benefits.",
    body: `Community outreach in Gujarat helped identify local needs, create awareness about public welfare schemes, and encourage participation in digital services and social security benefits.

Camps and meetings supported citizen-centric digital documentation, scheme applications, and informed decision-making for families who often struggle to navigate government portals alone.`,
    coverImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 6,
  },
  {
    slug: "haryana-road-safety-csr",
    title: "Road safety & CSR volunteering",
    location: "Gurugram, Haryana",
    lat: 28.4595,
    lng: 77.0266,
    metricLabel: "Campaigns",
    metricValue: "Safety + CSR",
    summary:
      "Road safety awareness with schools and local partners, alongside corporate employee volunteering and community service projects.",
    body: `In Haryana—centred on Gurugram—SVITECH Foundation conducted road safety campaigns on traffic rules, pedestrian safety, helmet usage, seat belt compliance, and accident prevention through rallies and school interactions.

Corporate CSR engagement brought employee volunteering, ethics awareness, environmental initiatives, and community service projects that extend programme reach across the NCR belt.`,
    coverImage:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 7,
  },
  {
    slug: "uttar-pradesh-digital-camps",
    title: "Digital service camps & school programmes",
    location: "Lucknow, Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    metricLabel: "Citizen services",
    metricValue: "Aadhaar & e-gov",
    summary:
      "Digital facilitation camps and school awareness sessions helping families complete online registrations and students build digital life skills.",
    body: `In Uttar Pradesh, digital service facilitation camps assisted with digital documentation, online registrations, Aadhaar-linked services, beneficiary enrolment, and government scheme applications—especially for economically weaker sections.

Educational support programmes in schools covered digital literacy, financial awareness, life skills, cyber safety, and responsible technology use through interactive learning.`,
    coverImage:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 8,
  },
];
