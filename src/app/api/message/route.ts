import ChatRoom from "@/models/ChatRoom";
import Message from "@/models/Message";
import User from "@/models/User";
import { connectMongo } from "@/utils/connectMongo";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
    try {
      const { from, roomCode, content } = await request.json();
  
      if (!from || !roomCode || !content) {
        return new Response(
          JSON.stringify({ error: "Todos los campos son requeridos (from, roomCode, content)" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      await connectMongo();
      const cookieStore = cookies();
      const token = cookieStore.get('authToken')?.value;
      if (!token) {
        return new Response(
          JSON.stringify({ error: "No autenticado" }),
          { status: 401 }
        );
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
  
      const user = await User.findById(decoded.userId).populate({
          path: 'chatRooms',
          select: 'name code messages -_id',
          model: ChatRoom
        }, );
        
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Usuario no encontrado" }),
          { status: 404 }
        );
      }
      const room = await ChatRoom.findOne({code: roomCode})
      
      const newMessage = await Message.create({
        message: content,
        from: user._id,
        to: room._id,
      });
      const updatedRoom = await ChatRoom.findOneAndUpdate(
        { code: roomCode },
        { $push: { messages: newMessage._id } },
        { new: true }
      );
      if (!updatedRoom) {
        return new Response(
          JSON.stringify({ error: "Sala de chat no encontrada" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
  
      return new Response(
        JSON.stringify({ message: "Mensaje enviado con éxito", data: newMessage }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error en el servidor:", error);
      return new Response(
        JSON.stringify({ error: "Error interno del servidor"}),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  };

