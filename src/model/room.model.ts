import { Document } from "mongoose";

export interface MatchIdModel {
  id: string;
}

export interface RoomDocModel extends Document {
  id: string;
  matches: MatchIdModel[];
}
