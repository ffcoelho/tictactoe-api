"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Info = require("../data/dbInfo");
const Room = require("../data/dbRoom");
exports.apiGetInfo = async (req, res, next) => {
    try {
        const infoSearch = await Info.find();
        if (!infoSearch) {
            return res.status(400).send("Something went wrong.");
        }
        const roomsSearch = await Room.findAll();
        if (!roomsSearch) {
            return res.status(400).send("Something went wrong.");
        }
        const rooms = { available: 0, rooms: 0 };
        roomsSearch.forEach((roomDoc) => {
            rooms.rooms++;
            if (roomDoc.available) {
                rooms.available++;
            }
        });
        const d = new Date();
        const date = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        infoSearch.lastAccess = date;
        await infoSearch.save();
        res.status(200).json({ rooms });
    }
    catch (error) {
        res.status(400).send("Something went wrong.");
    }
};
