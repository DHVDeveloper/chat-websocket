import ChatRoom from "@/models/ChatRoom";
import Message from "@/models/Message";
import User from "@/models/User";

export const POST = async (request: Request) => {
    try {
      const { from, roomCode, content } = await request.json();
  
      if (!from || !roomCode || !content) {
        return new Response(
          JSON.stringify({ error: "Todos los campos son requeridos (from, roomCode, content)" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const user = await User.findOne({email: from})
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

