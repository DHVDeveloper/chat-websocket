import React, { useEffect, useRef } from 'react';
import { MessageView } from '@/domain/message/message';
import { ReceivedMessage } from './components/ReceivedMessage';
import { SendedMessage } from './components/SendedMessage';

interface ChatBodyProps {
  messages: MessageView[];
  userEmail: string;
}

const ChatBody: React.FC<ChatBodyProps> = ({ messages, userEmail }) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLastMessage = (pos: number) => {
    if (messages.length > pos + 1) {
      return messages[pos + 1].type !== messages[pos].type;
    }
    return true;
  };

  return (
    <div ref={chatBodyRef} className="px-4 py-2 flex flex-col gap-2 w-full overflow-x-hidden overflow-y-auto">
      {messages.map((message, index) =>
        message.type === 'received' && message.from !== userEmail ? (
          <ReceivedMessage
            senderName={message.from}
            key={index}
            lastMessageSent={handleLastMessage(index)}
          >
            {message.message}
          </ReceivedMessage>
        ) : (
          <SendedMessage key={index} lastMessageSent={handleLastMessage(index)}>
            {message.message}
          </SendedMessage>
        )
      )}
    </div>
  );
};

export default ChatBody;
