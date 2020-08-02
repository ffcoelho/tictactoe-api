import { RequestHandler } from "express";
import { MatchDocModel } from "../model/match.model";

const Match = require("../data/dbMatch");

export const apiPostMatchJoin: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const matchSearch: MatchDocModel = await Match.findById(req.body.matchId);
    matchSearch.players.push({
      name: req.body.name
    });
    await matchSearch.save();
    res.status(200).json({ id: matchSearch.id });
  } catch (error) {
    res.status(400).json({ error });
  }
};
