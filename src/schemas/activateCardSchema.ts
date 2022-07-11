import joi from "joi";

const activateCardSchema = joi.object({
  cvv: joi.string().required(),
  password: joi.string().required().length(4).pattern(new RegExp("^[0-9]{4}$")),
});

export default activateCardSchema;
