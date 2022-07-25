import { Router } from "express";

import { getGames, postGames } from "../controllers/gamesController.js";
import { ValidateGames } from "../middlewares/validateGames.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", ValidateGames, postGames);

export default gamesRouter;
