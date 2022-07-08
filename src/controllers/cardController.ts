import { Request, Response } from "express";
export async function create(req: Request, res: Response) {
  res.status(200).send("cheguei na controller pra cadastrar o cartão");
}
