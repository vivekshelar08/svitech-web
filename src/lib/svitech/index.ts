export * from "./identity";
export * from "./impact";
export * from "./programs";
export * from "./partners";
export * from "./media";

export const navPrimary = [
  { label: "Our Work", href: "/work" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
  { label: "Partner", href: "/partner" },
  { label: "Contact", href: "/contact" },
] as const;

export const workMenu = [
  { label: "All practices", href: "/work" },
  { label: "Samriddhi Kendras", href: "/work/samriddhi" },
  { label: "Shiksha Kendra", href: "/work/techshala" },
  { label: "Swasthya Setu", href: "/work/swasthya-setu" },
  { label: "Lok Adhikaar", href: "/work/lok-adhikar" },
  { label: "Mission Ankur", href: "/work/urja-prayas" },
] as const;
