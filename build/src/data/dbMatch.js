"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const matchSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    players: [{
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            online: {
                type: Boolean,
                required: true
            }
        }],
    state: {
        board: [{
                type: Number,
                required: true
            }],
        matchState: {
            type: String,
            required: true
        },
        score: [{
                type: Number,
                required: true
            }],
        turn: {
            type: Number,
            required: true
        },
        winLine: {
            type: String,
            required: true
        }
    }
}, {
    collection: "matches"
});
matchSchema.statics.findById = async (id) => {
    const match = await Match.findOne({ id: id });
    if (!match) {
        throw new Error();
    }
    else {
        return match;
    }
};
const Match = mongoose_1.default.model("Match", matchSchema);
module.exports = Match;
