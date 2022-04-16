//validação do tipo do cartão deverá ser feita aqui
import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) {
  console.log("cheguei na etapa de criar o cartão!");
  res.send("pronto pra criar o cartão!");
  // const cardDetails= req.body;

  // const cardResult = await cardService.insert()
}
