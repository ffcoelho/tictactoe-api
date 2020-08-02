import { Document } from "mongoose";

export interface PlayerModel {
  name: string;
}

export interface GameStateModel {
  turn: number;
  table: number;
}

export interface MatchDocModel extends Document {
  id: string;
  players: PlayerModel[];
  state: GameStateModel;
  status: boolean;
}
