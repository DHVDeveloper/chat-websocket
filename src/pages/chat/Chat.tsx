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
import { NewRoomModal } from "./components/rooms/NewRoomModal";
import { roomService } from "@/services/room/roomService";
import { MessageView } from "@/domain/interfaces/message/message";
import { mapMessageResponseToMessageView } from "@/domain/mappers/message.mapper";




export function ChatPage() {
  const socketProvided = useSocketContext();
  const { user } = useUserContext()
  const [selectedRoom, setSelectedRoom] = useState("")
  const [messages, setMessages] = useState<MessageView[]>([]);
  const [showNewRoom, setShowNewRoom] = useState<boolean>(false)
  const [showJoinRoom, setShowJoinRoom] = useState<boolean>(false)
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
          type: isOwnMessage ? "sended" : "received", // Tipo del mensaje
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
      body: JSON.stringify({ from:user.username, roomCode:"BC5QVX", content:textToSend}),
    })
    if(!createMessage) return
    socketProvided?.socket.emit("sendMessage",{ from:user.username, roomCode:"BC5QVX", content:textToSend});
  };

  const handleLastMessage = (pos:number) => {
    if(messages.length > pos+1){
      if(messages[pos+1].type !== messages[pos].type) return true
      return false
    }
    return true
  }

  const handleSelectChat = async (roomCodeSelected:string) => {
    setSelectedRoom(roomCodeSelected)
    const chatRoomData = await roomService.getRoomData(roomCodeSelected)
    if(!chatRoomData) return
    setMessages(mapMessageResponseToMessageView(chatRoomData.messages, user))
  }

  const showCreateRoomModal = (show:boolean) => {
    setShowNewRoom(show)
  }

  const showJoinRoomModal = (show:boolean) => {
    setShowJoinRoom(show)
  }

  return (
    <section className="flex gap-2 w-full h-full">
      <SideSection>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <RoomButton showJoinRoomModal={showJoinRoomModal} showCreateRoomModal={showCreateRoomModal} />
          <RoomList handleSelectChat={handleSelectChat}/>
        </div>
        <UserSection />
      </SideSection>
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
      {showNewRoom && <NewRoomModal handleIsOpenModal={showCreateRoomModal} isOpen={showNewRoom}/>}
      {showJoinRoom && <JoinRoomModal handleIsOpenModal={showJoinRoomModal} isOpen={showJoinRoom}/>}
    </section>
  );
}
