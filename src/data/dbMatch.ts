import mongoose from "mongoose";
import { MatchDocModel } from "../model/match.model";

const matchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  players: [{
    name: {
      type: String,
      required: true
    }
  }],
  state: {
    turn: {
      type: Number,
      required: true
    },
    table: {
      type: Number,
      required: true
    }
  },
  status: {
    type: Boolean,
    required: true
  }
},
{
  collection: "matches"
});

matchSchema.statics.findByUid = async (id: string) => {
  const match = await Match.findOne({id: id}) as MatchDocModel;
  if (!match) {
    throw new Error();
  } else {
    return match;
  }
}

const Match: mongoose.Model<MatchDocModel, {}> = mongoose.model("Match", matchSchema);

module.exports = Match;
