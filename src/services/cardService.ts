import * as cardRepository from "../repositories/cardRepository.js";
import * as handleError from "../middlewares/handleErrors.js";
import * as companyService from "../services/companyService.js";
import * as employeeService from "../services/employeeService";
import { checkCardValidation } from "../../utils/cardUtils.js";
import { faker } from "@faker-js/faker";

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.secret);

export async function create(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  await companyService.validateApiKey(apiKey);

  const employee = await employeeService.validateEmployee(employeeId);

  await searchCardByTypeAndEmployeeId(type, employeeId);

  setCardHolderName(employee.fullName);
}

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

export function setCardCVV() {
  const cvv = faker.finance.creditCardCVV();

  return cryptr.encrypt(cvv);
}

function setCardHolderName(fullName: string) {
  const fullNameArray = fullName.split(" ");
  const lastName = fullNameArray.pop();
  const firstName = fullNameArray.shift();
  const middleNames = fullNameArray
    .filter((middleName) => middleName.length >= 3)
    .map((middleName) => {
      return middleName[0];
    });

  if (middleNames.length > 0) {
    return [firstName, middleNames, lastName].join(" ").toUpperCase();
  }
  return [firstName, lastName].join(" ").toUpperCase();
}

export async function searchCardByTypeAndEmployeeId(
  type: cardRepository.TransactionTypes,
  employeeId: number
) {
  const searchedCard = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (searchedCard) throw handleError.conflictError("Card");
}
