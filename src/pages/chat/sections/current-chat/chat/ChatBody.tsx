import React, { useEffect, useRef } from 'react';
import { MessageView } from '@/domain/message/message';
import { ReceivedMessage } from './components/ReceivedMessage';
import { SendedMessage } from './components/SendedMessage';
import useScrollToBottom from '@/hooks/useScrollToBottomMessage';
import { scrollToBottom } from '@/utils/scrollToBottom';
import { useUserContext } from '@/context/user/User.context';

interface ChatBodyProps {
  messages: MessageView[];
  userEmail: string;
}

export function ChatBody ({ messages, userEmail }:ChatBodyProps) {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const penultimateRef = useRef<HTMLDivElement | null>(null);
  const {user} = useUserContext()
  useScrollToBottom(penultimateRef, messages.length);

  useEffect(() => {
    console.log(messages);
    if(!!chatBodyRef){
      if(messages.length > 0 && messages[messages.length-1].from === user.username){
        scrollToBottom(chatBodyRef);
      }
    }
  }, [messages]);

  const handleLastMessage = (pos: number) => {
    if (messages.length > pos + 1) {
      return messages[pos + 1].type !== messages[pos].type;
    }
    return true;
  };

  return (
    <div ref={chatBodyRef} className="px-4 py-2 flex flex-col gap-2 w-full overflow-x-hidden overflow-y-auto">
      {messages.map((message, index) => {
        const isPenultimate = index === messages.length - 2;

        return message.type === "received" && message.from !== userEmail ? (
          <ReceivedMessage
            senderName={message.from}
            key={index}
            lastMessageSent={handleLastMessage(index)}
            messageRef={isPenultimate ? penultimateRef : null}
          >
            {message.message}
          </ReceivedMessage>
        ) : (
          <SendedMessage  messageRef={isPenultimate ? penultimateRef : null} key={index} lastMessageSent={handleLastMessage(index)}>
            {message.message}
          </SendedMessage>
        );
      })}
    </div>
  );
};

export default ChatBody;
