import * as handleErrors from "../middlewares/handleErrors.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

export async function validateEmployee(employeeId: number) {
  //verificar se o id passado por params e od recebido na funçáo são iguais
  //verificar se o id do empregado passado por params existe no banco
  const employee = await employeeRepository.findById(employeeId);

  if (!employee) throw handleErrors.notFoundError("employee");
}
