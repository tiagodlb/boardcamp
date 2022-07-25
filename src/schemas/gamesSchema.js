import joi from "joi";

export const gamesSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required().allow(""),
  stockTotal: joi.number().positive().integer().greater(0).required(),
  pricePerDay: joi.number().positive().integer().greater(0).required(),
  categoryId: joi.number().integer().positive().required(),
});
