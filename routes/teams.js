import express from "express";
import teams from "../model/teams.js";

const teamsRouter = express.Router();

teamsRouter
  .get("/:id", async (req, res) => {
    const teamId = req.params.id;
    if (!teamId) return res.status(401).json({ message: "params missing" });
    try {
      const currTeam = await teams.findById(teamId);

      res.status(200).json(currTeam);
    } catch (error) {
      console.log("🚀 ~ file: teams.js:15 ~ teamsRouter.get ~ error:", error);
      res.status(500).send("Server error");
    }
  })
  .get("/all", async (req, res) => {
    try {
      const allTeams = await teams.find();

      res.status(200).json(allTeams);
    } catch (error) {
      console.log(
        "🚀 ~ file: teams.js:15 ~ teamsRouter.get ~ error all:",
        error
      );
      res.status(500).send("Server error");
    }
  });

export default teamsRouter;
