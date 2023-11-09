import express from "express";
import teams from "../model/teams.js";

const allTeamsRouter = express.Router();

allTeamsRouter.get("/", async (req, res) => {
  try {
    const allTeams = await teams.find();

    res.status(200).json(allTeams);
  } catch (error) {
    console.log(
      "🚀 ~ file: teams.js:15 ~ allTeamsRouter.get ~ error all:",
      error
    );
    res.status(500).send("Server error");
  }
});

export default allTeamsRouter;
