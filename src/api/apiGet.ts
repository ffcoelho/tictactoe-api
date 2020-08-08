import { RequestHandler } from "express";
import { InfoDocModel } from "../model/info.model";
import { RoomDocModel, RoomPublicModel } from "../model/room.model";

const Info = require("../data/dbInfo");

export const apiGet: RequestHandler = async (req, res, next) => {
  try {
    const infoSearch: InfoDocModel = await Info.find();
    if (!infoSearch) {
      return res.status(400).send("Something went wrong.");
    }
    const d = new Date();
    const date = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    infoSearch.lastAccess = date;
    await infoSearch.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
};
