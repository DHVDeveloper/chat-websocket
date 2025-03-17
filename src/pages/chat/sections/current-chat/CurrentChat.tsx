import { useRoomContext } from '@/context/room/Room.context';
import { useSocketContext } from '@/context/socket/Socket.context';
import { useUserContext } from '@/context/user/User.context';
import { MessageView } from '@/domain/message/message';
import { mapMessageResponseToMessageView } from '@/domain/message/message.mapper';
import { ChatRoom } from '@/domain/room/chatRoom';
import { useEffect, useState } from 'react';
import { CurrentChatSkeleton } from './CurrentChat.skeleton';
import ChatBody from './chat/ChatBody';
import { ChatHeader } from './chat/ChatHeader';
import { InputSection } from './chat/InputSection';
import { ChatSection } from './chat/ChatSection';
import { messageService } from '@/services/message.service';
import { toast } from 'sonner';

export function CurrentChat() {
  const { user, isLoading } = useUserContext();
  const { selectedRoom } = useRoomContext();
  const [messages, setMessages] = useState<MessageView[]>([]);
  const socketProvided = useSocketContext();

  useEffect(() => {
    if (!selectedRoom) return;
    joinRoom(selectedRoom);
  }, [selectedRoom]);

  const joinRoom = (selectedRoom: ChatRoom) => {
    receiveMessages();
    socketProvided?.socket.emit('joinRoom', selectedRoom.code);
    if (selectedRoom?.messages.length === 0) return;
    const viewMessages = mapMessageResponseToMessageView(
      selectedRoom?.messages,
      user.email
    );
    setMessages(viewMessages);
  };

  const receiveMessages = () => {
    if (!socketProvided?.socket) return;
    socketProvided.socket.on('newMessage', ({ message, sender }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 'received',
          message,
          from: sender.username,
        },
      ]);
    });
  };

  const sendMessage = async (textToSend: string) => {
    if (!socketProvided?.socket || !user?.username || !selectedRoom?.code) return;

    socketProvided.socket.emit('sendMessage', {
      from: user,
      roomCode: selectedRoom.code,
      content: textToSend,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: 'sended',
        message: textToSend,
        from: user.username,
      },
    ]);
    const response = await messageService.sendMessage(textToSend,user.email,selectedRoom.code)
    if(!response.success){
      toast.error('Ha habido un problema al enviar el mensaje')
    }
  };

  return !isLoading ? (
    selectedRoom ? (
      <div className="flex flex-col gap-2 h-full w-[65%] ">
        <ChatSection>
          <ChatHeader currentChatRoom={selectedRoom} />
          <ChatBody messages={messages} userEmail={user.email} />
        </ChatSection>
        <InputSection sendMessage={sendMessage} />
      </div>
    ) : (
      <div className="rounded-2xl flex justify-center items-center overflow-hidden p-4 gap-2 border-[1px] bg-[#121212] border-custom-border-color w-full text-custom-text-color flex-1">
        <span>Selecciona un chat!</span>
      </div>
    )
  ) : (
    <CurrentChatSkeleton />
  );
}
