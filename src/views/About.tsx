import Image from "next/image";
import Testimonials from "@/components/Testimonials";
import { Missing, SectionIntro, Section, showMissing } from "@/components/ui";
import { business } from "@/content/business";
import { about } from "@/content/media";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";

export default function About({ lang }: { lang: Locale }) {
  const t = dict(lang).about;
  const message = tx(about.ownerMessage, lang);
  const ownerName = tx(about.ownerName, lang);
  const ownerRole = tx(about.ownerRole, lang);

  return (
    <section id="about">
      <SectionIntro
        eyebrow={business.established ? t.since(business.established) : t.eyebrow}
        title={t.title(tx(business.brandName, lang))}
      />

      <Section>
        {about.story.length > 0 ? (
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-gold-200/80">
            {about.story.map((p, i) => (
              <p key={i}>{tx(p, lang)}</p>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Missing>our story (about.story in media.ts)</Missing>
            {!business.established && <Missing>year established</Missing>}
          </div>
        )}
      </Section>

      {(message || showMissing) && (
        <Section title={t.owner} alt>
          {message ? (
            <figure className="grid max-w-4xl gap-8 sm:grid-cols-[10rem_1fr] sm:items-start">
              {about.ownerPhoto && (
                <div className="relative aspect-square w-40 overflow-hidden rounded-full border border-gold-500/40">
                  <Image src={about.ownerPhoto} alt={ownerName} fill sizes="10rem" className="object-cover" />
                </div>
              )}
              <div className={about.ownerPhoto ? "" : "sm:col-span-2"}>
                <blockquote className="font-display text-xl leading-relaxed text-gold-200">“{message}”</blockquote>
                <figcaption className="mt-4 text-gold-300">
                  {ownerName}
                  {ownerRole && <span className="text-gold-200/60">, {ownerRole}</span>}
                </figcaption>
              </div>
            </figure>
          ) : (
            <Missing>owner&apos;s name, photo and message</Missing>
          )}
        </Section>
      )}

      <Testimonials lang={lang} />
    </section>
  );
}
