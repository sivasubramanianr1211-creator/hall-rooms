// Lodge / rooms. Entries marked `draft: true` are suggestions from the
// checklist: they show only in `npm run dev` until you confirm them and remove
// the flag. Prices are in rupees; null shows "On request".
// Text fields take { en, ta }; an empty `ta` falls back to English.

import type { Text } from "@/lib/i18n";
import type { Photo } from "./media";

export type RoomType = {
  name: Text;
  draft?: boolean;
  description: Text;
  count: number | null;
  ac: boolean | null;
  size: Text; // e.g. "220 sq ft"
  bed: Text; // e.g. { en: "1 king bed", ta: "1 கிங் படுக்கை" }
  maxGuests: number | null;
  amenities: Text[];
  weekday: number | null;
  weekend: number | null;
  photos: Photo[];
};

const empty = { en: "", ta: "" };

export const roomTypes: RoomType[] = [
  {
    name: { en: "Deluxe room", ta: "டீலக்ஸ் அறை" },
    description: empty,
    count: null,
    ac: null,
    size: empty,
    bed: empty,
    maxGuests: null,
    // From the photos; add AC, TV, geyser etc. once confirmed.
    amenities: [
      { en: "Double bed", ta: "இரட்டைப் படுக்கை" },
      { en: "Attached bathroom", ta: "இணைந்த குளியலறை" },
      { en: "Wardrobe", ta: "அலமாரி" },
      { en: "Dressing mirror", ta: "அலங்காரக் கண்ணாடி" },
      { en: "Ceiling fan", ta: "மின்விசிறி" },
    ],
    weekday: null,
    weekend: null,
    photos: [
      { src: "/images/room-1.jpg", alt: "Deluxe room with double bed, TV unit and dressing mirror" },
      { src: "/images/room-2.jpg", alt: "Deluxe room with double bed and wardrobe" },
      { src: "/images/bathroom.jpg", alt: "Attached bathroom with shower" },
    ],
  },
  {
    name: { en: "Standard room", ta: "ஸ்டாண்டர்ட் அறை" },
    draft: true,
    description: empty,
    count: null,
    ac: null,
    size: empty,
    bed: empty,
    maxGuests: null,
    amenities: [],
    weekday: null,
    weekend: null,
    photos: [],
  },
  {
    name: { en: "Suite", ta: "சூட் அறை" },
    draft: true,
    description: empty,
    count: null,
    ac: null,
    size: empty,
    bed: empty,
    maxGuests: null,
    amenities: [],
    weekday: null,
    weekend: null,
    photos: [],
  },
];

export const tariffNotes = {
  seasonal: empty as Text, // e.g. "Rates are higher during the wedding season (Thai–Aani)"
  extraBed: null as number | null,
  children: empty as Text, // e.g. "Children under 6 stay free"
  taxes: empty as Text, // e.g. "GST extra as applicable"
};

export const stay = {
  checkIn: "", // e.g. "12:00 PM"
  checkOut: "", // e.g. "11:00 AM"
  earlyLate: empty as Text, // early check-in / late checkout rules
};

// Fill `text` to publish a policy; empty ones are hidden.
export const policies: { title: Text; text: Text }[] = [
  { title: { en: "ID proof", ta: "அடையாளச் சான்று" }, text: empty },
  { title: { en: "Couples", ta: "தம்பதியர்" }, text: empty },
  { title: { en: "Local guests", ta: "உள்ளூர் விருந்தினர்கள்" }, text: empty },
  { title: { en: "Pets", ta: "செல்லப்பிராணிகள்" }, text: empty },
  { title: { en: "Smoking", ta: "புகைபிடித்தல்" }, text: empty },
  { title: { en: "Alcohol", ta: "மது" }, text: empty },
  { title: { en: "Cancellation & refunds", ta: "ரத்து & பணத்திருப்பம்" }, text: empty },
];

// Set `available` to true to show a facility, false to hide it for good.
export const facilities: { name: Text; available: boolean | null }[] = [
  { name: { en: "Car parking", ta: "கார் நிறுத்துமிடம்" }, available: null },
  { name: { en: "Lift", ta: "லிஃப்ட்" }, available: null },
  { name: { en: "Power backup", ta: "மின் தடை காப்பு" }, available: null },
  { name: { en: "Restaurant", ta: "உணவகம்" }, available: null },
  { name: { en: "Room service", ta: "அறை சேவை" }, available: null },
  { name: { en: "Laundry", ta: "சலவை சேவை" }, available: null },
  { name: { en: "CCTV", ta: "CCTV கண்காணிப்பு" }, available: null },
  { name: { en: "24-hour front desk", ta: "24 மணி நேர வரவேற்பு" }, available: null },
  { name: { en: "Wi-Fi", ta: "வை-ஃபை" }, available: null },
];
