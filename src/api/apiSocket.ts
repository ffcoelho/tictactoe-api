import socketIO from "socket.io";
import { MatchRequestModel, MatchDocModel, MatchModel } from "../model/match.model";
import { RoomDocModel } from "../model/room.model";

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
        const matchSearch: MatchDocModel = await Match.findById(joinReqObj.matchId);
        if (!matchSearch) {
          return socket.disconnect(true);
        }
        let onlinePlayer = false;
        matchSearch.players.forEach(player => {
          if (joinReqObj.playerId === player.id) {
            player.online = true;
            onlinePlayer = true;
            return;
          }
        });
        if (!onlinePlayer) {
          return socket.disconnect(true);
        }
        const matchData: MatchModel = {
          id: matchSearch.id,
          active: matchSearch.active,
          players: matchSearch.players,
          state: matchSearch.state
        };
        await matchSearch.save();
        safeJoin(joinReqObj.matchId, joinReqObj.playerId);
        io.in(joinReqObj.matchId).emit("update", matchData);
      } catch (error) {
        console.log(`socket.join`, error)
      }
    });

    socket.on("disconnect", async (socket: socketIO.Socket) => {
      try {
        const matchSearch: MatchDocModel = await Match.findById(matchId);
        if (!matchSearch) {
          return;
        }
        let playersOnline = 0;
        for (let i = 0; i < matchSearch.players.length; i++) {
          if (playerId === matchSearch.players[i].id) {
            matchSearch.players[i].online = false;
            matchSearch.active = false;
          }
          if (matchSearch.players[i].online) {
            playersOnline++;
          }
        }
        if (playersOnline === 0) {
          const roomSearch: RoomDocModel = await Room.findById(matchSearch.room);
          roomSearch.available = true;
          await roomSearch.save();
          await matchSearch.save();
          return;
        }
        await matchSearch.save();
        const matchData: MatchModel = {
          active: matchSearch.active,
          id: matchSearch.id,
          players: matchSearch.players,
          state: matchSearch.state
        };
        io.in(matchId).emit("update", matchData);
      } catch (error) {
        console.log(`socket.disconnect`, error)
      }
    });
  });
}

module.exports = apiSocket;
