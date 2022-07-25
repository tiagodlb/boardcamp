import { Router } from "express";

import {
  getCustomer,
  getCustomerId,
  postCustomers,
  putCustomers,
} from "../controllers/customersController.js";
import { ValidateCustomer } from "../middlewares/validateCustomer.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomer);
customerRouter.get("/customers/:id", getCustomerId);
customerRouter.post("/customers", ValidateCustomer, postCustomers);
customerRouter.put("/customers/:id", ValidateCustomer, putCustomers);

export default customerRouter;
