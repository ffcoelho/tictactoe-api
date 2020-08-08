import { Document } from "mongoose";

export interface RoomPublicModel {
  rooms: number;
  available: number;
}

export interface RoomDocModel extends Document {
  id: string;
  available: boolean;
  matchId: string;
}
