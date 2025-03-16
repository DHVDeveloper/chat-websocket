import { FormEvent, useState } from "react";
import { GoPaperAirplane } from "react-icons/go";

interface InputSectionProps{
    sendMessage: (textToSend:string) => void
}

export function InputSection({sendMessage}:InputSectionProps){
    const [inputDataText, setInputDataText] = useState<string>("");
    const isTextVoid = () => {
        return inputDataText === ""
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(isTextVoid()) return
        sendMessage(inputDataText)
        setInputDataText("")
    } 

    return (
        <form onSubmit={ (e) => handleSubmit(e)}>
            <div className="rounded-2xl border-[1px]  border-custom-border-color w-full text-custom-text-color flex gap-2 justify-between items-center py-3 px-4 bg-[#0F0F0F]  bg-opacity-20 backdrop-filter backdrop-blur-3xl">
                <input onChange={(e) => setInputDataText(e.target.value)} value={inputDataText} type="text" className="focus:outline-none bg-transparent flex-1" />
                <button type="submit" className={`rounded-full transition-colors flex justify-center items-center p-2 ${isTextVoid() ? "bg-custom-text-secondary-color" : "bg-custom-resalt-color"}`}>
                    {isTextVoid() ? <GoPaperAirplane color="white"/> : <GoPaperAirplane color="0a0b08"/>}
                </button>
            </div>
        </form>
    )
}