import { loadConfig } from "./config/configLoader.js";
import express from "express"
import routes from "./routes.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./services/bookingWatcher.js"

import { createServer } from "http";
import { Server } from "socket.io";
import appRouter from "./routes/appRoutes.js";

const config = loadConfig();

const app = express()
const httpServer = createServer(app);

console.log(process.env.NODE_ENV);


const io = new Server(httpServer, {
  cors: {
    origin: [
      // "*"
      "http://localhost:4500",
      // "https://react-sept-2025.web.app",
      // "https://react-sept-2025.firebaseapp.com"
    ],
    credentials: true,
  },
});

app.use(cookieParser());
app.use(cors({
  origin: "*",//'http://localhost:4500',
  credentials: true
}));
app.use(helmet());
app.use(express.json());

app.use('/', appRouter)
app.use('/api', routes)

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// app.listen(config.server.port, () => console.log(`Server is running on ${config.server.port}`));
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () =>
  console.log(`Server is running on ${PORT}`)
);

export { io };