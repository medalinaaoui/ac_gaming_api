import mongoose from "mongoose";

const { Schema } = mongoose;

const matchSchema = new Schema({
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  day: Number,
  time: String,
  status: {
    type: String,
    enum: ["upcoming", "played"],
    default: "upcoming",
  },
  result: {
    homeTeamGoals: Number,
    awayTeamGoals: Number,
  },
  timestamp: Date,
});

export default mongoose.model("Match", matchSchema);
