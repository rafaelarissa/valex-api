import { Router } from "express";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import * as cardController from "../controllers/cardController.js";
import cardSchema from "../schemas/cardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/cards/create",
  validateApiKey,
  validateSchemaMiddleware(cardSchema),
  cardController.create
);

cardRouter.patch(
  "/cards/:id/activate",
  validateSchemaMiddleware(activateCardSchema),
  cardController.activate
);

export default cardRouter;
