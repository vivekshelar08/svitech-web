import { media } from "@/lib/svitech/media";

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
 * Achievement map pins from the foundation profile:
 * MMR E-Seva hubs + multi-state migrant labor corridors.
 */
export const impactStories: ImpactStory[] = [
  {
    slug: "asalpha-eseva",
    title: "Asalpha E-Seva Kendra",
    location: "Ghatkopar West, Mumbai",
    lat: 19.098,
    lng: 72.896,
    metricLabel: "E-Seva hub",
    metricValue: "Full-time",
    summary:
      "Permanent Common Service Center for chawl settlements, transit workers, and domestic labour—PAN, DBT, certificates, and scheme enrollments.",
    body: `Asalpha Kendra is SVITECH’s head-office catchment hub. Dual-screen workstations, STQC biometric devices, and trained women facilitators keep welfare desks open beyond camp days for Ghatkopar West communities.`,
    coverImage: media.welfareCamp,
    sortOrder: 1,
  },
  {
    slug: "vashinaka-hub",
    title: "Vashinaka Hub & TechShala lab",
    location: "Chembur M-Ward, Mumbai",
    lat: 19.045,
    lng: 72.915,
    metricLabel: "Digital lab",
    metricValue: "CBO handover",
    summary:
      "High-density resettlement belt with E-Seva services and the Vashinaka computing lab handed to Adhikaar Mahila Bachat Gat.",
    body: `Vashinaka combines walk-in welfare facilitation with a permanent digital training lab. Ten Dell setups and classroom amenities were transitioned to a registered women’s SHG under formal handover deeds.`,
    coverImage: media.heroDigital,
    sortOrder: 2,
  },
  {
    slug: "vishnu-nagar",
    title: "Vishnu Nagar Kendra",
    location: "Chembur Central, Mumbai",
    lat: 19.052,
    lng: 72.901,
    metricLabel: "Food security",
    metricValue: "PDS audits",
    summary:
      "Dense informal settlements focusing on ration rights, senior welfare, and civic infrastructure follow-ups with BMC wards.",
    body: `Vishnu Nagar anchors food-security audits, drinking-water pipeline escalations, and Community Vigilance Group monitoring across Chembur’s central slum cluster.`,
    coverImage: media.civicMeeting,
    sortOrder: 3,
  },
  {
    slug: "backbay-center",
    title: "Backbay Center",
    location: "South Mumbai coastal belt",
    lat: 18.925,
    lng: 72.823,
    metricLabel: "Coastal hub",
    metricValue: "Full-time",
    summary:
      "Walk-in support for informal coastal communities, port labourers, and migrant families along the South Mumbai belt.",
    body: `Backbay Center extends Samriddhi and TechShala access to port and coastal settlements, pairing documentation desks with Women Learning Center batches.`,
    coverImage: media.mumbaiSkyline,
    sortOrder: 4,
  },
  {
    slug: "maharashtra-corridor",
    title: "Maharashtra industrial corridor",
    location: "MMR · Thane · ports",
    lat: 19.2183,
    lng: 72.9781,
    metricLabel: "Workforce",
    metricValue: "445+ camps",
    summary:
      "Port logistics, construction, and municipal utility workers linked to E-Shram, PMSBY, Jan Dhan, and One Nation One Ration Card.",
    body: `Across Mumbai Metropolitan Region and Thane industrial belts, multi-desk welfare camps and door-to-door enumeration close documentation gaps for unorganized labour.`,
    coverImage: media.factoryCorridor,
    sortOrder: 5,
  },
  {
    slug: "gujarat-corridor",
    title: "Gujarat migrant corridor",
    location: "Chemical & manufacturing belts",
    lat: 23.0225,
    lng: 72.5714,
    metricLabel: "Inter-state",
    metricValue: "Social security",
    summary:
      "Migrant factory and plant labour enrolled into portable UAN/E-Shram benefits and workplace accident insurance.",
    body: `SVITECH’s Gujarat corridor supports SEBI BRSR workforce welfare for contractor staff in chemical, manufacturing, and power-generation zones.`,
    coverImage: media.factoryCorridor,
    sortOrder: 6,
  },
  {
    slug: "delhi-ncr-corridor",
    title: "Delhi NCR corridor",
    location: "Construction & urban works",
    lat: 28.6139,
    lng: 77.209,
    metricLabel: "Inter-state",
    metricValue: "Financial inclusion",
    summary:
      "Daily-wage construction and transit labourers guided into bank accounts, accident cover, and ration portability.",
    body: `In Delhi NCR infrastructure and industrial areas, facilitators open zero-balance accounts and register workers on national unorganized databases.`,
    coverImage: media.welfareCamp,
    sortOrder: 7,
  },
  {
    slug: "haryana-corridor",
    title: "Haryana logistics corridor",
    location: "Warehousing & industrial estates",
    lat: 28.4595,
    lng: 77.0266,
    metricLabel: "Inter-state",
    metricValue: "Labour welfare",
    summary:
      "Warehouse loaders and logistics contract staff linked to statutory entitlements and remittance-ready banking.",
    body: `Haryana warehousing hubs receive the same Samriddhi pipeline—identification, verification, biometric registration, and DBT confirmation.`,
    coverImage: media.factoryCorridor,
    sortOrder: 8,
  },
  {
    slug: "konkan-youth",
    title: "Konkan youth sports & inclusion",
    location: "Coastal Konkan · Karjat",
    lat: 18.9102,
    lng: 73.3233,
    metricLabel: "Inclusion",
    metricValue: "38 trekkers",
    summary:
      "Adaptive Bhivgad Fort trek for visually challenged youth and weekly cricket coaching clinics across Konkan.",
    body: `Urja-Prayas affirmative inclusion pairs corporate volunteers with visually challenged trekkers and equips low-income cricket cohorts with kits and mentorship.`,
    coverImage: media.inclusionTrek,
    sortOrder: 9,
  },
];
