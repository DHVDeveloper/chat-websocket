import User from "@/models/User";
import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const POST = async (request:Request) => {
  try {
    
    await connectMongo();
    
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "El email y la contraseña son requeridos." }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado." }),
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Contraseña incorrecta." }),
        { status: 401 }
      );
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET no está definido en las variables de entorno.");
    }
    
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      secretKey,  
      { expiresIn: "1h" } 
    );

    
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("authToken", token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV !== "development",  
      maxAge: 60 * 60,  
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar la solicitud." }),
      { status: 500 }
    );
  }
};