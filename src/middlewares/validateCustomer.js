import { customerSchema } from "../schemas/customerSchema.js";

export function ValidateCustomer(req, res, next) {
  const { error } = customerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((detail) => detail.message));
    return;
  }

  next();
}
