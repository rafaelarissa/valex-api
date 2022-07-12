import * as businessRepository from "../repositories/businessRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";

export async function validateBusiness(businessId: number) {
  const business = await businessRepository.findById(businessId);

  if (!business) throw handleErrors.badRequestError("business");

  return business;
}
