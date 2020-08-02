import mongoose from "mongoose";

export function connectDB() {
  mongoose.connect(process.env.MONGODB || "mongodb://localhost:27017",
    {
      dbName: "tictactoe",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  );
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongoDB connection error: "));
db.once("open", function() {
  console.log(`                └ mongoDB: ${mongoose.connections[0].host}:${mongoose.connections[0].port}`);
});
