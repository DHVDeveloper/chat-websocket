export function ChatSection({children}:{children:React.ReactNode}){
    return(
        <div className="rounded-2xl block overflow-hidden gap-2 border-[1px] bg-[#121212]  border-custom-border-color w-full text-custom-text-color flex-1">
            <div className="h-full w-full flex flex-col gap-2  ">
                {children}
            </div>
        </div>
    )
} 