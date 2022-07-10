import { Request, Response, NextFunction } from "express";
import * as handleErrors from "./handleErrors.js";
import * as companyService from "../services/companyService.js";

export default async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) throw handleErrors.unauthorizedError("x-api-key");

  next();
}
