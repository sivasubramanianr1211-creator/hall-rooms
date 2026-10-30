import About, { aboutMetadata } from "@/views/About";

export const metadata = aboutMetadata("ta");

export default function Page() {
  return <About lang="ta" />;
}
