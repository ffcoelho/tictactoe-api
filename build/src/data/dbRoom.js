"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    available: {
        type: Boolean,
        required: true
    },
    matchId: {
        type: String,
        required: true
    }
}, {
    collection: "rooms"
});
roomSchema.statics.findAll = async () => {
    const room = await Room.find();
    if (!room) {
        throw new Error();
    }
    else {
        return room;
    }
};
roomSchema.statics.findById = async (id) => {
    const room = await Room.findOne({ id: id });
    if (!room) {
        throw new Error();
    }
    else {
        return room;
    }
};
roomSchema.statics.findAvailable = async () => {
    const room = await Room.findOne({ available: true });
    if (!room) {
        throw new Error();
    }
    else {
        return room;
    }
};
const Room = mongoose_1.default.model("Room", roomSchema);
module.exports = Room;
