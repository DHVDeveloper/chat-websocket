import mongoose from "mongoose";
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {
  mongoose.connect(process.env.DB_CNN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Conectado a la base de datos');
  }).catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
  
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connect", (socket) => {
    socket.on("joinRoom", (roomCode) => {
      socket.join(roomCode);
      console.log(`Socket ${socket.id} se unió a la sala ${roomCode}`);
    });
    socket.on("sendMessage", async ({ from, roomCode, content }) => {
      try {
          socket.to(roomCode).emit("newMessage", {
              message: content,
              sender: from ,
              senderSocketId: socket.id,
              createdAt: new Date().toISOString(),
          });
  
          console.log(`Mensaje enviado en sala ${roomCode}: ${content}`);
      } catch (err) {
          socket.emit("error", "Error al enviar el mensaje");
      }
  });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});