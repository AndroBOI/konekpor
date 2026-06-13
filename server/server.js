import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use("/", (req, res) => {
  res.send({ message: "hello world" });
});

io.on("connection", (socket) => {
  console.info("client connected", socket.id);

  socket.on("disconnect", () => {
    console.info("client disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("server running on port 3000");
});
