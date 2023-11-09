import users from "../model/users.js";
import matches from "../model/matches.js";

async function checkUserLimit(req, res, next) {
  try {
    const userCount = await users.countDocuments();

    if (userCount >= 10) {
      return res
        .status(403)
        .json({ error: "Maximum user limit reached (safy baraka)" });
    }
    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Server Error");
  }
}

export default checkUserLimit;
