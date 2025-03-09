import { useUserContext } from "@/context/user/User.context"
import { LiaSignOutAltSolid } from "react-icons/lia"
import { RiUser6Line } from "react-icons/ri"
import { UserSectionSkeleton } from "./UserSection.skeleton"

export function UserSection(){
    const { user, isLoading } = useUserContext()
    return (
            !isLoading ?
                <section className="w-full shadow-xl flex gap-2 items-center justify-between overflow-hidden rounded-xl p-4 bg-[#151515]">

                <div className="flex items-center gap-2">
                    <RiUser6Line size={20}/>{user.username}
                </div> 
                <span className="transition-all bg-[#ffffff10] p-1 rounded-md cursor-pointer hover:bg-red-400 hover:text-black">
                    <LiaSignOutAltSolid size={23} />
                </span>
                </section>
             : <UserSectionSkeleton/>
             
           
    )
}