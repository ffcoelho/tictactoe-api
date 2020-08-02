import http from "http";
import express from "express";
import cors from "cors";

import { connectDB } from "./src/data/db";

const app = express();
app.use(cors());
app.disable("x-powered-by");
connectDB();

const server = http.createServer(app);
server.listen(9000, "127.0.0.1", () => {
  const d = new Date();
  const addr: any = server.address();
  console.log(`TIC-TAC-TOE API ┬ listening: ${addr.address}:${addr.port}`);
});
