import Gallery, { galleryMetadata } from "@/views/Gallery";

export const metadata = galleryMetadata("ta");

export default function Page() {
  return <Gallery lang="ta" />;
}
