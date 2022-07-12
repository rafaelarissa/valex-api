import * as handleError from "../middlewares/handleErrors.js";
import * as cardService from "../services/cardService.js";
import * as companyService from "../services/companyService.js";
import * as employeeService from "../services/employeeService.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function recharge(cardId: number, amount: number, apiKey: string) {
  const card = await cardService.searchCardById(cardId);

  await cardService.checkActivation(cardId);

  cardService.checkExpirationDate(card.expirationDate);

  const company = await companyService.validateApiKey(apiKey);
  const employee = await employeeService.validateEmployee(card.employeeId);

  if (employee.companyId !== company.id)
    throw handleError.unauthorizedError("");

  await rechargeRepository.insert({
    cardId,
    amount,
  });
}
