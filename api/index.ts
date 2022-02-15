import 'dotenv/config';
import http from "http";
import express from "express";
import { config } from "./utils/config";
import logger from "morgan";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import deleteRouter from "./routes/delete";
import chatRoomRouter from "./routes/chatRoom";
import {decode} from "./middleware/jwt"
import "./utils/mongoDBConnection";

//http server
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);
app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Listening on PORT ${config.port}`);
});



