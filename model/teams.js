import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema({
  name: String,
  shortName: String,
  tla: String,
  crest: String,
});

export default mongoose.model("Team", teamSchema);
