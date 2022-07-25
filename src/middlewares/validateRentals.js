import { rentalsSchema } from "../schemas/rentalsSchema.js";

export function ValidateRentals(req, res, next) {
  const { error } = rentalsSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((detail) => detail.message));
    return;
  }

  next();
}
