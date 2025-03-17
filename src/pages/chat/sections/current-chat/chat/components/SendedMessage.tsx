interface SendedMessage {
  lastMessageSent: boolean;
  children: React.ReactNode;
}
export function SendedMessage({ children, lastMessageSent }: SendedMessage) {
  return (
    <div className="text-custom-text-color max-w-[100%] flex justify-end items-center">
      <div
        className={`border shadow-lg bg-[#278b5b] w-fit max-w-[50%] backdrop-filter overflow-hidden backdrop-blur-lg text-custom-text-color ${
          lastMessageSent ? "rounded-lg rounded-br-none" : "rounded-lg"
        } p-3 border-[1px] border-[#3f3f4680]`}
      >
        {children}
      </div>
    </div>
  );
}
