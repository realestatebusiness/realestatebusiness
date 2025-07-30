// src/data/navMenus.ts
export interface MegaMenuColumn {
  heading: string;
  items: { label: string; href?: string }[];
}

export interface MegaMenuSideCategory {
  label: string;
  href?: string;
  badge?: string;
}

export interface MegaMenuDefinition {
  id: string;
  sideCategories: MegaMenuSideCategory[];
  columns: MegaMenuColumn[];
  promo?: {
    title: string;
    heading: string;
    points: string[];
    href?: string;
  };
  contact?: {
    phone: string;
    hours?: string;
  };
}

/* ---------- BUYERS ---------- */
export const buyersMegaMenu: MegaMenuDefinition = {
  id: "buyers",
  sideCategories: [
    { label: "BUY A HOME", href: "#" },
    { label: "Land/Plot", href: "#" },
    { label: "COMMERCIAL", href: "#" },
    { label: "POPULAR AREAS", href: "#" },
    { label: "INSIGHTS", href: "#", badge: "NEW" },
    { label: "ARTICLES & NEWS", href: "#" },
  ],
  columns: [
    {
      heading: "PROPERTIES IN HYDERABAD",
      items: [
        { label: "Flats" },
        { label: "Builder Floors" },
        { label: "Independent House" },
        { label: "Plots in Hyderabad" },
        { label: "Serviced Apartments" },
        { label: "Studio Apartments/1 RK Flats" },
        { label: "Farm Houses" },
      ],
    },
    {
      heading: "POPULAR SEARCHES",
      items: [
        { label: "Property in Hyderabad" },
        { label: "Verified Property in Hyderabad" },
        { label: "New Projects in Hyderabad" },
      ],
    },
  ],
  promo: {
    title: "INTRODUCING",
    heading: "Insights",
    points: [
      "Understand localities",
      "Read Resident Reviews",
      "Check Price Trends",
      "Tools, Utilities & more",
    ],
    href: "#",
  },
  contact: {
    phone: "1800 41 99099",
    hours: "(9AM-11PM IST)",
  },
};

/* ---------- TENANTS ---------- */
export const tenantsMegaMenu: MegaMenuDefinition = {
  id: "tenants",
  sideCategories: [
    { label: "RENT A HOME", href: "#" },
    { label: "PG/CO-LIVING", href: "#" },
    { label: "COMMERCIAL", href: "#" },
    { label: "POPULAR AREAS", href: "#" },
    { label: "INSIGHTS", href: "#", badge: "NEW" },
    { label: "ARTICLES & NEWS", href: "#" },
  ],
  columns: [
    {
      heading: "PROPERTIES IN HYDERABAD",
      items: [
        { label: "Flats" },
        { label: "Builder Floors" },
        { label: "Independent House" },
        { label: "Serviced Apartments" },
        { label: "Studio Apartments/1 RK Flats" },
        { label: "Farm Houses" },
      ],
    },
    {
      heading: "POPULAR SEARCHES",
      items: [
        { label: "Property for rent in Hyderabad" },
        { label: "Verified Property in Hyderabad" },
      ],
    },
  ],
  promo: {
    title: "INTRODUCING",
    heading: "Insights",
    points: [
      "Understand localities",
      "Read Resident Reviews",
      "Check Price Trends",
      "Tools, Utilities & more",
    ],
    href: "#",
  },
  contact: {
    phone: "1800 41 99099",
    hours: "(9AM-11PM IST)",
  },
};

export const ownersMegaMenu: MegaMenuDefinition & {
  rightImage?: { src: string; alt: string };
} = {
  id: "owners",
  sideCategories: [
    { label: "OWNER OFFERINGS", href: "#" },
    { label: "INSIGHTS", href: "#", badge: "NEW" },
    { label: "ARTICLES & NEWS", href: "#" },
  ],
  columns: [
    {
      heading: "OWNER OFFERINGS",
      items: [
        { label: "Post Property for Free", href: "#" },
        { label: "Owner Services", href: "#" },
        { label: "My99acres", href: "#" },
        { label: "View Responses", href: "#" },
      ],
    },
  ],
  rightImage: {
    src: "/images/owner-services.jpg", // ✅ Replace with your image path
    alt: "Owners Image",
  },
  contact: {
    phone: "1800 41 99099",
    hours: "(9AM-11PM IST)",
  },
};
