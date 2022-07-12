import joi from "joi";

const paymentSchema = joi.object({
  password: joi.string().required(),
  amount: joi.number().min(1).required(),
});

export default paymentSchema;
