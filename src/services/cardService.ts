import * as cardRepository from "../repositories/cardRepository.js";
import * as handleError from "../middlewares/handleErrors.js";
import { faker } from "@faker-js/faker";
//gerar dados do cartão aqui

export function setCardNumber() {
  let number = faker.finance.creditCardNumber("mastercard");
  // let isNumber = valid_card(number);

  // while (number[0].toString() === '6' || !isNumber) {
  // 	number = faker.finance.creditCardNumber('mastercard');
  // 	isNumber = valid_card(number);

  // 	if (number[0].toString() === '5' && isNumber) {
  // 		break;
  // 	}
  // }

  // if (number[0].toString() === '5') {
  // 	while (!isNumber) {
  // 		isNumber = valid_credit_card(number);
  // 	}
  // }

  return number.split("-").join("");
}

export async function searchCardByTypeAndEmployeeId(type, employeeId: number) {
  const searchedCard = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (searchedCard) throw handleError.conflictError("Card");
}
