import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.disable("x-powered-by");

const server = http.createServer(app);

server.listen(9000, "127.0.0.1", () => {
  const d = new Date();
  const addr: any = server.address();
  console.log(`${d.getTime()}> TIC-TAC-TOE API started - ${addr.address}:${addr.port}`);
});
