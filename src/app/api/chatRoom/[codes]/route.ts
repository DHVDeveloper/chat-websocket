import { NextResponse } from 'next/server';
import ChatRoom from '@/models/ChatRoom';
import { connectMongo } from '@/utils/connectMongo';

export const GET = async (req: Request, { params }: { params: { codes: string } }) => {
    const codesArray = params.codes.split(',');
  
    if (!codesArray || codesArray.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'El código de sala es obligatorio' }), { status: 400 });
    }
  
    try {
      await connectMongo();
  
      const rooms = await ChatRoom.find({ code: { $in: codesArray } });
  
      if (rooms.length === 0) {
        return new NextResponse(JSON.stringify({ error: 'No se han encontrado salas con los códigos proporcionados' }), { status: 404 });
      }
  
      return new NextResponse(JSON.stringify(rooms), { status: 200 });
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: 'Error al procesar la petición' }), { status: 500 });
    }
  };