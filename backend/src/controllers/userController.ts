import { genSalt } from "bcryptjs";
import UserModel from "../schema/userSchema";
import { Messages } from "../utils/constants";
import { failResponse, successResponse } from "../utils/response";
import { StatusCode } from "../utils/statusCode";

import bcrypt from "bcryptjs";
import { Response } from "express";


const register = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password, role, phoneNumber } = req.body;

    if (!name || email || password || role || phoneNumber) {
        failResponse(res, Messages.Missing_Fields_Required, StatusCode.Bad_Request);
        return;
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            failResponse(res, Messages.User_Exists, StatusCode.Bad_Request);
            return;
        }
        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({
            name,
            email,
            password,
            passwordHash,
            phoneNumber,
            role: [role],
            status: Status.Active,
            isActive: true,
            version: 1,
            createdBy: req.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
       return successResponse(res,newUser, Messages.Register_Sucess, StatusCode.Created) ;

    }
    catch (error) {
        console.error('Registration error', error);
        failResponse(res, Messages.Register_Fail, StatusCode.Internal_Server_Error)
    }

}

const login= async(req:Request,res:Response):Promise<any>=>{


    try{

    }
    catch(error){
        console.error('Login failed',error);
        failResponse(res,Messages.Login_Fail,StatusCode.Internal_Server_Error)
    }
}
