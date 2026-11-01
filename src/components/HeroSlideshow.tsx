import Image from "next/image";

// Order matters: the first photo is the one shown when motion is reduced.
// Timing must match the 21s cycle in globals.css (3 photos x 7s).
// `position` keeps the important part in view when the photo is cropped.
const photos = [
  {
    src: "/images/exterior.jpg",
    alt: "Raja Valampuri Hall & Stay signboard and entrance at sunset",
    position: "object-[center_30%]", // keep the signboard in view
  },
  { src: "/images/building.jpg", alt: "Guest room block with a long veranda and garden", position: "object-center" },
  { src: "/images/room-1.jpg", alt: "Guest room with double bed and TV unit", position: "object-center" },
];
const secondsPerPhoto = 7;

export default function HeroSlideshow() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className="hero-slide absolute inset-0"
          // Start 1.5s in so the first photo is already visible on load.
          style={{ animationDelay: `${i * secondsPerPhoto - 1.5}s` }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${photo.position}`}
          />
        </div>
      ))}
      {/* Darken the lower part, where the headline sits; keep the top bright. */}
      <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/70 via-45% to-ink-950/5" />
      <div className="absolute inset-0 bg-linear-to-r from-ink-950/50 to-transparent" />
    </div>
  );
}
