export function SideSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-[35%] overflow-hidden rounded-3xl border-[1px] p-4 bg-[#121212] border-custom-border-color flex flex-col gap-2 justify-between">
      {children}
    </div>
  );
}
