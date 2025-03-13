"use client";
import { User } from "@/domain/user/user.interface";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";
import { UserContext } from "./User.context";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
      try {
        (async () => {
            setIsLoading(true)
            const userData = await userService.getUser();
            if(!userData.success || !userData.data) return
            setUser(userData.data)
            setIsLoading(false)
        })()
      } catch (error) {
      }
  }, []); 


  return (
    <UserContext.Provider value={{user,isLoading}}>
      {children}
    </UserContext.Provider>
  );
}
