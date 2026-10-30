// Photos, video, the About story and testimonials. Put image files in
// public/images/ and list them here. Text fields take { en, ta }.

import type { Text } from "@/lib/i18n";

export type Photo = { src: string; alt: string };

// Empty categories are hidden on the live site.
export const gallery: { id: string; title: Text; photos: Photo[] }[] = [
  {
    id: "exterior",
    title: { en: "Exterior", ta: "வெளிப்புறம்" },
    photos: [{ src: "/images/exterior.jpg", alt: "Entrance and sign at dusk" }],
  },
  { id: "reception", title: { en: "Reception", ta: "வரவேற்பறை" }, photos: [] },
  {
    id: "rooms",
    title: { en: "Rooms", ta: "அறைகள்" },
    photos: [
      { src: "/images/room.jpg", alt: "Guest room with king bed, sofa and TV" },
      { src: "/images/suite.jpg", alt: "Guest room seating area" },
      { src: "/images/bathroom.jpg", alt: "Attached bathroom with shower and geyser" },
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
  title: { en: "Walkthrough of Raja Valamburi Hall & Rooms", ta: "ராஜா வலம்புரி மண்டபம் & அறைகள் — சுற்றுப்பார்வை" } as Text,
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
