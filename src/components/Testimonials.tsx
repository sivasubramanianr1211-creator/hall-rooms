import { business } from "@/content/business";
import { testimonials } from "@/content/media";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { Card, Missing, Section, showMissing } from "./ui";

export default function Testimonials({ lang, alt }: { lang: Locale; alt?: boolean }) {
  const t = dict(lang).testimonials;
  const shown = testimonials.filter((r) => r.consent);
  if (shown.length === 0 && !showMissing) return null;

  return (
    <Section title={t.title} alt={alt}>
      {shown.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {shown.map((r) => (
            <Card key={r.name + r.event}>
              {r.rating != null && (
                <p className="text-gold-400" aria-label={`${r.rating}/5`}>
                  {"★".repeat(r.rating)}
                  <span className="text-gold-500/30">{"★".repeat(5 - r.rating)}</span>
                </p>
              )}
              <blockquote className="mt-3 leading-relaxed text-gold-200/85">“{r.text}”</blockquote>
              <p className="mt-4 text-sm text-gold-300">
                {r.name}
                {r.event && <span className="text-gold-200/50"> · {r.event}</span>}
                {r.source === "Google" && <span className="text-gold-200/50"> · {t.googleReview}</span>}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <Missing>testimonials or Google reviews, with consent</Missing>
      )}
      {business.googleReviewsUrl && (
        <a
          href={business.googleReviewsUrl}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-block text-gold-300 underline underline-offset-4"
        >
          {t.googleLink}
        </a>
      )}
    </Section>
  );
}
