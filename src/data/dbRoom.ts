import mongoose from "mongoose";
import { RoomDocModel } from "../model/room.model";

const roomSchema = new mongoose.Schema({
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
},
{
  collection: "rooms"
});

roomSchema.statics.findAll = async () => {
  const room = await Room.find() as RoomDocModel[];
  if (!room) {
    throw new Error();
  } else {
    return room;
  }
}

roomSchema.statics.findById = async (id: string) => {
  const room = await Room.findOne({id: id}) as RoomDocModel;
  if (!room) {
    throw new Error();
  } else {
    return room;
  }
}

roomSchema.statics.findAvailable = async () => {
  const room = await Room.findOne({available: true}) as RoomDocModel;
  if (!room) {
    throw new Error();
  } else {
    return room;
  }
}

const Room: mongoose.Model<RoomDocModel, {}> = mongoose.model("Room", roomSchema);

module.exports = Room;
