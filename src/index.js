import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import categoryRouter from "./routes/categoryRoute.js";
import gamesRouter from "./routes/gamesRoute.js";
import customerRouter from "./routes/customersRoute.js";
import rentalsRouter from "./routes/rentalsRoute.js"

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

//Routes

app.use(categoryRouter);
app.use(gamesRouter);
app.use(customerRouter);
app.use(rentalsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(chalk.bold.blue(`Server connected on port ${PORT}`))
);
