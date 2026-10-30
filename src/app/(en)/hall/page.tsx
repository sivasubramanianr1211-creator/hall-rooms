import Hall, { hallMetadata } from "@/views/Hall";

export const metadata = hallMetadata("en");

export default function Page() {
  return <Hall lang="en" />;
}
