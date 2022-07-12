import joi from "joi";

const lockUnlockCardSchema = joi.object({
  password: joi.string().required().length(4).pattern(new RegExp("^[0-9]{4}$")),
});

export default lockUnlockCardSchema;
