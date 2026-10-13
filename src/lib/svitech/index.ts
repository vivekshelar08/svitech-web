export * from "./identity";
export * from "./impact";
export * from "./programs";
export * from "./partners";

export const navPrimary = [
  { label: "Our Work", href: "/work" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
  { label: "Partner", href: "/partner" },
  { label: "Contact", href: "/contact" },
] as const;

export const workMenu = [
  { label: "All practices", href: "/work" },
  { label: "Samriddhi", href: "/work/samriddhi" },
  { label: "TechShala", href: "/work/techshala" },
  { label: "Swasthya-Setu", href: "/work/swasthya-setu" },
  { label: "Lok-Adhikar", href: "/work/lok-adhikar" },
  { label: "Urja-Prayas", href: "/work/urja-prayas" },
] as const;
