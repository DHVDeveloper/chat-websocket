import { NextResponse } from 'next/server';
import ChatRoom from '@/models/ChatRoom';
import { connectMongo } from '@/utils/connectMongo';
import Message from '@/models/Message';
import User from '@/models/User';

export const GET = async (_: Request, { params }: { params: { code: string } }) => {
  const code = params.code
  if (!code) {
    return new NextResponse(JSON.stringify({ error: 'El código de sala es obligatorio' }), { status: 400 });
  }

  try {
    await connectMongo();

    const room = await ChatRoom.findOne({ code: { $in: code } }).populate({
      path: 'messages',
      model: Message,
      populate: { path: 'from', model: User }
      ,
    });

    if (!room) {
      return new NextResponse(JSON.stringify({ error: 'No se han encontrado salas con los códigos proporcionados' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(room), { status: 200 });
  } catch (error) {
    
    return new NextResponse(JSON.stringify({ error: 'Error al procesar la petición' }), { status: 500 });
  }
};