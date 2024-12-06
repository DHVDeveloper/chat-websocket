export function MainSection({children}:{children:React.ReactNode}) {
    return <div className="h-full w-[60%] shadow-sm shadow-custom-resalt-color bg-[#111111] overflow-hidden rounded-3xl p-4 text-white backdrop-blur-md bg-transparent">
        {children}
    </div>
}