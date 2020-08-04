import { RequestHandler } from "express";
import shortid from "shortid";
import { MatchDocModel } from "../model/match.model";

const Match = require("../data/dbMatch");

export const apiPostMatchJoin: RequestHandler = async (req, res, next) => {
  try {
    const matchSearch: MatchDocModel = await Match.findById(req.body.matchId);
    if (!matchSearch.active || matchSearch.players.length > 1) {
      return res.status(400).json({ error: "Something went wrong." });
    }
    const playerId: string = shortid.generate();
    matchSearch.players.push({
      id: playerId,
      name: req.body.name,
      online: false
    });
    await matchSearch.save();
    res.status(200).json({ playerId });
  } catch (error) {
    res.status(400).json({ error });
  }
};
