import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectMongo } from '@/utils/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: { id: string; nombre: string; email: string };
}

export const GET = async (req: AuthenticatedRequest, res: NextApiResponse) => {
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
    const user = await User.findById(decoded.userId);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 401 }
      );
    }
    return NextResponse.json({ id: user._id, username: user.username, email: user.email });;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Token inválido o expirado" }),
      { status: 401 }
    );
  }
};
