import { Request, Response } from "express";
import * as cardService from "../../src/services/cardService.js";

export async function create(req: Request, res: Response) {
  const { employeeId, type } = req.body;
  const apiKey = req.headers["x-api-key"] as string;

  await cardService.create(apiKey, employeeId, type);
  res.sendStatus(201);
}
