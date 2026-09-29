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
    body: `A decent first job changes a household. SVITECH’s digital skills work is a three-month Basic Computer Course built from vacancy descriptions sent by local finance firms, retailers, real-estate offices, and other small and medium businesses.

Each job-skills cohort is about 15 learners, on site at the centre. The instructor teaches the idea, the class practises it on a machine, and every student sits a mandatory weekly test. The syllabus covers computer fundamentals, Word, PowerPoint, advanced Excel, basic networking, IT troubleshooting, business email, and spoken English. Learners aiming at accounts roles continue into accounting packages.

Roles the course is built for: computer operator, data-entry operator, call-centre executive, accounts assistant, and back-office executive. Every trainee prepares a CV and practises interviews. Each quarter, firms send openings; the centre typically puts forward three to five candidates per role. The 2024–25 profile describes a first-attempt placement of about 30 percent of a batch. The annual report for September 2023 to March 2024 records 30 placements from 100 trainees.

The computer institute behind this course opened in 2016 and has trained more than 11,000 youth and women. Three digital literacy centres now run in Mumbai. By 2027 the plan is five centres and job-ready skills for 25,000 youth.

Shubham Vidhate, from Ghatkopar, came in earning about ₹2,000 a month as an office boy. Advanced Excel led to a back-office role at HDB Finance and, later, a position at AU Small Finance Bank. Sakshi Shelar, from Asalpha, moved from a part-time computer-operator job to junior MIS executive, then completed a master’s in commerce on her own earnings.`,
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
    body: `Women’s work at SVITECH is a livelihood, not only an awareness session.

Adhikar, run with Tata Power Community Development Trust across FY 2022–23 and FY 2023–24, covered 10 slum areas of Chembur. About 400 women entrepreneurs — Adhikar Mitras — delivered public services through the Chembur Roshni Centre. In FY 2022–23 the programme’s record is about 20,000 households and about 100,000 people reached. The following year, 416 people received named e-government services, and 120 camps registered 8,500 families for the National Scholarship Portal and Ayushman Bharat (PM-JAY).

A separate mobile-literacy track is built for women who already have a phone but cannot safely use it. Peer teachers run half-hour evening sessions in the chawl, in groups of ten or fewer, for 45 days: calls, fraud messages, and a short set of apps for search, services, and payments. Guidance continues on WhatsApp, by phone, and in home visits.

At the Ghatkopar West Skill Development Centre, women also train in tailoring, food processing, electronics repair, and home decoration, beside the computer course.`,
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
    body: `Between October 2023 and January 2024, teams identified more than 30 locations and interviewed heads of household door to door. Project leaders then held focus groups of 15 to 20 families. The usual blockage was a recent move, or identity and address proof that did not match the scheme.

Weekend camps run in schools, community organisations, and local NGOs. The Foundation brings computers, scanners, cameras, and a connection. Volunteers are trained on the e-governance portals before they fill a form. A register for each locality is checked until the service is activated, and the family is told how to use it at the ration shop, school, or local office.

Named places include Aarey Colony, Airoli, Asalpha, Bandra, Borivali, Chandivali, Chembur, Ghansoli, Ghatkopar, Goregaon, Govandi, Mahul, Malad, Mankhurd, Ramabai Colony, Sakinaka, Sion, and Turbhe.

Services completed at these camps include PAN and Aadhaar–PAN linkage, income and domicile certificates, Ayushman Bharat health IDs, e-Shram, senior-citizen certificates, bank accounts, rations, scholarships, water and sanitation connections, and anganwadi or school enrolment. More than 25,000 families have been supported on e-Shram across this wider body of work.`,
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
  {
    slug: "adhikar-women-digital-entrepreneurs",
    category: "women",
    name: "Adhikar — Women Digital Entrepreneurs",
    summary:
      "With Tata Power Community Development Trust: women in Chembur run Common Service Centres, register households, and earn a fee for delivering public services.",
    detail: "FY 2022–24 · 10 slum areas of Chembur · Chembur Roshni Centre.",
    body: `Many Common Service Centres close within months. The women and self-help groups running them lack business practice, and the lane does not yet trust a new kiosk. Adhikar was built to change that.

SVITECH implemented the programme with Tata Power Community Development Trust across FY 2022–23 and FY 2023–24, covering 10 slum areas of Chembur. Women created demand for public services, then delivered them: identity cards, ration cards, and bank accounts. Households were mobilised across more than 30 locations.

In FY 2022–23, Adhikar’s record is about 20,000 households and about 100,000 people reached, with about 400 women entrepreneurs — Adhikar Mitras — working through the Chembur Roshni Centre.

The next year combined camps and centres. 416 people received PAN cards, Aadhaar–PAN linkages, income and domicile certificates, health IDs, e-Shram, senior-citizen certificates, bank accounts, or computer training. Through 120 camps, 8,500 families were registered for the National Scholarship Portal and PM-JAY. A separate note in the 2024–25 profile records 12,304 families reached with up to 15 essential services in 2023–24.

The method was a household baseline on Open Data Kit, training modules for nano-business and e-governance, and mentoring for the 400 entrepreneurs over 24 months. A later profile lists a phase from 12 November 2023 and a follow-on phase in July–August 2024.`,
    coverImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 11,
  },
  {
    slug: "mobile-digital-literacy-women",
    category: "digital",
    name: "Mobile Digital Literacy for Women",
    summary:
      "Forty-five evenings in the chawl: peer-taught phone skills so women can spot fraud, use safe apps, and complete a payment or a government service themselves.",
    detail: "Groups of ten or fewer · half an hour after housework · WhatsApp follow-up.",
    body: `A phone in the house is not the same as a woman who can use it. In the GSMA Mobile Gender Gap Report 2026, India’s gender gap in mobile-internet use narrowed from 33% to 25%, and is still among the widest in that survey. SVITECH’s response is a short, local course — not a device handout.

Women are identified and counselled, then taught by peers who have already finished. Sessions last about half an hour in the late evening, when housework is done, for 45 days. Ten or fewer women sit together in the chawl.

The curriculum is the phone: managing calls, recognising fraudulent calls and messages, and a small set of safe apps for communication, search, basic services, and financial transactions. After the 45 days, guidance continues on WhatsApp, by phone, and through occasional home visits.

The aim is a transaction the woman completes herself.`,
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 12,
  },
  {
    slug: "vocational-skill-centre",
    category: "education",
    name: "Vocational Skill Centre",
    summary:
      "Ghatkopar West centre for tailoring, food processing, electronics repair, and home decoration — beside the computer course, with practising instructors.",
    detail: "Skill Development Centre, Ghatkopar West, Mumbai.",
    body: `Computer skills remain the spine of the Foundation. Women and youth are also asking for trades they can take into a workshop or a small enterprise of their own.

At the Skill Development Centre in Ghatkopar West, instructors teach tailoring and garments, food processing, electronics repair, and home decoration. The President opened these tracks after women entrepreneurs began earning a fee for Common Service Centre work in their own lanes.

Training is hands-on, with people who already practise the trade. The aim is a job in a local business, or the first year of a nano-enterprise. By 2030 the Foundation’s written target is 5,000 women and youth running nano, micro, and small enterprises.`,
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 13,
  },
  {
    slug: "sports-development-ratnagiri",
    category: "community",
    name: "Sports Development",
    summary:
      "Cricket coaching for girls and boys in Ratnagiri district — a 10-day camp where early work and screen time had pushed sport out.",
    detail: "Ten afternoons on a local ground, then a cup for girls’ and boys’ teams.",
    body: `In semi-urban Ratnagiri, fewer girls and boys were getting any chance to play. Households needed income early, and screen time filled what was left. SVITECH took sport on as a programme, not a one-off event.

The team asked which game to start with. Girls and boys both chose cricket. A local ground hosted a 10-day camp, two hours every afternoon. At the end, girls’ and boys’ teams played for a cup.

The objectives are to find young people from underprivileged homes, explain why physical activity matters, and run camps and tournaments they can actually attend.`,
    coverImage:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1600&q=80",
    sortOrder: 14,
  },
];
