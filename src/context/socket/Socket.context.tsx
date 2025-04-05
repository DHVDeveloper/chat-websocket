import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContext{
    socket:Socket
}
export const SocketContext = createContext<SocketContext|undefined>(undefined)
export const useSocketContext = () =>{
    const context = useContext(SocketContext)
    return context
} 