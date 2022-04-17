import { Router } from "express";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import * as cardSchema from "../schemas/cardSchema.js";
import * as cardController from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post(
  "/card",
  validateApiKey,
  validateSchemaMiddleware(cardSchema),
  cardController.createCard
);

export default cardRouter;
