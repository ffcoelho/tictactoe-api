"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const infoSchema = new mongoose_1.default.Schema({
    lastAccess: {
        type: String,
        required: true,
    }
}, {
    collection: "info"
});
infoSchema.statics.find = async () => {
    const info = await Info.findOne();
    return info;
};
const Info = mongoose_1.default.model("Info", infoSchema);
module.exports = Info;
