import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { randomUUID } from "crypto";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

const MAX_PLAYERS = 2;
const rooms = new Map();

app.use("/", (req, res) => {
  res.send({ message: "hello world" });
});

function broadcastRoom(roomId) {
  const room = io.sockets.adapter.rooms.get(roomId);
  const meta = rooms.get(roomId);
  if (!room || !meta) return;

  const players = [...room].map((socketId) => ({
    id: socketId,
    role: socketId === meta.hostId ? "host" : "guest",
  }));

  io.to(roomId).emit("room-update", { roomId, players });
}

io.on("connection", (socket) => {
  console.info("client connected", socket.id);

  socket.on("disconnect", () => {
    console.info("client disconnected:", socket.id);
  });

  socket.on("create-room", () => {
    const roomId = randomUUID();
    socket.join(roomId);
    rooms.set(roomId, { hostId: socket.id });

    socket.emit("room-created", roomId);
    broadcastRoom(roomId);

    console.info("room created:", roomId, "by", socket.id);
  });

  socket.on("join-room", (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);

    if (!room || !rooms.has(roomId)) {
      socket.emit("join-error", "Room does not exist");
      return;
    }
    if (room.size >= MAX_PLAYERS) {
      socket.emit("join-error", "Room is full");
      return;
    }

    socket.join(roomId);
    broadcastRoom(roomId);

    console.info("room", roomId, "players:", [
      ...io.sockets.adapter.rooms.get(roomId),
    ]);
  });

  socket.on("get-room", (roomId) => {
    if (!rooms.has(roomId)) {
      socket.emit("join-error", "Room does not exist");
      return;
    }
    socket.join(roomId); 
    broadcastRoom(roomId);
  });
});

httpServer.listen(3000, () => {
  console.log("server running on port 3000");
});
