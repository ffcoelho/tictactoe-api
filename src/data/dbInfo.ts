import mongoose from "mongoose";
import { InfoDocModel } from "../model/info.model";

const infoSchema = new mongoose.Schema({
  lastAccess: {
    type: String,
    required: true,
  }
},
{
  collection: "info"
});

infoSchema.statics.find = async () => {
  const info = await Info.findOne() as InfoDocModel;
  return info;
}

const Info: mongoose.Model<InfoDocModel, {}> = mongoose.model("Info", infoSchema);

module.exports = Info;
