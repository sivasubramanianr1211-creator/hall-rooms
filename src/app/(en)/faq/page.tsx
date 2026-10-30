import Faq, { faqMetadata } from "@/views/Faq";

export const metadata = faqMetadata("en");

export default function Page() {
  return <Faq lang="en" />;
}
