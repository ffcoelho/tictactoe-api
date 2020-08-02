import socketIO from "socket.io";
import { MatchRequestModel, MatchDocModel, MatchModel } from "../model/match.model";

const Room = require("../data/dbRoom");
const Match = require("../data/dbMatch");

const apiSocket = (io: SocketIO.Server) => {

  io.on("connection", (socket: socketIO.Socket) => {
    let playerId: string;
    let matchId: string;
    const safeJoin = (match: string, player: string) => {
      socket.leave(matchId);
      socket.join(match);
      matchId = match;
      playerId = player;
    }

    socket.on("join", async (joinReqObj: MatchRequestModel) => {
      try {
        const matchSearch: MatchDocModel = await Match.findByUid(joinReqObj.matchId);
        if (!matchSearch) {
          return socket.disconnect(true);
        }
        matchSearch.players.forEach(player => {
          if (joinReqObj.playerId === player.id) {
            player.online = true;
            return;
          }
        });
        await matchSearch.save();
        const matchData: MatchModel = {
          active: matchSearch.active,
          id: matchSearch.id,
          players: matchSearch.players,
          state: matchSearch.state
        };
        safeJoin(joinReqObj.matchId, joinReqObj.playerId);
        io.in(joinReqObj.matchId).emit("update", matchData);
      } catch (error) {
        console.log(`socket.join`, error)
      }
    });

    socket.on("disconnect", async (socket: socketIO.Socket) => {
      try {
        const matchSearch: MatchDocModel = await Match.findByUid(matchId);
        if (!matchSearch) {
          return;
        }
        matchSearch.players.forEach(player => {
          if (playerId === player.id) {
            player.online = false;
            matchSearch.active = false;
            return;
          }
        });
        await matchSearch.save();
        const matchData: MatchModel = {
          active: matchSearch.active,
          id: matchSearch.id,
          players: matchSearch.players,
          state: matchSearch.state
        };
        socket.leave(matchId);
        io.in(matchId).emit("update", matchData);
      } catch (error) {
        console.log(`socket.disconnect`, error)
      }
    });
  });
}

module.exports = apiSocket;
