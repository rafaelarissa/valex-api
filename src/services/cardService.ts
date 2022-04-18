import * as cardRepository from "../repositories/cardRepository.js";
import * as handleError from "../middlewares/handleErrors.js";

export async function searchCardByTypeAndEmployeeId(type, employeeId: number) {
  const searchedCard = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );
  if (searchedCard) throw handleError.conflictError("Card");
}
