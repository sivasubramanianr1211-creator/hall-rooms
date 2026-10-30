import Rooms, { roomsMetadata } from "@/views/Rooms";

export const metadata = roomsMetadata("ta");

export default function Page() {
  return <Rooms lang="ta" />;
}
