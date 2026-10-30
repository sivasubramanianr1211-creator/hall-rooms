import About, { aboutMetadata } from "@/views/About";

export const metadata = aboutMetadata("en");

export default function Page() {
  return <About lang="en" />;
}
