// Business basics. Leave a field empty ("" / null / []) until it is confirmed:
// empty fields are hidden on the live site and shown as "To add" in `npm run dev`.
// Text fields take { en, ta }; an empty `ta` falls back to English.

import { tx, type Locale, type Text } from "@/lib/i18n";

export const business = {
  brandName: { en: "Raja Valamburi", ta: "ராஜா வலம்புரி" } as Text,
  fullName: { en: "Raja Valamburi Hall & Rooms", ta: "ராஜா வலம்புரி மண்டபம் & அறைகள்" } as Text,
  legalName: "", // name on GST / licences, if different from the brand
  tagline: { en: "Hall & Rooms", ta: "மண்டபம் & அறைகள்" } as Text,
  logo: "/brand/logo-horizontal.svg", // header logo; all versions are in public/brand/
  established: null as number | null, // year

  address: {
    line1: { en: "", ta: "" } as Text,
    line2: { en: "", ta: "" } as Text,
    city: { en: "", ta: "" } as Text,
    district: { en: "Sivaganga", ta: "சிவகங்கை" } as Text,
    state: { en: "Tamil Nadu", ta: "தமிழ்நாடு" } as Text,
    pin: "",
  },
  geo: { lat: 10.1055927, lng: 78.7052155 },
  mapsUrl:
    "https://www.google.com/maps/place//@10.1055927,78.7026406,936m/data=!3m1!1e3!4m6!1m5!3m4!2zMTDCsDA2JzIwLjEiTiA3OMKwNDInMTguOCJF!8m2!3d10.1055927!4d78.7052155?hl=en&entry=ttu&g_ep=EgoyMDI2MTAyNy4wIKXMDSoASAFQAw%3D%3D",
  mapsEmbedUrl: "https://maps.google.com/maps?q=10.1055927,78.7052155&z=15&output=embed",
  landmarks: [] as Text[], // e.g. { en: "Opposite the bus stand", ta: "பேருந்து நிலையம் எதிரில்" }
  // Road distance from the venue. null = not confirmed yet.
  distances: [
    { place: { en: "Kundrakudi bus stand", ta: "குன்றக்குடி பேருந்து நிலையம்" }, km: 1.4 },
    { place: { en: "Kundrakudi Murugan temple", ta: "குன்றக்குடி முருகன் கோயில்" }, km: 1.8 },
    { place: { en: "Pillayarpatti", ta: "பிள்ளையார்பட்டி" }, km: 4 },
    { place: { en: "Karaikudi", ta: "காரைக்குடி" }, km: 7 },
    { place: { en: "Karaikudi railway station", ta: "காரைக்குடி ரயில் நிலையம்" }, km: null },
    { place: { en: "Nearest airport", ta: "அருகிலுள்ள விமான நிலையம்" }, km: null },
  ] as { place: Text; km: number | null }[],

  phone: "", // e.g. "+91 98765 43210"
  whatsapp: "", // digits with country code, e.g. "919876543210"
  email: "",
  contacts: [] as { name: Text; role: Text; phone: string }[], // booking / enquiry people

  gstin: "",
  licences: [] as { name: Text; number: string }[], // e.g. trade licence, FSSAI

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  googleBusinessUrl: "",
  googleReviewsUrl: "", // link that opens "Write a review"
};

export function fullAddress(lang: Locale) {
  const a = business.address;
  const state = tx(a.state, lang);
  return [tx(a.line1, lang), tx(a.line2, lang), tx(a.city, lang), tx(a.district, lang), [state, a.pin].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}
