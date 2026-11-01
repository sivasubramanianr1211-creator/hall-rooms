import Image from "next/image";

// Order matters: the first photo is the one shown when motion is reduced.
// Timing must match the 21s cycle in globals.css (3 photos x 7s).
// `position` keeps the important part in view when the photo is cropped.
const photos = [
  {
    src: "/images/exterior.jpg",
    alt: "Raja Valampuri Hall & Rooms entrance and sign at dusk",
    position: "object-[80%_center]", // the sign is on the right
  },
  { src: "/images/room.jpg", alt: "Guest room with king bed, sofa and TV", position: "object-center" },
  { src: "/images/suite.jpg", alt: "Guest room with seating area", position: "object-center" },
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
      {/* Darken the left side so the headline stays readable */}
      <div className="absolute inset-0 bg-linear-to-r from-ink-950/95 via-ink-950/70 to-ink-950/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink-950 to-transparent" />
    </div>
  );
}
