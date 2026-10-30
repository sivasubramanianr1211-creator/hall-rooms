import Gallery, { galleryMetadata } from "@/views/Gallery";

export const metadata = galleryMetadata("en");

export default function Page() {
  return <Gallery lang="en" />;
}
