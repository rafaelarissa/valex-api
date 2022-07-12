import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";

export async function create(req: Request, res: Response) {
  const { id, businessId } = req.params;
  const { password, amount } = req.body;

  await paymentService.create(Number(id), Number(businessId), password, amount);
  res.sendStatus(201);
}
