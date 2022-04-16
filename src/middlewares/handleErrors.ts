import {  NextFunction, Request, Response } from "express";

export function unauthorizedError(entity: string) {
  return { 
    type: "unauthorized", 
    message: `Your authorization failed. Please enter the correct ${entity}`
  };
}

export default function handleErrorsMiddleware(err, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err.type === "unauthorized") return res.sendStatus(401);

  res.sendStatus(500);
}