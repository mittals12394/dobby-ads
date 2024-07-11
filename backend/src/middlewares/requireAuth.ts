import { Request, Response, NextFunction } from "express";
import security from "../security";

interface UserPayload {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(404).send({ message: "Not found" });
  }
  const token: string = authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = security.decodeToken(token) as UserPayload;
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).send({ message: "Invalid Token" });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export default requireAuth;
