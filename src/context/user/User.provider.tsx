"use client";
import { apiUser } from "@/services/user/apiUser";
import { mapUserResponseToUser } from "@/services/user/mapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserContext } from "./User.context";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  const router = useRouter();

  useEffect(() => {
      try {
        (async () => {
            if(Object.entries(user).length === 0){
              const userFinded = await getUser()
              setUser(userFinded)
            }
        })()
      } catch (error) {
      }
  }, []); 

  const getUser = async () => {
    const userResponse = await apiUser.getUser();
    return mapUserResponseToUser(userResponse);
  };

  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
}
