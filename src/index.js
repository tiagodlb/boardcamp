import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import categoryRouter from "./routes/categoryRoute.js";
import gamesRouter from "./routes/gamesRoute.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

//Routes

app.use(categoryRouter);
app.use(gamesRouter);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(chalk.bold.blue(`Server connected on port ${PORT}`))
);
