import { Document } from "mongoose";

export interface PlayerModel {
  id: string;
  name: string;
  online: boolean;
}

export interface GameStateModel {
  turn: number;
  table: number;
}

export interface MatchModel {
  id: string;
  active: boolean;
  players: PlayerModel[];
  state: GameStateModel;
}

export interface MatchDocModel extends Document {
  id: string;
  active: boolean;
  players: PlayerModel[];
  state: GameStateModel;
}

export interface MatchRequestModel {
  roomId: string;
  matchId: string;
  playerName: string;
}
