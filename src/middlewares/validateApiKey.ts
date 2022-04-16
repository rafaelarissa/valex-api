import { Request, Response, NextFunction } from "express";
import { unauthorizedError } from "./handleErrors";

export async function validateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];
  
  if(!apiKey) throw unauthorizedError('x-api-key');

  // const company = await companyService.
}