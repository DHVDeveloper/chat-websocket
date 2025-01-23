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
import { RoomList } from "./components/rooms/RoomList";

type MessageType = "received" | "sended";
interface Message {
  type: MessageType;
  message: string;
  from: string
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
    socketProvided?.socket.on("newMessage", (e) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", message: e.message,  from: e.sender},
      ]);
    });
  };
  const sendMessage = async (textToSend: string) => {
    const createMessage = await fetch("api/message", {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from:user.username, roomCode:"BC5QVX", content:textToSend}),
    })
    if(!createMessage) return
    socketProvided?.socket.emit("sendMessage",{ from:user.username, roomCode:"BC5QVX", content:textToSend});
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "sended", message: textToSend,  from: user.username},
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
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <RoomButton showCreateRoomModal={showCreateRoomModal} />
          <RoomList/>
        </div>
        <UserSection />
      </SideSection>
      <div className="flex flex-col gap-2 h-full w-full">
        <ChatBodySection>
          {messages.length > 0 &&
            messages.map((message, iter) =>
              message.type === "received" && message.from !== user.username ? (
                  <ReceivedMessage senderName={message.from} key={iter} lastMessageSent={handleLastMessage(iter)}>
                    {message.message}
                  </ReceivedMessage>
              ) : (
                  <SendedMessage key={iter} lastMessageSent={handleLastMessage(iter)} >{message.message}</SendedMessage>

              )
            )}
        </ChatBodySection>
        <InputSection sendMessage={sendMessage} />
      </div>
      {showNewRoom && <JoinRoomModal handleIsOpenModal={showCreateRoomModal} isOpen={showNewRoom}/>}
    </section>
  );
}
