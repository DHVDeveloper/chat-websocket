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




export function ChatPage() {
  const socketProvided = useSocketContext();
  const { user } = useUserContext()
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>()
  const [messages, setMessages] = useState<MessageView[]>([]);
  useEffect(() => {
    receiveMessages();
    socketProvided && socketProvided.socket.emit("joinRoom", "BC5QVX");
  }, []);
  const receiveMessages = () => {
    if (!socketProvided?.socket) return;
    socketProvided.socket.on("newMessage", ({ message, sender, senderSocketId }) => {
      const isOwnMessage = senderSocketId === socketProvided.socket.id;
  
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: isOwnMessage ? "sended" : "received",
          message,
          from: sender,
        },
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
      body: JSON.stringify({ from:user.username, roomCode:selectedRoom, content:textToSend}),
    })
    if(!createMessage) return
    socketProvided?.socket.emit("sendMessage",{ from:user.username, roomCode:selectedRoom, content:textToSend});
  };

  const handleLastMessage = (pos:number) => {
    if(messages.length > pos+1){
      if(messages[pos+1].type !== messages[pos].type) return true
      return false
    }
    return true
  }


  return (
    <RoomProvider>
      <section className="flex gap-2 w-full h-full">
        <SideSection/>
        {selectedRoom ? 
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
          </div>:
          <div className="rounded-2xl flex justify-center items-center overflow-hidden p-4 gap-2 border-[1px] bg-[#121212]  border-custom-border-color w-full text-custom-text-color flex-1">
            <span>Selecciona un chat!</span>
          </div>
        }
      </section>
    </RoomProvider>
  );
}
