import * as handleErrors from "../middlewares/handleErrors.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

export async function validateEmployee(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);

  if (!employee) throw handleErrors.badRequestError("employee");

  return employee;
}
