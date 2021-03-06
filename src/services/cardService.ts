import dotenv from "dotenv";
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as handleError from "../middlewares/handleErrors.js";
import * as companyService from "../services/companyService.js";
import * as employeeService from "../services/employeeService.js";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
dotenv.config();

const cryptr = new Cryptr(process.env.secret);

export async function create(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  await companyService.validateApiKey(apiKey);

  const employee = await employeeService.validateEmployee(employeeId);

  await searchCardByTypeAndEmployeeId(type, employeeId);

  const cardData = generateCardData(employee.fullName);
  await cardRepository.insert({
    employeeId,
    ...cardData,
    isVirtual: false,
    isBlocked: false,
    type,
  });
}

function generateCardData(employee: string) {
  const cardholderName = setCardholderName(employee);
  const number = setCardNumber();
  const securityCode = setCardCVV();
  const expirationDate = setExpirationDate();

  return { cardholderName, number, securityCode, expirationDate };
}

function setCardNumber() {
  let number = faker.finance.creditCardNumber();

  return number.split("-").join("");
}

function setCardCVV() {
  const cvv = faker.finance.creditCardCVV();
  console.log(cvv);
  return cryptr.encrypt(cvv);
}

function setCardholderName(fullName: string) {
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

async function searchCardByTypeAndEmployeeId(
  type: cardRepository.TransactionTypes,
  employeeId: number
) {
  const searchedCard = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (searchedCard) throw handleError.conflictError("Card");
}

function setExpirationDate() {
  return dayjs().add(5, "year").format("MM/YY");
}

export async function activate(
  cardId: number,
  cardCVV: string,
  password: string
) {
  const card = await searchCardById(cardId);

  checkExpirationDate(card.expirationDate);

  const isActive = card.password;
  if (isActive) throw handleError.badRequestError("");

  validateCVV(card.securityCode, cardCVV);

  const hashedPassword = bcrypt.hashSync(password, 10);

  await cardRepository.update(cardId, { password: hashedPassword });
}

export async function searchCardById(cardId: number) {
  const card = await cardRepository.findById(cardId);

  if (!card) throw handleError.notFoundError("Card");

  return card;
}

export function checkExpirationDate(expirationDate: string) {
  const today = dayjs().format("MM/YY");

  if (dayjs(today).isAfter(dayjs(expirationDate))) {
    throw handleError.badRequestError("expiration date");
  }
}

function validateCVV(encryptedCVV: string, cardCVV: string) {
  const decryptedCVV = cryptr.decrypt(encryptedCVV);

  if (decryptedCVV !== cardCVV) throw handleError.unauthorizedError("cvv");
}

export async function get(cardId: number) {
  await searchCardById(cardId);

  const recharges = await searchRechargesByCardId(cardId);
  const transactions = await searchTransactionsByCardId(cardId);

  const balance = recharges.amount - transactions.amount;

  return {
    balance,
    transactions: {
      ...transactions,
    },
    recharges: {
      ...recharges,
    },
  };
}

export async function searchRechargesByCardId(cardId: number) {
  const recharges = await rechargeRepository.findByCardId(cardId);

  return recharges[0];
}

export async function searchTransactionsByCardId(cardId: number) {
  const transactions = await paymentRepository.findByCardId(cardId);

  return transactions[0];
}

export async function lockCard(cardId: number, password: string) {
  const card = await searchCardById(cardId);

  checkExpirationDate(card.expirationDate);

  if (card.isBlocked) throw handleError.badRequestError("");

  validatePassword(password, card.password);

  await cardRepository.update(cardId, { isBlocked: true });
}

export async function unlockCard(cardId: number, password: string) {
  const card = await searchCardById(cardId);

  checkExpirationDate(card.expirationDate);

  if (!card.isBlocked) throw handleError.badRequestError("");

  validatePassword(password, card.password);

  await cardRepository.update(cardId, { isBlocked: false });
}

export function validatePassword(password: string, hashedPassword: string) {
  if (!bcrypt.compareSync(password, hashedPassword)) {
    throw handleError.unauthorizedError("password");
  }
}

export async function checkActivation(cardId: number) {
  const card = await searchCardById(cardId);

  if (!card.password) throw handleError.badRequestError("active card");
}
