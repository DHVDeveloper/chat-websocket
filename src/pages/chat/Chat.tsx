"use client";

import { RoomProvider } from "@/context/room/Room.provider";
import { useSocketContext } from "@/context/socket/Socket.context";
import { useUserContext } from "@/context/user/User.context";
import { MessageView } from "@/domain/interfaces/message/message";
import { ChatRoom } from "@/domain/interfaces/room/chatRoom";
import { ChatBodySection } from "@/pages/chat/sections/current-chat/chat/ChatBodySection";
import { InputSection } from "@/pages/chat/sections/current-chat/chat/components/InputSection";
import { ReceivedMessage } from "@/pages/chat/sections/current-chat/chat/components/ReceivedMessage";
import { SendedMessage } from "@/pages/chat/sections/current-chat/chat/components/SendedMessage";
import { useEffect, useState } from "react";
import { SideSection } from "./sections/side/chats/SideSection";
import { CurrentChat } from "./sections/current-chat/CurrentChat";




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
