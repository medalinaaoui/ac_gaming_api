import express from "express";
import matches from "../model/matches.js";

const matchesWithTeamInfosRouter = express.Router();

matchesWithTeamInfosRouter.get("/", async (req, res) => {
  try {
    const unSortedResult = await matches
      .find({ status: "upcoming" })
      .populate({
        path: "homeTeam",
        populate: {
          path: "team",
        },
      })
      .populate({
        path: "awayTeam",
        populate: {
          path: "team",
        },
      })
      .exec();
    const result = unSortedResult.sort((a, b) => a.day - b.day);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

export default matchesWithTeamInfosRouter;
