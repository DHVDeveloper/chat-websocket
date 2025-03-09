"use client";
import { User } from "@/domain/interfaces/user/user";
import { apiUser } from "@/services/user/apiUser";
import { mapUserResponseToUser } from "@/services/user/mapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserContext } from "./User.context";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
      try {
        (async () => {
            setIsLoading(true)
            const userFinded = await getUser()
            setUser(userFinded)
            setIsLoading(false)
        })()
      } catch (error) {
      }
  }, []); 

  const getUser = async () => {
    const userResponse = await apiUser.getUser();
    return mapUserResponseToUser(userResponse);
  };

  return (
    <UserContext.Provider value={{user,isLoading}}>
      {children}
    </UserContext.Provider>
  );
}
