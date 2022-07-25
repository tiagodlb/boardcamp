import { Router } from "express";

import {
  getCustomer,
  getCustomerId,
  postCustomers,
  putCustomers
} from "../controllers/customersController.js";
import { ValidateCustomer } from "../middlewares/validateCustomer.js";

const customerRouter = Router();

customerRouter.get("/customer", getCustomer);
customerRouter.get("/customer/:id", getCustomerId);
customerRouter.post("/customer", ValidateCustomer, postCustomers);
customerRouter.put("/customer/:id", ValidateCustomer, putCustomers);

export default customerRouter;
