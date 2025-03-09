import { UserResponse } from "./models"

interface ApiUser{
    getUser: () => Promise<UserResponse>
}

export const apiUser:ApiUser = {
    getUser: async function () {
        try{
            const user = await fetch(`/api/user`, {
                credentials: 'include'
            })
            if(!user){
                return { error: "No se ha encontrado el usuario" }
            }
            return await user.json()
        } catch (error) {
            return { error: "Error al encontrar el usuario" }
        }

    }
}