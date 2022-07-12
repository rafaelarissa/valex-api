import * as cardService from "../services/cardService.js";
import * as handleError from "../middlewares/handleErrors.js";
import * as businessService from "../services/businessService.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

export async function create(
  cardId: number,
  businessId: number,
  password: string,
  amount: number
) {
  const card = await cardService.searchCardById(cardId);

  await cardService.searchCardById(cardId);

  await cardService.checkActivation(cardId);

  cardService.checkExpirationDate(card.expirationDate);

  if (card.isBlocked) throw handleError.badRequestError("");

  cardService.validatePassword(password, card.password);

  const business = await businessService.validateBusiness(businessId);

  if (business.type !== card.type)
    throw handleError.badRequestError("business type or card type");

  const cardTransactions = await cardService.get(cardId);

  if (cardTransactions.balance < amount)
    throw handleError.unauthorizedError("");

  paymentRepository.insert({
    cardId,
    businessId,
    amount,
  });
}
