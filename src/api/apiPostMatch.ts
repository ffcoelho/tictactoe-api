import { RequestHandler } from "express";
import shortid from "shortid";
import { RoomDocModel } from "../model/room.model";

const Room = require("../data/dbRoom");
const Match = require("../data/dbMatch");

export const apiPostMatch: RequestHandler = async (req, res, next) => {
  try {
    const availableRoom: RoomDocModel = await Room.findAvailable();
    const matchId = shortid.generate();
    availableRoom.matchId = matchId;
    availableRoom.available = false;
    await availableRoom.save();
    const match = {
      id: matchId,
      players: [],
      state: {
        turn: 0,
        table: 111111111
      },
      status: true
    };
    const newMatch = new Match(match);
    await newMatch.save();
    res.status(200).json({ id: match.id });
  } catch (error) {
    res.status(400).json({ error });
  }
};
