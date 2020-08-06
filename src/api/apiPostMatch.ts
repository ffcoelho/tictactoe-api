import { RequestHandler } from "express";
import shortid from "shortid";
import { RoomDocModel } from "../model/room.model";
import { MatchModel } from "../model/match.model";

const Room = require("../data/dbRoom");
const Match = require("../data/dbMatch");

export const apiPostMatch: RequestHandler = async (req, res, next) => {
  try {
    const availableRoom: RoomDocModel = await Room.findAvailable();
    if (!availableRoom) {
      return res.status(400).json({ error: "Something went wrong." });
    }
    const matchId = shortid.generate();
    availableRoom.matchId = matchId;
    availableRoom.available = false;
    await availableRoom.save();
    const match: MatchModel = {
      id: matchId,
      active: true,
      players: [],
      state: {
        board: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        matchState: "play",
        score: [ 0, 0, 0 ],
        turn: 2,
        winLine: "none"
      }
    };
    const newMatch = new Match(match);
    newMatch.room = availableRoom.id;
    await newMatch.save();
    res.status(200).json({ matchId });
  } catch (error) {
    res.status(400).json({ error });
  }
};
