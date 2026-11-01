import {
  anyFilled,
  Card,
  Chips,
  DraftBadge,
  Facts,
  Missing,
  SectionIntro,
  PhotoGrid,
  published,
  Section,
  showMissing,
} from "@/components/ui";
import { eventParking, eventTypes, halls, packages, payment, slots, vendors } from "@/content/hall";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";
import { inr } from "@/lib/site";

export default function Hall({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const h = t.hall;
  const shownSlots = published(slots);
  const shownPackages = published(packages);
  const shownEvents = published(eventTypes);
  const vendorFilled = anyFilled(vendors.inHouse, vendors.outsideAllowed, vendors.outsideCharge);

  return (
    <section id="hall">
      <SectionIntro eyebrow={h.eyebrow} title={h.title} intro={h.intro} />

      {halls
        .filter((hall) => showMissing || anyFilled(...Object.values({ ...hall, name: null })))
        .map((hall, i) => (
          <Section key={tx(hall.name, "en")} title={tx(hall.name, lang)} alt={i % 2 === 1}>
            {hall.photos.length > 0 ? (
              <PhotoGrid photos={hall.photos} />
            ) : (
              <Missing>hall photos, empty and decorated</Missing>
            )}
            <div className="mt-8">
              <Facts
                items={[
                  [h.type, hall.ac == null ? null : hall.ac ? h.airConditioned : h.nonAc],
                  [h.seating, hall.seating],
                  [h.floating, hall.floating],
                  [h.dining, hall.diningCapacity],
                  [h.stage, tx(hall.stage, lang)],
                  [h.diningArea, tx(hall.diningArea, lang)],
                  [h.kitchen, tx(hall.kitchenAccess, lang)],
                  [h.brideGroom, tx(hall.brideGroomRooms, lang)],
                  [h.roomsIncluded, hall.bundledRooms],
                ]}
              />
            </div>
          </Section>
        ))}

      {shownEvents.length > 0 && (
        <Section title={h.events} alt>
          <Chips
            items={shownEvents.map((e) => (
              <>
                {tx(e.name, lang)}
                <DraftBadge draft={e.draft} />
              </>
            ))}
          />
        </Section>
      )}

      {shownSlots.length > 0 && (
        <Section title={h.slots}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-md text-left">
              <thead className="text-xs tracking-widest text-gold-400 uppercase">
                <tr className="border-b border-gold-500/25">
                  <th className="py-3 pr-4 font-normal">{h.slot}</th>
                  <th className="py-3 pr-4 font-normal">{h.timing}</th>
                  <th className="py-3 font-normal">{h.price}</th>
                </tr>
              </thead>
              <tbody className="text-gold-200">
                {shownSlots.map((slot) => (
                  <tr key={tx(slot.name, "en")} className="border-b border-gold-500/15">
                    <td className="py-3 pr-4">
                      {tx(slot.name, lang)}
                      <DraftBadge draft={slot.draft} />
                    </td>
                    <td className="py-3 pr-4">{slot.time || <Missing>timing</Missing>}</td>
                    <td className="py-3">{inr(slot.price) ?? t.common.onRequest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {shownPackages.length > 0 && (
        <Section title={h.packages} alt>
          <div className="grid gap-6 md:grid-cols-3">
            {shownPackages.map((pkg) => (
              <Card key={tx(pkg.name, "en")}>
                <h3 className="font-display text-xl text-gold-300">
                  {tx(pkg.name, lang)}
                  <DraftBadge draft={pkg.draft} />
                </h3>
                {pkg.includes.length > 0 && (
                  <ul className="mt-4 space-y-1 text-gold-200/80">
                    {pkg.includes.map((item) => (
                      <li key={tx(item, "en")}>· {tx(item, lang)}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-5 font-display text-2xl text-gold-200">{inr(pkg.price) ?? t.common.onRequest}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {(vendorFilled || showMissing) && (
        <Section title={h.vendors}>
          <Facts
            items={[
              [h.inHouse, vendors.inHouse.map((v) => tx(v, lang)).join(", ")],
              [h.outside, vendors.outsideAllowed == null ? null : vendors.outsideAllowed ? h.allowed : h.notAllowed],
              [h.outsideCharge, tx(vendors.outsideCharge, lang)],
            ]}
          />
        </Section>
      )}

      {(showMissing || anyFilled(...Object.values(payment), ...Object.values(eventParking))) && (
        <Section title={h.payment} alt>
          <Facts
            items={[
              [h.advance, tx(payment.advance, lang)],
              [h.schedule, tx(payment.schedule, lang)],
              [h.cancellation, tx(payment.cancellation, lang)],
              [h.electricity, tx(payment.electricity, lang)],
              [h.generator, tx(payment.generator, lang)],
              [h.cleaning, tx(payment.cleaning, lang)],
              [h.carParking, eventParking.cars == null ? null : h.cars(eventParking.cars)],
              [h.twoWheelerParking, eventParking.twoWheelers == null ? null : h.twoWheelers(eventParking.twoWheelers)],
            ]}
          />
        </Section>
      )}

    </section>
  );
}
