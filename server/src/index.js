import { loadConfig } from "./config/configLoader.js";
import express from "express"
import routes from "./routes.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./services/bookingWatcher.js"

import { createServer } from "http";
import { Server } from "socket.io";

const config = loadConfig();

const app = express()
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4500",
    credentials: true,
  },
});

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4500',
  credentials: true
}));
app.use(helmet());
app.use(express.json());

app.use('/api', routes)

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// app.listen(config.server.port, () => console.log(`Server is running on ${config.server.port}`));
httpServer.listen(config.server.port, () =>
  console.log(`Server is running on ${config.server.port}`)
);

export { io };