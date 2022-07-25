import joi from "joi";

export const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required().allow(""),
    stockTotal: joi.number().positive().greater(0).required(),
    pricePerDay: joi.number().positive().greater(0).required(),
    categoryId: joi.string().required()
});