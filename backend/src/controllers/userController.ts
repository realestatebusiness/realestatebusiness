import { genSalt } from "bcryptjs";
import UserModel, { Status } from "../schema/userSchema";
import { JWT_TOKEN_NAME, Messages } from "../utils/constants";
import { failResponse, successResponse } from "../utils/response";
import { StatusCode } from "../utils/statusCode";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import generateToken from "../utils/jwtUtils";


const registerUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password, role, phoneNumber } = req.body;
    console.log('reqbody',req.body)

    if (!name || !email || !password || !phoneNumber) {
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
            password: passwordHash,
            phoneNumber,
            role: [role],
            isActive: true,
            version: 1,
            createdBy: req.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return successResponse(res, newUser, Messages.Register_Sucess, StatusCode.Created);

    }
    catch (error) {
        console.error('Registration error', error);
        failResponse(res, Messages.Register_Fail, StatusCode.Internal_Server_Error)
    }

}

const login = async (req: Request, res: Response): Promise<any> => {
    const { email, phoneNumber, password } = req.body;
    console.log('user',req.body)
    if (!phoneNumber && (!email || !password)) {
        failResponse(res, Messages.Missing_Fields_Required, StatusCode.Bad_Request);
        return
    }

    try {
        let user;
        if (phoneNumber && !email && !password) {
            user = await UserModel.findOne({ phoneNumber });
            if (!user) {
                failResponse(res, Messages.User_Not_Found, StatusCode.Unauthorized);
                return;
            }
        }
        else if (email && password) {
            user = await UserModel.findOne({ email });
            if (!user) {
                failResponse(res, Messages.User_Not_Found, StatusCode.Unauthorized);
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                failResponse(res, Messages.Invalid_Credentials, StatusCode.Unauthorized);
                return
            }
        }
        else {
             failResponse(res, Messages.Missing_Fields_Required, StatusCode.Bad_Request);
            return;
        }


        const token = generateToken(user._id.toString(), user.role[0]);
        res.cookie(`${JWT_TOKEN_NAME}`, token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        successResponse(res, { token, userId: user._id, user: { name: user.name, role: user.role,email:user.email,phoneNumber:user.phoneNumber } }, Messages.Login_Sucess, StatusCode.OK)
    }
    catch (error) {
        console.error('Login failed', error);
        failResponse(res, Messages.Login_Fail, StatusCode.Internal_Server_Error)
    }
}

const getProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user?.userId; // ✅ From JWT token via middleware
    console.log('userId from token', userId);

    if (!userId) {
      return failResponse(res, Messages.Not_Authorized_No_Token, StatusCode.Unauthorized);
    }

    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return failResponse(res, Messages.User_Not_Found, StatusCode.Not_Found);
    }

    return successResponse(res, user, Messages.Fetch_Success, StatusCode.OK);
  } catch (err) {
    console.error('Get profile failed', err);
    return failResponse(res, Messages.Server_Error, StatusCode.Internal_Server_Error);
  }
};



const updateProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, ...rest } = req.body;

    if (!email) {
      return failResponse(res, Messages.Missing_Fields_Required, StatusCode.Bad_Request);
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { ...rest, updatedBy: req.userId, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedUser) {
      return failResponse(res, Messages.User_Not_Found, StatusCode.Not_Found);
    }

    return successResponse(res, updatedUser, Messages.Update_Success, StatusCode.OK);
  } catch (err) {
    console.error('Update profile failed', err);
    return failResponse(res, Messages.Server_Error, StatusCode.Internal_Server_Error);
  }
};



export { registerUser, login , getProfile, updateProfile }