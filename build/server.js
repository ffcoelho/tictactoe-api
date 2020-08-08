"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const db_1 = require("./src/data/db");
const apiRouter_1 = require("./src/api/apiRouter");
const app = express_1.default();
app.use(cors_1.default());
app.disable("x-powered-by");
db_1.connectDB();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
const apiSocket = require("./src/api/apiSocket")(io);
app.use("/", apiRouter_1.apiRouter);
server.listen(process.env.PORT || 9000, () => {
    const d = new Date();
    const addr = server.address();
    console.log(`TIC-TAC-TOE API ┬ listening: ${addr.address}:${addr.port}`);
});
