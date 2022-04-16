import { Router } from "express";
import validateApiKey from "../middlewares/validateApiKey.js";
import * as cardController from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card", validateApiKey, cardController.createCard);

export default cardRouter;
