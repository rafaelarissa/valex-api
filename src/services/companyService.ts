import * as companyRepository from "../repositories/companyRepository.js";
import * as handleErrors from "../middlewares/handleErrors.js";

export async function validateApiKey(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);

  if (!company) throw handleErrors.unauthorizedError("x-api-key");

  return company;
}
