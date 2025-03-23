import { NextResponse } from 'next/server';
import ChatRoom from '@/models/ChatRoom';
import { connectMongo } from '@/utils/connectMongo';
import Message from '@/models/Message';
import User from '@/models/User';

export const GET = async (request: Request, { params }: { params: { code: string } }) => {
  const { searchParams } = new URL(request.url);
  const code = params.code;
  const page = parseInt(searchParams.get('page') || '1'); 
  const limit = parseInt(searchParams.get('limit') || '50'); 

  if (!code) {
    return new NextResponse(JSON.stringify({ error: 'El código de sala es obligatorio' }), { status: 400 });
  }

  try {
    await connectMongo();

    const room = await ChatRoom.findOne({ code: { $in: code } });

    if (!room) {
      return new NextResponse(JSON.stringify({ error: 'No se han encontrado salas con los códigos proporcionados' }), { status: 404 });
    }

    const totalMessages = await Message.countDocuments({ to: room._id });

    const skip = Math.max(0, totalMessages - page * limit);

    const messages = await Message.find({ to: room._id }) 
      .populate({
        path: 'from',
        model: User,
        select: '-password', 
      }) 
      .sort({ createdAt: 1 }) 
      .skip(skip) 
      .limit(limit); 

    const response = {
      ...room.toObject(),
      messages: messages.reverse(), 
      totalMessages, 
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error); 
    return new NextResponse(JSON.stringify({ error: 'Error al procesar la petición' }), { status: 500 });
  }
};