// Photos, video, the About story and testimonials. Put image files in
// public/images/ and list them here. Text fields take { en, ta }.

import type { Text } from "@/lib/i18n";

export type Photo = { src: string; alt: string };

// Empty categories are hidden on the live site.
export const gallery: { id: string; title: Text; photos: Photo[] }[] = [
  {
    id: "exterior",
    title: { en: "Exterior", ta: "வெளிப்புறம்" },
    photos: [
      { src: "/images/exterior.jpg", alt: "Raja Valampuri Hall & Stay signboard and entrance at sunset" },
      { src: "/images/building.jpg", alt: "Guest room block with a long veranda and garden" },
      { src: "/images/veranda.jpg", alt: "Covered veranda outside the guest rooms" },
      { src: "/images/entrance.jpg", alt: "Entrance with potted plants and a carved wooden door" },
      { src: "/images/pergola.jpg", alt: "Building front with a pergola walkway" },
      { src: "/images/garden.jpg", alt: "Lawn and garden around the building" },
    ],
  },
  { id: "reception", title: { en: "Reception", ta: "வரவேற்பறை" }, photos: [] },
  {
    id: "rooms",
    title: { en: "Rooms", ta: "அறைகள்" },
    photos: [
      { src: "/images/room-1.jpg", alt: "Guest room with double bed, TV unit and dressing mirror" },
      { src: "/images/room-2.jpg", alt: "Guest room with double bed and wardrobe" },
      { src: "/images/room-3.jpg", alt: "Guest room with marble floor and TV unit" },
      { src: "/images/room-4.jpg", alt: "Guest room with wardrobe and side table" },
      { src: "/images/bathroom.jpg", alt: "Attached bathroom with shower" },
    ],
  },
  { id: "hall", title: { en: "Hall", ta: "மண்டபம்" }, photos: [] },
  { id: "hall-decorated", title: { en: "Hall, decorated", ta: "அலங்கரிக்கப்பட்ட மண்டபம்" }, photos: [] },
  { id: "dining", title: { en: "Dining area", ta: "உணவுக் கூடம்" }, photos: [] },
  { id: "parking", title: { en: "Parking", ta: "வாகன நிறுத்துமிடம்" }, photos: [] },
  // Only add photos from past weddings with the family's consent.
  { id: "events", title: { en: "Past celebrations", ta: "நடந்த விழாக்கள்" }, photos: [] },
];

export const video = {
  youtubeId: "", // the part after watch?v= in a YouTube link
  title: { en: "Walkthrough of Raja Valampuri Hall & Rooms", ta: "ராஜா வலம்புரி மண்டபம் & அறைகள் — சுற்றுப்பார்வை" } as Text,
};

export const about = {
  story: [] as Text[], // one entry per paragraph
  ownerName: { en: "", ta: "" } as Text,
  ownerRole: { en: "", ta: "" } as Text, // e.g. { en: "Founder", ta: "நிறுவனர்" }
  ownerMessage: { en: "", ta: "" } as Text,
  ownerPhoto: "",
};

// Real reviews only, and only with the person's consent to publish their name.
// Shown as written, in whichever language the guest used.
export const testimonials: {
  name: string;
  event: string; // e.g. "Wedding, March 2026"
  text: string;
  rating: number | null; // 1–5
  source: "Google" | "Direct";
  consent: boolean;
}[] = [];
