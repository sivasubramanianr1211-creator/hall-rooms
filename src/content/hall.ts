// Marriage hall / banquet. Same rules as rooms.ts: empty fields are hidden on
// the live site, `draft: true` entries show only in `npm run dev`, and a null
// price shows "On request". Text fields take { en, ta }.

import type { Text } from "@/lib/i18n";
import type { Photo } from "./media";

export type Hall = {
  name: Text;
  ac: boolean | null;
  seating: number | null;
  floating: number | null;
  diningCapacity: number | null; // per batch
  stage: Text; // size and look of the stage
  diningArea: Text;
  kitchenAccess: Text;
  brideGroomRooms: Text; // e.g. "2 AC rooms with attached bathrooms"
  bundledRooms: number | null; // guest rooms included with a hall booking
  photos: Photo[]; // empty and decorated photos go in media.ts gallery too
};

const empty = { en: "", ta: "" };

export const halls: Hall[] = [
  {
    name: { en: "Marriage hall", ta: "திருமண மண்டபம்" },
    ac: null,
    seating: null,
    floating: null,
    diningCapacity: null,
    stage: empty,
    diningArea: empty,
    kitchenAccess: empty,
    brideGroomRooms: empty,
    bundledRooms: null,
    photos: [],
  },
];

export const slots: { name: Text; time: string; price: number | null; draft?: boolean }[] = [
  { name: { en: "Full day", ta: "முழு நாள்" }, time: "", price: null, draft: true },
  { name: { en: "Half day", ta: "அரை நாள்" }, time: "", price: null, draft: true },
  { name: { en: "Morning muhurtham", ta: "காலை முகூர்த்தம்" }, time: "", price: null, draft: true },
  { name: { en: "Evening reception", ta: "மாலை வரவேற்பு" }, time: "", price: null, draft: true },
];

const catering = { en: "Catering", ta: "உணவு ஏற்பாடு" };

export const packages: { name: Text; includes: Text[]; price: number | null; draft?: boolean }[] = [
  { name: { en: "Hall only", ta: "மண்டபம் மட்டும்" }, includes: [], price: null, draft: true },
  { name: { en: "Hall + catering", ta: "மண்டபம் + உணவு" }, includes: [catering], price: null, draft: true },
  {
    name: { en: "Complete wedding", ta: "முழு திருமண ஏற்பாடு" },
    includes: [
      catering,
      { en: "Decoration", ta: "அலங்காரம்" },
      { en: "Sound & light", ta: "ஒலி & ஒளி அமைப்பு" },
      { en: "Photography", ta: "புகைப்படம்" },
    ],
    price: null,
    draft: true,
  },
];

export const vendors = {
  inHouse: [] as Text[], // e.g. [{ en: "Catering", ta: "உணவு ஏற்பாடு" }]
  outsideAllowed: null as boolean | null,
  outsideCharge: empty as Text, // e.g. "₹5,000 per outside caterer"
};

export const eventTypes: { name: Text; draft?: boolean }[] = [
  { name: { en: "Weddings", ta: "திருமணங்கள்" }, draft: true },
  { name: { en: "Engagements", ta: "நிச்சயதார்த்தங்கள்" }, draft: true },
  { name: { en: "Receptions", ta: "வரவேற்பு விழாக்கள்" }, draft: true },
  { name: { en: "Seemantham", ta: "சீமந்தம்" }, draft: true },
  { name: { en: "Birthdays", ta: "பிறந்தநாள் விழாக்கள்" }, draft: true },
  { name: { en: "Corporate events", ta: "நிறுவன நிகழ்ச்சிகள்" }, draft: true },
];

export const payment = {
  advance: empty as Text, // e.g. "25% to block the date"
  schedule: empty as Text, // e.g. "Balance 15 days before the event"
  cancellation: empty as Text,
  electricity: empty as Text, // e.g. "As per meter reading, ₹12 per unit"
  generator: empty as Text,
  cleaning: empty as Text,
};

export const eventParking = {
  cars: null as number | null,
  twoWheelers: null as number | null,
};
