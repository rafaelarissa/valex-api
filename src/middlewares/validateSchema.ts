import { NextFunction, Request, Response } from "express";
import cardSchema from "../schemas/cardSchema.js";

export default function validateSchemaMiddleware(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = cardSchema.validate(req.body, { abortEarly: false });
    if (validation.error) return res.status(422).send(validation.error.message);

    next();
  };
}
