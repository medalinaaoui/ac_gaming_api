import express from "express";
import users from "../model/users.js";
import matches from "../model/matches.js";
import matchHandler from "../assets/matchesHandler.js";
const startGamesRouter = express.Router();

startGamesRouter.get("/", async (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  try {
    const userCount = await users.find({}, "name");

    if (userCount.length >= 10) {
      const games = matchHandler(userCount, formattedDate);
      const matchesCount = await matches.countDocuments({});
      if (matchesCount === 0) {
        const generatedGames = await matches.insertMany(games);
        return res.status(200).json(generatedGames);
      } else {
        return res.status(402).json({
          message: "الدوري بدء",
        });
      }
    } else {
      res.status(402).json({
        message: "Not enough players to generate a game",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Server Error");
  }
});

export default startGamesRouter;
