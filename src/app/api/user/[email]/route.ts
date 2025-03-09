import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectMongo } from '@/utils/connectMongo';

export const GET = async ({ params }: { params: { email: string } }) => {
  try {
    await connectMongo();
    const user = await User.findOne({ email: params.email }).populate('chatRooms');
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'No se ha encontrado el usuario.' }), { status: 204 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error al procesar la petición." }), { status: 500 });
  }
};