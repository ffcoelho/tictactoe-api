"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const Room = require("../data/dbRoom");
const Match = require("../data/dbMatch");
exports.apiPostMatch = async (req, res, next) => {
    try {
        const availableRoom = await Room.findAvailable();
        if (!availableRoom) {
            return res.status(400).json({ error: "Something went wrong." });
        }
        const matchId = shortid_1.default.generate();
        availableRoom.matchId = matchId;
        availableRoom.available = false;
        await availableRoom.save();
        const match = {
            id: matchId,
            active: true,
            players: [],
            state: {
                board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                matchState: "play",
                score: [0, 0, 0],
                turn: 2,
                winLine: "none",
            }
        };
        const newMatch = new Match(match);
        newMatch.room = availableRoom.id;
        await newMatch.save();
        res.status(200).json({ matchId });
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
