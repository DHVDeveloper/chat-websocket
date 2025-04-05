import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectMongo } from '@/utils/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import ChatRoom from '@/models/ChatRoom';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: { id: string; nombre: string; email: string };
}

export const GET = async () => {
  try {
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

    return NextResponse.json({
      username: user.username,
      email: user.email,
      chatRooms: user.chatRooms
    });

  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Token inválido o expirado" }),
      { status: 401 }
    );
  }
};

