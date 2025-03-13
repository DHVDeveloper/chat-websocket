import { useUserContext } from "@/context/user/User.context";
import { MessageView } from "@/domain/message/message.interface";
import { useEffect, useState } from "react";
import { ChatBodySection } from "./chat/ChatBodySection";
import { InputSection } from "./chat/components/InputSection";
import { ReceivedMessage } from "./chat/components/ReceivedMessage";
import { SendedMessage } from "./chat/components/SendedMessage";
import { useSocketContext } from "@/context/socket/Socket.context";
import { useRoomContext } from "@/context/room/Room.context";
import { CurrentChatSkeleton } from "./CurrentChat.skeleton";

export function CurrentChat(){
    const { user,isLoading } = useUserContext()
    const {selectedRoom } = useRoomContext()
    
    const [messages, setMessages] = useState<MessageView[]>([]);
    const socketProvided = useSocketContext();

    useEffect(() => {
        if(!selectedRoom) return
        receiveMessages();
        socketProvided && socketProvided.socket.emit("joinRoom", "BC5QVX");
    }, [selectedRoom]);
    
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
    return(!isLoading ? (selectedRoom ? 
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
        </div>) : <CurrentChatSkeleton/>
      )
}