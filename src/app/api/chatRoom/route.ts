import ChatRoom from "@/models/ChatRoom";
import User from "@/models/User";
import { connectMongo } from "@/utils/connectMongo";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Crear una sala
export const POST = async (request: Request) => {
  if (!request.body) {
    return new NextResponse(
      JSON.stringify({ error: "El nombre de la sala es obligatorio" }),
      { status: 500 }
    );
  }
  try {
    const body = await request.json();
    const { name } = body;
    await connectMongo();

    if (!name) {
      return new NextResponse(
        JSON.stringify({ error: `El nombre de la sala es obligatorio` }),
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newRoom = await ChatRoom.create({
      name,
      code,
      users: [user._id],
      owner: user._id,
    });

    await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { chatRooms: newRoom._id } }, 
      { new: true }
    );

    return new NextResponse(JSON.stringify(newRoom), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Error al crear la sala" }),
      { status: 500 }
    );
  }
};

//salas por usuario
export const GET = async () => {
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
      JSON.stringify({ error: "No se ha podido actualizar las salas de chat" }),
      { status: 404 }
    );
  }

  return NextResponse.json(
    user.chatRooms
  );
}

// Unirse a una sala
export const PATCH = async (request: Request) => {
  if (!request.body) {
    return new NextResponse(
      JSON.stringify({ error: "El código de la sala es obligatorio" }),
      { status: 500 }
    );
  }
  try {
    const body = await request.json();
    const { roomCode, email } = body;
    await connectMongo();

    const roomFound = await ChatRoom.findOne({ code: roomCode });

    if (!roomFound) {
      return new NextResponse(
        JSON.stringify({
          error: `La sala no ha sido encontrada`,
        }),
        { status: 400 }
      );
    }
    const clientFound = await User.findOne({ email: email });

    if (!clientFound) {
      return new NextResponse(
        JSON.stringify({
          error: `El usuario con email ${email} no ha sido encontrado`,
        }),
        { status: 400 }
      );
    }
    if (roomFound.users.includes(clientFound._id)) {
      return new NextResponse(
        JSON.stringify({ error: "El usuario ya se encuentra unido a la sala" }),
        { status: 409 }
      );
    }

    roomFound.users.push(clientFound._id);
    await roomFound.save();

    clientFound.chatRooms.push(roomFound._id);
    await clientFound.save();
    return new NextResponse(
      JSON.stringify({ message: "Se ha unido a la sala correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Error al crear la sala" }),
      { status: 500 }
    );
  }
};
