import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import joinLeagueRouter from "./routes/joinLeague.js";
import teamsRouter from "./routes/teams.js";
import allTeamsRouter from "./routes/allTeams.js";
import startGamesRouter from "./routes/startGames.js";
import matchesRouter from "./routes/matches.js";
import updateMatcheRouter from "./routes/updateMatche.js";
import matchesWithTeamInfosRouter from "./routes/matchesWithTeamInfo.js";
import playedatchesWithTeamInfosRouter from "./routes/playedatchesWithTeamInfosRouter.js";
import standingsRouter from "./routes/standingsRouter.js";
import corsOptions from "./config/corsOptions.js";

const app = express();
dotenv.config();
const port = 8001;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors(corsOptions));

app.use("/api/join/league", joinLeagueRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/allteams", allTeamsRouter);
app.use("/api/start", startGamesRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/update-match", updateMatcheRouter);
app.use("/api/matches-with-team-infos", matchesWithTeamInfosRouter);
app.use("/api/plyed-matches-with-team-infos", playedatchesWithTeamInfosRouter);
app.use("/api/standings", standingsRouter);
const connect = async () => {
  try {
    await mongoose.connect(process.env.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected successfully");
    app.listen(process.env.PORT || port, (error) => {
      if (!error) console.log("server runnig on port: ", port);
    });
    // await teams.insertMany(teamsData);
  } catch (error) {
    if (error) console.log("error from connecting to mongoDb: ", error);
  }
};
connect();
