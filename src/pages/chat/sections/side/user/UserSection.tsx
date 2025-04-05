import { useUserContext } from "@/context/user/User.context"
import { IoExitOutline } from "react-icons/io5"
import { RiUser6Line } from "react-icons/ri"
import { UserSectionSkeleton } from "./UserSection.skeleton"

export function UserSection(){
    const { user, isLoading, logout } = useUserContext()

    return (
        !isLoading ?
        <section className="w-full shadow-xl flex gap-2 items-center justify-between overflow-hidden rounded-xl p-4 bg-[#151515]">

        <div className="flex items-center gap-2">
            <RiUser6Line size={20}/>{user.username}
        </div> 
        <span onClick={logout} className="transition-all text-[#a1a1aa] p-1 rounded-md cursor-pointer hover:bg-red-200 hover:text-red-600">
            <IoExitOutline size={18}  /> 
        </span>
        </section>
        : <UserSectionSkeleton/>
    )
}