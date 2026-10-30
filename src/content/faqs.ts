// Questions with an empty answer are hidden on the live site. Answered ones are
// also published to Google as FAQ structured data. An empty Tamil answer falls
// back to English.

import type { Text } from "@/lib/i18n";

const blank = { en: "", ta: "" };

export const faqs: { q: Text; a: Text }[] = [
  { q: { en: "How many guests can the hall hold?", ta: "மண்டபத்தில் எத்தனை விருந்தினர்கள் அமரலாம்?" }, a: blank },
  { q: { en: "Is the hall air-conditioned?", ta: "மண்டபம் குளிரூட்டப்பட்டதா (ஏசி)?" }, a: blank },
  {
    q: { en: "Are rooms included with a hall booking?", ta: "மண்டப முன்பதிவுடன் அறைகள் வழங்கப்படுமா?" },
    a: blank,
  },
  {
    q: {
      en: "Can we bring our own caterer or decorator?",
      ta: "எங்கள் சொந்த சமையல்காரர் அல்லது அலங்காரக் குழுவை அழைத்து வரலாமா?",
    },
    a: blank,
  },
  {
    q: { en: "How much advance is needed to book a date?", ta: "தேதியை முன்பதிவு செய்ய எவ்வளவு முன்பணம் தேவை?" },
    a: blank,
  },
  { q: { en: "What is the cancellation policy?", ta: "ரத்து செய்யும் விதிமுறை என்ன?" }, a: blank },
  { q: { en: "Is there power backup?", ta: "மின் தடை காப்பு (ஜெனரேட்டர்) உள்ளதா?" }, a: blank },
  { q: { en: "How many cars can park?", ta: "எத்தனை கார்களை நிறுத்தலாம்?" }, a: blank },
  {
    q: { en: "What are the check-in and check-out times?", ta: "செக்-இன் மற்றும் செக்-அவுட் நேரம் என்ன?" },
    a: blank,
  },
  { q: { en: "What ID do guests need to check in?", ta: "செக்-இன் செய்ய என்ன அடையாளச் சான்று தேவை?" }, a: blank },
  {
    q: { en: "Where are you located?", ta: "நீங்கள் எங்கே அமைந்துள்ளீர்கள்?" },
    a: {
      en: "Near Kundrakudi: 1.4 km from Kundrakudi bus stand, 1.8 km from Kundrakudi Murugan temple, 4 km from Pillayarpatti and 7 km from Karaikudi.",
      ta: "குன்றக்குடி அருகே: குன்றக்குடி பேருந்து நிலையத்திலிருந்து 1.4 கி.மீ, குன்றக்குடி முருகன் கோயிலிலிருந்து 1.8 கி.மீ, பிள்ளையார்பட்டியிலிருந்து 4 கி.மீ, காரைக்குடியிலிருந்து 7 கி.மீ.",
    },
  },
];
