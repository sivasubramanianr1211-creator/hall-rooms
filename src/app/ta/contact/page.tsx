import Contact, { contactMetadata } from "@/views/Contact";

export const metadata = contactMetadata("ta");

export default function Page() {
  return <Contact lang="ta" />;
}
