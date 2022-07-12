import joi from "joi";

const paymentSchema = joi.object({
  password: joi.string().required(),
  amount: joi.number().required(),
});

export default paymentSchema;
