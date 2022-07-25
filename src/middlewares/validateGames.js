import { gamesSchema } from "../schemas/gamesSchema.js";

export function ValidateGames(req, res, next) {
  const { error } = gamesSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((detail) => detail.message));
    return;
  }

  next();
}
