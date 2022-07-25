import { Router } from "express";

import {
  getRentals,
  postRental,
  postRentalsReturn,
  deleteRentals,
} from "../controllers/rentalsController.js";
import { ValidateRentals } from "../middlewares/validateRentals.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", ValidateRentals, postRental);
rentalsRouter.post("/rentals/:id/return", postRentalsReturn);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
