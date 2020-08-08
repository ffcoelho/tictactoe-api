"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("../model/game");
const Room = require("../data/dbRoom");
const Match = require("../data/dbMatch");
const apiSocket = (io) => {
    io.on("connection", (socket) => {
        let playerId;
        let matchId;
        const safeJoin = (match, player) => {
            socket.leave(matchId);
            socket.join(match);
            matchId = match;
            playerId = player;
        };
        socket.on("play", async (place) => {
            try {
                const matchSearch = await Match.findById(matchId);
                if (!matchSearch) {
                    return socket.disconnect(true);
                }
                if (matchSearch.state.board[place] !== 0) {
                    return;
                }
                const turn = matchSearch.state.turn;
                const board = [...matchSearch.state.board];
                board[place] = turn;
                matchSearch.state.board = board;
                matchSearch.state.turn = turn === 1 ? 2 : 1;
                const game = new game_1.Game(board);
                const roundResult = game.state();
                if (roundResult.winLine !== "none") {
                    const score = [...matchSearch.state.score];
                    score[roundResult.scoreIdx]++;
                    matchSearch.state.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    matchSearch.state.score = score;
                    matchSearch.state.matchState = "play";
                }
                const matchData = {
                    id: matchSearch.id,
                    active: matchSearch.active,
                    players: matchSearch.players,
                    state: {
                        board,
                        matchState: roundResult.state,
                        score: matchSearch.state.score,
                        turn: matchSearch.state.turn,
                        winLine: roundResult.winLine
                    }
                };
                await matchSearch.save();
                io.in(matchId).emit("update", matchData);
            }
            catch (error) {
                console.log(`socket.play`, error);
            }
        });
        socket.on("join", async (joinReqObj) => {
            try {
                const matchSearch = await Match.findById(joinReqObj.matchId);
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
                const matchData = {
                    id: matchSearch.id,
                    active: matchSearch.active,
                    players: matchSearch.players,
                    state: matchSearch.state
                };
                await matchSearch.save();
                safeJoin(joinReqObj.matchId, joinReqObj.playerId);
                io.in(joinReqObj.matchId).emit("update", matchData);
            }
            catch (error) {
                console.log(`socket.join`, error);
            }
        });
        socket.on("disconnect", async (socket) => {
            try {
                const matchSearch = await Match.findById(matchId);
                if (!matchSearch) {
                    return;
                }
                matchSearch.state.turn = 0;
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
                    const roomSearch = await Room.findById(matchSearch.room);
                    roomSearch.available = true;
                    await roomSearch.save();
                    await matchSearch.save();
                    return;
                }
                await matchSearch.save();
                const matchData = {
                    active: matchSearch.active,
                    id: matchSearch.id,
                    players: matchSearch.players,
                    state: matchSearch.state
                };
                io.in(matchId).emit("update", matchData);
            }
            catch (error) {
                console.log(`socket.disconnect error:`);
                console.log(`matchId: ${matchId}`);
                console.log(`playerId: ${playerId}`);
                console.log(`error:`, error);
            }
        });
    });
};
module.exports = apiSocket;
