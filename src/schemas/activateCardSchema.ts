import joi from "joi";

const activateCardSchema = joi.object({
  cvv: joi.number().required(),
  password: joi.string().required(),
});

export default activateCardSchema;
