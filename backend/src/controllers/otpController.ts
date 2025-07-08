import { Request, Response } from 'express';
import { successResponse, failResponse, errorResponse } from '../utils/response';
import { Messages } from '../utils/constants';
import { StatusCode } from '../utils/statusCode';
import admin from '../utils/firebase';

export const verifyFirebaseOtpToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      failResponse(res, Messages.Token_Expired || 'ID token is required', StatusCode.Bad_Request);
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const uid = decodedToken.uid;
    const phoneNumber = decodedToken.phone_number;

    console.log('✅ Firebase ID token verified:', uid, phoneNumber);

    successResponse(
      res,
      {
        uid,
        phoneNumber,
      },
      'OTP verified successfully',
      StatusCode.OK
    );
  } catch (error: any) {
    console.error('❌ Firebase token verification error:', error);
    errorResponse(res, 'Invalid or expired ID token', StatusCode.Unauthorized, error.message || null);
  }
};
