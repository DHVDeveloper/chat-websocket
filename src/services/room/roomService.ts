import { ChatRoom } from "@/domain/interfaces/room/chatRoom";
import { roomEndpoint } from "./roomEndpoint";

export const roomService = {
    create: async (name: string): Promise<any> => {
        try {
            const response = await fetch('/api/chatRoom', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error(`Error al crear la sala: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al crear la sala:', error);
            throw error;
        }
    },
    join: async (roomCode:string, email:string): Promise<any> => {
        try {
            const response = await fetch('/api/chatRoom', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomCode , email}),
            });

            if (!response.ok) {
                throw new Error(`Error al unirse a la sala: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al unirse a la sala:', error);
            throw error;
        }  
    },
    getRoomData: async (roomCode:string): Promise<ChatRoom> => {
        try{
            const response = await fetch(roomEndpoint.getRoom(roomCode));

            if (!response.ok) {
                throw new Error(`Error al recuperar la sala: ${response.statusText}`);
            }

            const data = await response.json();
            return data as ChatRoom;
        } catch {
            throw new Error("Error al recuperar la sala");
        }
    }
};