import express from "express";
import matches from "../model/matches.js";

const updateMatchResultRouter = express.Router();

updateMatchResultRouter.put("/:matchId", async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const { pass, ...result } = req.body;

    const match = await matches.findById(matchId);

    if (pass === "admin10") {
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }

      if (match.status !== "upcoming") {
        return res.status(400).json({ error: "Match is not upcoming" });
      }

      match.result = result;
      match.status = "played";
      console.log(
        "🚀 ~ file: updateMatche.js:22 ~ updateMatchResultRouter.put ~ match.result:",
        result
      );

      const updatedMatch = await match.save();

      res.status(200).json(updatedMatch);
    } else {
      return res.status(402).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

export default updateMatchResultRouter;
