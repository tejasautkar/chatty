import http from "http";
import cors from "cors";
import express from "express";
import { config } from "./config";
import * as socketIO from "socket.io";
import { Socket } from "socket.io";

//http server
const app = express();


const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Listening on PORT ${config.port}`);
});

let io: socketIO.Server;
io = new socketIO.Server(server);
let roomId: string;
// A set of active users. These will be unique
const activeUsers = new Set();

io.on("connection", (socket: Socket)=> {
    socket.on("JOIN_ROOM", (room: string)=>{
        roomId = room;
    });
})



