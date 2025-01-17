"use client";

import { ChatBodySection } from "@/components/chat/ChatBodySection";
import { InputSection } from "@/components/chat/InputSection";
import { ReceivedMessage } from "@/components/chat/ReceivedMessage";
import { SendedMessage } from "@/components/chat/SendedMessage";
import { SideSection } from "@/components/side-section/SideSection";
import { useSocketContext } from "@/context/socket/Socket.context";
import { useUserContext } from "@/context/user/User.context";
import { useEffect, useState } from "react";
import { RoomButton } from "./components/rooms/RoomButton";
import { UserSection } from "@/components/side-section/UserSection";
import { JoinRoomModal } from "./components/rooms/JoinRoomModal";

type MessageType = "received" | "sended";
interface Message {
  type: MessageType;
  messageText: string;
  sender: string
}

export function ChatPage() {
  const socketProvided = useSocketContext();
  const { user } = useUserContext()
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewRoom, setShowNewRoom] = useState<boolean>(false)
  useEffect(() => {
    receiveMessages();
  }, []);

  const receiveMessages = () => {
    if (!socketProvided?.socket) return;
    socketProvided?.socket.on("server-message", (e) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", messageText: e.message,  sender: e.sender},
      ]);
    });
  };
  const sendMessage = (textToSend: string) => {
    socketProvided?.socket.emit("mensaje", {message: textToSend, sender:user.username});
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "sended", messageText: textToSend,  sender: user.username},
    ]);
  };

  const handleLastMessage = (pos:number) => {
    if(messages.length > pos+1){
      if(messages[pos+1].type !== messages[pos].type) return true
      return false
    }
    return true
  }

  const showCreateRoomModal = (show:boolean) => {
    setShowNewRoom(show)
  }

  return (
    <section className="flex gap-2 w-full h-full">
      <SideSection>
        <RoomButton showCreateRoomModal={showCreateRoomModal} />
        <UserSection />
      </SideSection>
      <div className="flex flex-col gap-2 h-full w-full">
        <ChatBodySection>
          {messages.length > 0 &&
            messages.map((message, iter) =>
              message.type === "received" && message.sender !== user.username ? (
                <ReceivedMessage key={iter} lastMessageSent={handleLastMessage(iter)}>
                  {message.messageText}
                </ReceivedMessage>
              ) : (
                  <SendedMessage key={iter} lastMessageSent={handleLastMessage(iter)} >{message.messageText}</SendedMessage>

              )
            )}
        </ChatBodySection>
        <InputSection sendMessage={sendMessage} />
      </div>
      {showNewRoom && <JoinRoomModal handleIsOpenModal={showCreateRoomModal} isOpen={showNewRoom}/>}
    </section>
  );
}
