import ClickToLoad from "@/components/ClickToLoad";
import { Missing, SectionIntro, PhotoGrid, Section, showMissing } from "@/components/ui";
import { gallery, video } from "@/content/media";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";

export default function Gallery({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const categories = gallery.filter((c) => c.photos.length > 0 || showMissing);

  return (
    <section id="gallery">
      <SectionIntro eyebrow={t.gallery.eyebrow} title={t.gallery.title} />

      {(video.youtubeId || showMissing) && (
        <Section title={t.gallery.video}>
          {video.youtubeId ? (
            <ClickToLoad
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
              title={tx(video.title, lang)}
              label={t.common.playVideo}
              note={t.common.loadsFromGoogle}
              className="aspect-video"
            />
          ) : (
            <Missing>walkthrough or drone video (YouTube ID in media.ts)</Missing>
          )}
        </Section>
      )}

      {categories.map((category, i) => (
        <Section key={category.id} id={`gallery-${category.id}`} title={tx(category.title, lang)} alt={i % 2 === 0}>
          {category.photos.length > 0 ? (
            <PhotoGrid photos={category.photos} />
          ) : (
            <Missing>{tx(category.title, "en").toLowerCase()} photos</Missing>
          )}
        </Section>
      ))}
    </section>
  );
}
