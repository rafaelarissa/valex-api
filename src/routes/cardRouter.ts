import { Router } from "express";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.js";
import * as cardController from "../controllers/cardController.js";
import cardSchema from "../schemas/cardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import lockUnlockCardSchema from "../schemas/lockUnlockCardSchema.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";

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

cardRouter.get("/cards/:id", cardController.get);

cardRouter.patch(
  "/cards/:id/lock",
  validateSchemaMiddleware(lockUnlockCardSchema),
  cardController.lockCard
);

cardRouter.patch(
  "/cards/:id/unlock",
  validateSchemaMiddleware(lockUnlockCardSchema),
  cardController.unlockCard
);

cardRouter.post(
  "/cards/:id/recharge",
  validateApiKey,
  validateSchemaMiddleware(rechargeCardSchema),
  cardController.rechargeCard
);

export default cardRouter;
