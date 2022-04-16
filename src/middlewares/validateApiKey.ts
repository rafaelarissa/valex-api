import { Request, Response, NextFunction } from "express";
import * as handleErrors from "./handleErrors.js";
import * as companyService from "../services/companyService.js";

export default async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];
  console.log("cheguei aqui pra checar se existe api key");
  console.log(apiKey);

  if (!apiKey) throw handleErrors.unauthorizedError("x-api-key");

  const company = await companyService.validateApiKey(apiKey.toString());
  console.log(company);
  res.locals.company = company;

  next();
}
