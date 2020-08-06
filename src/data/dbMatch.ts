import mongoose from "mongoose";
import { MatchDocModel } from "../model/match.model";

const matchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  active: {
    type: Boolean,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  players: [{
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    online: {
      type: Boolean,
      required: true
    }
  }],
  state: {
    board: [{
      type: Number,
      required: true
    }],
    matchState: {
      type: String,
      required: true
    },
    score: [{
      type: Number,
      required: true
    }],
    turn: {
      type: Number,
      required: true
    },
    winLine: {
      type: String,
      required: true
    }
  }
},
{
  collection: "matches"
});

matchSchema.statics.findById = async (id: string) => {
  const match = await Match.findOne({id: id}) as MatchDocModel;
  if (!match) {
    throw new Error();
  } else {
    return match;
  }
}

const Match: mongoose.Model<MatchDocModel, {}> = mongoose.model("Match", matchSchema);

module.exports = Match;
