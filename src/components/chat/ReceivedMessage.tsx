interface SendedMessage {
  lastMessageSent: boolean;
  children: React.ReactNode;
}

export function ReceivedMessage({ children, lastMessageSent }: SendedMessage) {
  return (
    <div className="text-custom-text-color w-full flex justify-start items-center">
      <div className={`bg-custom-secondary-color text-custom-text-color border-[1px] border-custom-border-color p-4 ${lastMessageSent ? "rounded-lg rounded-bl-none" : "rounded-lg"}`}>
        {children}
      </div>
    </div>
  );
}
