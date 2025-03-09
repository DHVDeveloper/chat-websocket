import { PiUserLight } from "react-icons/pi";

interface SendedMessage {
  lastMessageSent: boolean;
  children: React.ReactNode;
  senderName: string
}

export function ReceivedMessage({ children, lastMessageSent, senderName }: SendedMessage) {
  return (
    <div className="text-custom-text-color w-full flex justify-start flex-col items-start">
      <div className={`bg-custom-secondary-color text-custom-text-color border-[1px] border-custom-border-color p-4 ${lastMessageSent ? "rounded-lg rounded-bl-none" : "rounded-lg"}`}>
        {children}
      </div>
      {lastMessageSent && <p className="flex gap-2 items-center"><span className="text-custom-resalt-color">-</span><PiUserLight /> {senderName}</p>}
    </div>
  );
}
