'use client'
import { io } from "socket.io-client";
import { SocketContext } from "./Socket.context";
import { useEffect, useRef } from "react";

export function SocketProvider({children}:{children:React.ReactNode}){
    const socket = useRef(io());
    useEffect(() => {
        socket.current.on("connect", () => {
            console.log("Conectado");
        });
        socket.current.on("disconnect", ()=> {
            console.log("desconectado");
        });
    },[])
    return(<SocketContext.Provider value={{socket:socket.current}}>
        {children}
    </SocketContext.Provider>)
} 