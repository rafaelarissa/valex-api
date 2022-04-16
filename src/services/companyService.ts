import * as companyRepository from "../repositories/companyRepository.js";
import * as unauthorizedError from "../middlewares/handleErrors.js";

export default async function validateApiKey(apiKey: string) {
  const company = companyRepository.findByApiKey(apiKey);

  if(!company) throw unauthorizedError('x-api-key');

  return company;
}