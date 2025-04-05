import User from "@/models/User";
import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
  try {
    await connectMongo();
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Faltan campos necesarios: nombre, email o contraseña" }),
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "El usuario o el email ya están en uso" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.validate();
    await newUser.save();

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET no está definido en las variables de entorno.");
    }

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username, email: newUser.email },
      secretKey,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(newUser);
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.name === "ValidationError") {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(
      JSON.stringify({ error: "Error al procesar la petición" }),
      { status: 500 }
    );
  }
};
