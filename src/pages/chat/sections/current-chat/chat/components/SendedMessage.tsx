interface SendedMessage {
  lastMessageSent: boolean;
  children: React.ReactNode;
}
export function SendedMessage({ children, lastMessageSent }: SendedMessage) {
  return (
    <div className="text-custom-text-color w-full flex justify-end items-center">
      <div
        className={`bg-custom-secondary-color  bg-opacity-40 backdrop-filter backdrop-blur-lg text-custom-text-color ${
          lastMessageSent ? "rounded-lg rounded-br-none" : "rounded-lg"
        } p-4 border-[1px] border-custom-border-color`}
      >
        {children}
      </div>
    </div>
  );
}
