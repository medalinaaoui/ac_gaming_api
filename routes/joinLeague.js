import express from "express";
import users from "../model/users.js";
import checkUserLimit from "../middleware/countChecker.js";
const joinLeagueRouter = express.Router();

joinLeagueRouter.post("/", checkUserLimit, async (req, res) => {
  const { joinCode, name, team } = req.body;

  if (!team || !joinCode || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const validJoinCode = 1388;
  if (Number(joinCode) !== validJoinCode) {
    return res.status(403).json({ error: "Invalid Join Code" });
  }

  try {
    const newUser = await users.create({
      name,
      team,
    });

    return res.status(201).json({
      message: "Successfully created user",
      data: newUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Server Error");
  }
});

export default joinLeagueRouter;
