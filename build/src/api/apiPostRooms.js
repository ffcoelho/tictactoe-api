"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPostRooms = void 0;
const shortid_1 = __importDefault(require("shortid"));
const Room = require("../data/dbRoom");
exports.apiPostRooms = async (req, res, next) => {
    try {
        const room = {
            id: shortid_1.default.generate(),
            available: true,
            matchId: "none"
        };
        const newRoom = new Room(room);
        await newRoom.save();
        res.status(204).json();
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
