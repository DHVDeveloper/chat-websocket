import { PiUserLight } from "react-icons/pi";

interface SendedMessage {
  lastMessageSent: boolean;
  children: React.ReactNode;
  senderName: string
  messageRef: React.RefObject<HTMLDivElement> | null;
}

export function ReceivedMessage({ children, lastMessageSent, senderName,messageRef }: SendedMessage) {
  return (
    <div ref={messageRef} className="text-custom-text-color w-full">
      <div className={`rounded-lg border p-3 shadow-md bg-zinc-800/50 max-w-[50%] w-fit  overflow-hidden border-zinc-700/50 text-custom-text-color flex flex-col items-start border-custom-border-color px-2 ${lastMessageSent ? "rounded-lg rounded-bl-none" : "rounded-lg"}`}>
        {lastMessageSent && <p className="text-custom-resalt-color font-bold text-sm">{senderName}</p>}
        <div className="px-2 overflow-hidden text-wrap break-words w-full">
        {children}
          </div>
      </div>
    </div>
  );
}
