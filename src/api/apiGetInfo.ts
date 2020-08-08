import { RequestHandler } from "express";
import { InfoDocModel } from "../model/info.model";
import { RoomDocModel, RoomPublicModel } from "../model/room.model";

const Info = require("../data/dbInfo");
const Room = require("../data/dbRoom");

export const apiGetInfo: RequestHandler = async (req, res, next) => {
  try {
    const infoSearch: InfoDocModel = await Info.find();
    if (!infoSearch) {
      return res.status(400).send("Something went wrong.");
    }
    const roomsSearch: RoomDocModel[] = await Room.findAll();
    if (!roomsSearch) {
      return res.status(400).send("Something went wrong.");
    }
    const rooms: RoomPublicModel = { available: 0, rooms: 0 };
    roomsSearch.forEach((roomDoc: RoomDocModel) => {
      rooms.rooms++;
      if (roomDoc.available) {
        rooms.available++;
      }
    });
    const d = new Date();
    const date = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    infoSearch.lastAccess = date;
    await infoSearch.save();
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
};
