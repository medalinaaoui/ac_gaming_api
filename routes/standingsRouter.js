import express from "express";
import Match from "../model/matches.js";
import User from "../model/users.js";

const matchesWithTeamInfosRouter = express.Router();

matchesWithTeamInfosRouter.get("/", async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find({}).populate("team");

    // Calculate standings
    const standings = [];

    for (const user of users) {
      const matches = await Match.find({
        $or: [{ homeTeam: user._id }, { awayTeam: user._id }],
        status: "played",
      });

      const userStats = {
        user: user.name,
        team: user.team.name,
        teamFlag: user.team.crest,
        points: 0,
        gamesPlayed: 0,
        rank: 0,
        wins: 0,
        draws: 0,
      };

      for (const match of matches) {
        userStats.gamesPlayed++;
        if (match.result) {
          if (match.homeTeam.equals(user._id)) {
            if (match.result.homeTeamGoals > match.result.awayTeamGoals) {
              userStats.points += 3; // 3 points for a win
              userStats.wins++;
            } else if (
              match.result.homeTeamGoals === match.result.awayTeamGoals
            ) {
              userStats.points += 1; // 1 point for a draw
              userStats.draws++;
            }
          } else if (match.awayTeam.equals(user._id)) {
            if (match.result.awayTeamGoals > match.result.homeTeamGoals) {
              userStats.points += 3; // 3 points for a win
              userStats.wins++;
            } else if (
              match.result.homeTeamGoals === match.result.awayTeamGoals
            ) {
              userStats.points += 1; // 1 point for a draw
              userStats.draws++;
            }
          }
        }
      }

      standings.push(userStats);
    }

    // Sort standings by points and gamesPlayed
    standings.sort((a, b) => {
      if (a.points === b.points) {
        return b.gamesPlayed - a.gamesPlayed;
      }
      return b.points - a.points;
    });

    // Assign ranks
    standings.forEach((user, index) => {
      user.rank = index + 1;
    });

    res.json(standings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default matchesWithTeamInfosRouter;
