import { Document } from "mongoose";

export interface RoomPublicModel {
  available: boolean;
}

export interface RoomDocModel extends Document {
  id: string;
  available: boolean;
  matchId: string;
}
