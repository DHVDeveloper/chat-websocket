"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocketConnection = ()  => {
    const [isConnected, setIsConnected] = useState(false)
    const [transport, setTransport] = useState("N/A")
    const socket = io();
    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        });
        socket.on("disconnect", ()=> {
            setIsConnected(false);
            setTransport("N/A");
        });
        return () => {
            socket.off("server-message");
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
          };
    },[])

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    return {socket,isConnected}

    
}