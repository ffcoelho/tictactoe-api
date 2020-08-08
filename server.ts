import http from "http";
import express from "express";
import cors from "cors";
import socketIO from "socket.io";
import { connectDB } from "./src/data/db";
import { apiRouter } from "./src/api/apiRouter";

const app = express();
app.use(cors());
app.disable("x-powered-by");
connectDB();

const server = http.createServer(app);
const io = socketIO(server);
const apiSocket = require("./src/api/apiSocket")(io);

app.use("/", apiRouter);

server.listen(process.env.PORT || 9000, () => {
  const d = new Date();
  const addr: any = server.address();
  console.log(`TIC-TAC-TOE API ┬ listening: ${addr.address}:${addr.port}`);
});
