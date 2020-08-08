"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Info = require("../data/dbInfo");
exports.apiGet = async (req, res, next) => {
    try {
        const infoSearch = await Info.find();
        if (!infoSearch) {
            return res.status(400).send("Something went wrong.");
        }
        const d = new Date();
        const date = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        infoSearch.lastAccess = date;
        await infoSearch.save();
        res.status(200).send("TicTacToe-API");
    }
    catch (error) {
        res.status(400).send("Something went wrong.");
    }
};
