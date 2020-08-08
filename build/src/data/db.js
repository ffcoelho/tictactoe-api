"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    mongoose_1.default.connect(process.env.MONGODB || "mongodb://localhost:27017/tictactoe", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}
exports.connectDB = connectDB;
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "mongoDB connection error: "));
db.once("open", function () {
    console.log(`                └ mongoDB: ${mongoose_1.default.connections[0].host}:${mongoose_1.default.connections[0].port}`);
});
