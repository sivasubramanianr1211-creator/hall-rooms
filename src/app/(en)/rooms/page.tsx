import Rooms, { roomsMetadata } from "@/views/Rooms";

export const metadata = roomsMetadata("en");

export default function Page() {
  return <Rooms lang="en" />;
}
