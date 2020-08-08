"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const Match = require("../data/dbMatch");
exports.apiPostMatchJoin = async (req, res, next) => {
    try {
        if (!req.body.matchId || !req.body.name) {
            return res.status(400).json({ error: "Invalid request." });
        }
        const matchSearch = await Match.findById(req.body.matchId);
        if (!matchSearch.active || matchSearch.players.length > 1) {
            return res.status(400).json({ error: "Something went wrong." });
        }
        const playerId = shortid_1.default.generate();
        matchSearch.players.push({
            id: playerId,
            name: req.body.name,
            online: false
        });
        await matchSearch.save();
        res.status(200).json({ playerId });
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
