import Contact, { contactMetadata } from "@/views/Contact";

export const metadata = contactMetadata("en");

export default function Page() {
  return <Contact lang="en" />;
}
