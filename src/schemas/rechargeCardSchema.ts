import joi from "joi";

const rechargeCardSchema = joi.object({
  amount: joi.number().min(1).required(),
});

export default rechargeCardSchema;
