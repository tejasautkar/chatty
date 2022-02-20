import 'dotenv/config';
import http from "http";
import express from "express";
import { config } from "./utils/config";
import logger from "morgan";
import indexRouter from "./routes/index";
import userRouter from "./routes/User";
import deleteRouter from "./routes/delete";
import chatRoomRouter from "./routes/chatRoom";
import cookieParser from "cookie-parser";
import "./utils/mongoDBConnection";
import { exceptionHandler } from './middleware/ExceptionHandling';
import { Server } from "socket.io";
import { socketEvents } from './utils/utilTypes';
import { WebSocket } from './utils/WebSocket';

//http server
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser())
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", chatRoomRouter);
app.use("/delete", deleteRouter);
app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });
app.use(exceptionHandler);
const server = http.createServer(app);
const io = new Server();
io.listen(server);
const webSocket = new WebSocket(io);

io.on(socketEvents.connection, webSocket.connection)
server.listen(config.port, () => {
    console.log(`Listening on PORT ${config.port}`);
});



