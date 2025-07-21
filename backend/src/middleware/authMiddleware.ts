import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/db";
import { Request, Response, NextFunction } from "express";
import { failResponse } from "../utils/response";
import { StatusCode } from "../utils/statusCode";
import { Messages } from "../utils/constants";

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    failResponse(res, Messages.Not_Authorized_No_Token, StatusCode.Unauthorized);
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    failResponse(res, Messages.Invalid_Token, StatusCode.Unauthorized);
    return;
  }
};


export default authenticate;
