import { NextFunction, Request, Response } from "express";
import { JWT_TOKEN_NAME, Messages } from "../utils/constants";
import { failResponse } from "../utils/response";
import { StatusCode } from "../utils/statusCode";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "../interfaces/express";
const authenticate= async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    const token=req.cookies[`${JWT_TOKEN_NAME}`];
    if(!token){
        failResponse(res,Messages.Not_Authorized_No_Token,StatusCode.Unauthorized);
        return;
    }
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
        req.userId=decoded.userId;
        req.userRole=decoded.role;
        next();
    }
    catch(error){
        console.error('error',error);
        failResponse(res,Messages.Invalid_Token,StatusCode.Unauthorized);
    }

}
export default authenticate;