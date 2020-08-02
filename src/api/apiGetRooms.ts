import { RequestHandler } from "express";
import { RoomDocModel, RoomPublicModel } from "../model/room.model";

const Room = require("../data/dbRoom");

export const apiGetRooms: RequestHandler = async (req, res, next) => {
  try {
    const roomsSearch: RoomDocModel[] = await Room.findAll();
    if (!roomsSearch) {
      return res.status(401).json({ error: "not found" });
    }
    const rooms: RoomPublicModel[] = [];
    roomsSearch.forEach((roomDoc: RoomDocModel) => {
      rooms.push({
        available: roomDoc.available
      });
    });
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(400).json({ error });
  }
};
