import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import common from "../common";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new common.RequestValidationError(errors.array());
  }

  next();
};

export default validateRequest;
