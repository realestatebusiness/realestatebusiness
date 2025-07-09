import { Request, Response, NextFunction, RequestHandler } from 'express';import { Messages } from "./constants";

export const successResponse=(res:Response,data:any,message:string,statusCode=200)=>{
    return res.status(statusCode).json({
        status:Messages.Success,
        message,
        data
    })
}

export const failResponse=(res:Response,message:string ,statusCode=400)=>{
    return res.status(statusCode).json({
        status:Messages.Fail,
        message,
    })
}

export const errorResponse=(res:Response,message:string,statusCode = 500,error=null)=>{
    return res.status(statusCode).json({
        status:Messages.Internal_Server_Error,
        message,
        error
    })
}
