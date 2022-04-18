import { NextFunction, Request, Response } from "express";

export function unauthorizedError(entity: string) {
  return {
    type: "unauthorized",
    message: `Your authorization failed. Please enter the correct ${entity}`,
  };
}

export function notFoundError(entity: string) {
  return {
    type: "not_found",
    message: `The requested ${entity} was not found`,
  };
}

export function conflictError(entity: string) {
  return {
    type: "conflict",
    message: entity
      ? `A conflict has been generated with the "${entity}", please try again!`
      : `A conflict has been generated, please try again!`,
  };
}

export default function handleErrorsMiddleware(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.type === "unauthorized") return res.sendStatus(401);
  if (err.type === "not_found") return res.sendStatus(404);

  res.sendStatus(500);
}
