import type { Metadata } from "next";
import Image from "next/image";
import BookButton from "@/components/BookButton";
import HeroSlideshow from "@/components/HeroSlideshow";
import { Section } from "@/components/ui";
import { business } from "@/content/business";
import { facilities, stay } from "@/content/rooms";
import { dict } from "@/lib/dictionary";
import { localePath, tx, type Locale } from "@/lib/i18n";
import { pageMetadata, siteUrl } from "@/lib/seo";
import About from "./About";
import Contact from "./Contact";
import Faq from "./Faq";
import Gallery from "./Gallery";
import Hall from "./Hall";
import Rooms from "./Rooms";

export function homeMetadata(lang: Locale): Metadata {
  const d = dict(lang);
  return pageMetadata(lang, "/", d.seo.homeTitle, d.seo.homeDescription);
}

export default function Home({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const nearby = business.distances.filter((d) => d.km != null);
  const offers = [
    {
      href: "#hall",
      title: t.home.hallTitle,
      body: t.home.hallBody,
      image: { src: "/images/exterior.jpg", alt: "Raja Valampuri entrance at dusk" },
    },
    {
      href: "#rooms",
      title: t.home.roomsTitle,
      body: t.home.roomsBody,
      image: { src: "/images/room.jpg", alt: "Guest room with king bed" },
    },
  ];

  // Structured data so Google can show the business in search and Maps.
  const a = business.address;
  const sameAs = [...Object.values(business.social), business.googleBusinessUrl].filter(Boolean);
  const amenities = facilities
    .filter((f) => f.available)
    .map((f) => ({ "@type": "LocationFeatureSpecification", name: tx(f.name, lang), value: true }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Hotel", "EventVenue"],
    "@id": `${siteUrl}/#business`,
    name: tx(business.fullName, lang),
    // The signboard spells it "Valamburi", so people may search that way too.
    alternateName: [tx(business.fullName, lang === "en" ? "ta" : "en"), "Raja Valampuri", "Raja Valamburi"],
    description: t.seo.homeDescription,
    url: siteUrl + localePath(lang, "/").replace(/^\/$/, "/"),
    inLanguage: lang,
    logo: `${siteUrl}/brand/logo-icon-1024.png`,
    image: [`${siteUrl}/images/exterior.jpg`, `${siteUrl}/images/room.jpg`, `${siteUrl}/images/suite.jpg`],
    ...(business.phone && { telephone: business.phone }),
    ...(business.email && { email: business.email }),
    address: {
      "@type": "PostalAddress",
      ...(tx(a.line1, lang) && { streetAddress: tx(a.line1, lang) }),
      ...(tx(a.city, lang) && { addressLocality: tx(a.city, lang) }),
      addressRegion: tx(a.state, lang),
      ...(a.pin && { postalCode: a.pin }),
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    ...(business.mapsUrl && { hasMap: business.mapsUrl }),
    areaServed: (lang === "ta" ? ["குன்றக்குடி", "பிள்ளையார்பட்டி", "காரைக்குடி"] : ["Kundrakudi", "Pillayarpatti", "Karaikudi"]).map(
      (name) => ({ "@type": "Place", name }),
    ),
    ...(amenities.length > 0 && { amenityFeature: amenities }),
    ...(stay.checkIn && { checkinTime: stay.checkIn }),
    ...(stay.checkOut && { checkoutTime: stay.checkOut }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  const ta = lang === "ta";

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink-950">
        <HeroSlideshow />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
          <p className="text-sm tracking-[0.25em] text-gold-400 uppercase">
            {tx(business.tagline, lang)}
            {tx(business.address.city, lang) && <> · {tx(business.address.city, lang)}</>}
          </p>
          {/* Tamil words are longer, so the headline is a step smaller. */}
          <h1
            className={`mt-4 max-w-2xl font-display text-gold-200 ${
              ta ? "text-4xl leading-snug sm:text-5xl" : "text-5xl leading-tight sm:text-6xl"
            }`}
          >
            {t.home.heroLine1}
            <br />
            <span className="text-gold-400">{t.home.heroLine2}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gold-200/80">{t.home.heroBody}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BookButton
              href="#contact"
              label={t.common.bookVisit}
              className="rounded-md bg-gold-400 px-7 py-3 font-semibold text-ink-950 shadow-lg shadow-gold-400/20 transition hover:bg-gold-300"
            />
            <a
              href="#hall"
              className="rounded-md border border-gold-400/60 px-7 py-3 font-semibold text-gold-300 transition hover:bg-gold-400/10"
            >
              {t.common.seeHall}
            </a>
            {business.mapsUrl && (
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-md border border-gold-400/60 px-7 py-3 font-semibold text-gold-300 transition hover:bg-gold-400/10"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                {t.common.location}
              </a>
            )}
          </div>
        </div>
      </section>

      <Section title={t.home.offerTitle}>
        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <a
              key={offer.href}
              href={offer.href}
              className="group overflow-hidden rounded-lg border border-gold-500/25 bg-ink-900 transition hover:border-gold-400/60"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={offer.image.src}
                  alt={offer.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-gold-300">{offer.title}</h3>
                <p className="mt-2 leading-relaxed text-gold-200/70">{offer.body}</p>
                <p className="mt-4 text-sm font-semibold text-gold-400">{t.common.viewDetails}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {nearby.length > 0 && (
        <Section title={t.home.nearTitle} intro={t.home.nearBody} alt>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((d) => (
              <li key={tx(d.place, "en")} className="rounded-lg border border-gold-500/25 bg-ink-950 p-5">
                <p className="font-display text-3xl text-gold-300">
                  {d.km} {t.common.km}
                </p>
                <p className="mt-1 text-gold-200/75">{tx(d.place, lang)}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Same order as the menu; each section carries the id the menu links to. */}
      <Hall lang={lang} />
      <Rooms lang={lang} />
      <Gallery lang={lang} />
      <About lang={lang} />
      <Faq lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}
