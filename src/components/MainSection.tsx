export function MainSection({children}:{children:React.ReactNode}) {
    return <div className=" h-full w-[60%] shadow-sm border-1 border-custom-border-color bg-[#151515] overflow-hidden rounded-3xl p-2 text-white backdrop-blur-md">
        {children}
    </div>
}