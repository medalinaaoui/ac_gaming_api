import express from "express";
import matches from "../model/matches.js";

const matchesRouter = express.Router();

matchesRouter.get("/", async (req, res) => {
  try {
    const allMatches = await matches.find({ status: "upcoming" });

    if (allMatches.length === 0) {
      // If there are no matches in the collection, send a 404 Not Found response.
      res.status(404).json({ message: "No matches found", available: false });
    } else {
      // If matches are found, send them as a JSON response.
      res.status(200).json(allMatches);
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: teams.js:15 ~ matchesRouter.get ~ error all:",
      error
    );
    res.status(500).send("Server error");
  }
});

export default matchesRouter;
