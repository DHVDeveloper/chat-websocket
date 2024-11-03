import ChatRoom from "@/models/ChatRoom";
import User from "@/models/User";
import { connectMongo } from "@/utils/connectMongo";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (request:Request) => {
    if(!request.body){
        return new NextResponse(JSON.stringify({error: "El nombre de la sala es obligatorio"}), {status: 500})
    }
    try {
        const body = await request.json();
        const { name } = body;
        await connectMongo(); 
  
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  
        const newRoom = await ChatRoom.create({
          name,
          code,
        });
  
        return new NextResponse(JSON.stringify(newRoom), {status: 201});
      } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({error: "Error al crear la sala"}), {status: 500})
      }
}

export const PATCH = async (request:Request) => {
    if(!request.body){
        return new NextResponse(JSON.stringify({error: "El nombre de la sala es obligatorio"}), {status: 500})
    }
    try {
        const body = await request.json();
        const { roomCode, email } = body;
        await connectMongo(); 
  
        const roomFound = await ChatRoom.findOne({code: roomCode})

        if(!roomFound){
            return new NextResponse(JSON.stringify({error: `La sala con el código ${roomCode} no ha sido encontrada`}),{status:400})
        }
        const clientFound = await User.findOne({email: email})

        if(!clientFound){
            return new NextResponse(JSON.stringify({error: `El usuario con email ${email} no ha sido encontrado`}),{status:400})
        }
        console.log({clientFound});
        if (roomFound.users.includes(clientFound._id)) {
            return new NextResponse(JSON.stringify({error: "El usuario ya se encuentra unido a la sala"}), {status: 409})
        }

        roomFound.users.push(clientFound._id);
        await roomFound.save()

        clientFound.chatRooms.push(roomFound._id)
        await clientFound.save()
        return new NextResponse(JSON.stringify({message: "Se ha unido a la sala correctamente"}), {status: 200});
        
      } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({error: "Error al crear la sala"}), {status: 500})
      }
}


