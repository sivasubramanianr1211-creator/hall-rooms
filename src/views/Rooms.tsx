import type { Metadata } from "next";
import Image from "next/image";
import ContactButtons from "@/components/ContactButtons";
import {
  anyFilled,
  Card,
  Chips,
  DraftBadge,
  Facts,
  Missing,
  PageHeader,
  published,
  Section,
  showMissing,
} from "@/components/ui";
import { facilities, policies, roomTypes, stay, tariffNotes } from "@/content/rooms";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { inr } from "@/lib/site";

export function roomsMetadata(lang: Locale): Metadata {
  const d = dict(lang);
  return pageMetadata(lang, "/rooms", d.seo.roomsTitle, d.seo.roomsDescription);
}

export default function Rooms({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const r = t.rooms;
  const rooms = published(roomTypes);
  const available = facilities.filter((f) => f.available);
  const unknown = facilities.filter((f) => f.available == null);
  const shownPolicies = policies.filter((p) => tx(p.text, lang) || showMissing);

  return (
    <main>
      <PageHeader eyebrow={r.eyebrow} title={r.title} intro={r.intro} />

      <Section>
        <div className="grid gap-8">
          {rooms.map((room, i) => (
            <Card key={tx(room.name, "en")} className="grid gap-6 overflow-hidden p-0 md:grid-cols-[2fr_3fr]">
              <div className="relative min-h-60 bg-ink-800">
                {room.photos[0] ? (
                  <Image
                    src={room.photos[0].src}
                    alt={room.photos[0].alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6">
                    <Missing>photos of this room</Missing>
                  </div>
                )}
              </div>
              <div className="p-6 md:pl-0">
                <h2 className="font-display text-2xl text-gold-300">
                  {tx(room.name, lang)}
                  <DraftBadge draft={room.draft} />
                </h2>
                {tx(room.description, lang) && <p className="mt-2 text-gold-200/75">{tx(room.description, lang)}</p>}
                <div className="mt-5">
                  <Facts
                    items={[
                      [r.type, room.ac == null ? null : room.ac ? r.ac : r.nonAc],
                      [r.count, room.count],
                      [r.size, tx(room.size, lang)],
                      [r.bed, tx(room.bed, lang)],
                      [r.maxGuests, room.maxGuests],
                    ]}
                  />
                </div>
                <div className="mt-5">
                  {room.amenities.length > 0 ? (
                    <Chips items={room.amenities.map((a) => tx(a, lang))} />
                  ) : (
                    <Missing>amenities</Missing>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-8">
                  <div>
                    <p className="text-xs tracking-widest text-gold-400 uppercase">{r.weekday}</p>
                    <p className="mt-1 font-display text-2xl text-gold-200">{inr(room.weekday) ?? t.common.onRequest}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-gold-400 uppercase">{r.weekend}</p>
                    <p className="mt-1 font-display text-2xl text-gold-200">{inr(room.weekend) ?? t.common.onRequest}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {(showMissing || anyFilled(...Object.values(tariffNotes), ...Object.values(stay))) && (
        <Section title={r.tariffTitle} alt>
          <Facts
            items={[
              [r.checkIn, stay.checkIn],
              [r.checkOut, stay.checkOut],
              [r.earlyLate, tx(stay.earlyLate, lang)],
              [r.seasonal, tx(tariffNotes.seasonal, lang)],
              [r.extraBed, inr(tariffNotes.extraBed)],
              [r.children, tx(tariffNotes.children, lang)],
              [r.taxes, tx(tariffNotes.taxes, lang)],
            ]}
          />
        </Section>
      )}

      {(available.length > 0 || showMissing) && (
        <Section title={r.facilities}>
          {available.length > 0 && <Chips items={available.map((f) => tx(f.name, lang))} />}
          {showMissing && unknown.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {unknown.map((f) => (
                <Missing key={tx(f.name, "en")}>{tx(f.name, "en")}? (yes / no)</Missing>
              ))}
            </div>
          )}
        </Section>
      )}

      {shownPolicies.length > 0 && (
        <Section title={r.policies} alt>
          <dl className="grid gap-6 sm:grid-cols-2">
            {shownPolicies.map((p) => (
              <div key={tx(p.title, "en")}>
                <dt className="font-display text-lg text-gold-300">{tx(p.title, lang)}</dt>
                <dd className="mt-1 leading-relaxed text-gold-200/75">
                  {tx(p.text, lang) || <Missing>{tx(p.title, "en").toLowerCase()} policy</Missing>}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section title={r.book}>
        <ContactButtons lang={lang} message={t.whatsapp.room} />
      </Section>
    </main>
  );
}
