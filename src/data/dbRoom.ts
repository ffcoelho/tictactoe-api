import mongoose from "mongoose";
import { RoomDocModel } from "../model/room.model";

const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  matches: [{
    id: {
      type: String,
      required: true
    }
  }]
},
{
  collection: "rooms"
});

roomSchema.statics.findByUid = async (id: string) => {
  const room = await Room.findOne({id: id}) as RoomDocModel;
  if (!room) {
    throw new Error();
  } else {
    return room;
  }
}

const Room: mongoose.Model<RoomDocModel, {}> = mongoose.model("Room", roomSchema);

module.exports = Room;
