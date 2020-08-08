"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const apiGet_1 = require("./apiGet");
const apiGetInfo_1 = require("./apiGetInfo");
const apiPostMatch_1 = require("./apiPostMatch");
const apiPostMatchJoin_1 = require("./apiPostMatchJoin");
exports.apiRouter = express_1.Router();
const jsonParser = body_parser_1.default.json();
exports.apiRouter.route("/").get(apiGet_1.apiGet);
exports.apiRouter.route("/info").get(apiGetInfo_1.apiGetInfo);
exports.apiRouter.route("/match").post(apiPostMatch_1.apiPostMatch);
exports.apiRouter.route("/join").post(jsonParser, apiPostMatchJoin_1.apiPostMatchJoin);
