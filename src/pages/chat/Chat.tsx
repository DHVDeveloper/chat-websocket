"use client";

import { RoomProvider } from "@/context/room/Room.provider";
import { CurrentChat } from "./sections/current-chat/CurrentChat";
import { SideSection } from "./sections/side/chats/SideSection";




export function ChatPage() {
  return (
    <RoomProvider>
      <section className="flex gap-2 w-full h-full">
        <SideSection/>
        <CurrentChat/>
      </section>
    </RoomProvider>
  );
}
