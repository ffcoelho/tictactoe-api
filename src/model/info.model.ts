import { Document } from "mongoose";

export interface InfoDocModel extends Document {
  lastAccess: string;
}
