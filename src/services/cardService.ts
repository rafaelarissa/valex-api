import * as cardRepository from "../repositories/cardRepository.js";
import * as handleError from "../middlewares/handleErrors.js";
import { checkCardValidation } from "../utils/cardUtils.js";
import { faker } from "@faker-js/faker";
//gerar dados do cartão aqui

export function setCardNumber() {
  let number = faker.finance.creditCardNumber("mastercard");
  let isNumber = checkCardValidation(number);

  while (!isNumber) {
    number = faker.finance.creditCardNumber("mastercard");
    isNumber = checkCardValidation(number);

    if (isNumber) {
      break;
    }
  }

  return number.split("-").join("");
}

export async function searchCardByTypeAndEmployeeId(type, employeeId: number) {
  const searchedCard = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (searchedCard) throw handleError.conflictError("Card");
}
