import { RequestHandler } from "express";
import shortid from "shortid";

const Room = require("../data/dbRoom");

export const apiPostRooms: RequestHandler = async (req, res, next) => {
  try {
    const room = {
      id: shortid.generate(),
      available: true,
      matchId: "none"
    };
    const newRoom = new Room(room);
    await newRoom.save();
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error });
  }
};
