import { Request, Response } from 'express';
import { successResponse, failResponse, errorResponse } from '../utils/response';
import { Messages } from '../utils/constants';
import { StatusCode } from '../utils/statusCode';
import admin from '../utils/firebase'; // Make sure this path is correct

interface OtpVerificationRequest {
  idToken: string;
}

interface OtpVerificationResponse {
  uid: string;
  phoneNumber: string;
  message: string;
}

export const verifyFirebaseOtpToken = async (
  req: Request<{}, OtpVerificationResponse, OtpVerificationRequest>,
  res: Response<any>
): Promise<void> => {
  try {
    const { idToken } = req.body;
    
    console.log('🔍 Verifying OTP token...');
    console.log('Request body:', { idToken: idToken ? '***PROVIDED***' : 'MISSING' });

    // Validate input
    if (!idToken) {
      console.log('❌ No ID token provided');
      failResponse(
        res, 
        'ID token is required', 
        StatusCode.Bad_Request
      );
      return;
    }

    if (typeof idToken !== 'string' || idToken.trim() === '') {
      console.log('❌ Invalid ID token format');
      failResponse(
        res, 
        'Valid ID token is required', 
        StatusCode.Bad_Request
      );
      return;
    }

    // Verify the Firebase ID token
    console.log('🔐 Verifying Firebase ID token...');
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const uid = decodedToken.uid;
    const phoneNumber = decodedToken.phone_number;

    console.log('✅ Firebase ID token verified successfully');
    console.log('User details:', { uid, phoneNumber });

    // Validate that phone number exists
    if (!phoneNumber) {
      console.log('❌ No phone number in token');
      failResponse(
        res, 
        'Phone number not found in token', 
        StatusCode.Bad_Request
      );
      return;
    }

    // Optional: Save user to database or perform additional operations
    // await saveUserToDatabase({ uid, phoneNumber });

    const responseData: OtpVerificationResponse = {
      uid,
      phoneNumber,
      message: 'OTP verified successfully'
    };

    successResponse(
      res,
      responseData,
      'OTP verified successfully',
      StatusCode.OK
    );

  } catch (error: any) {
    console.error('❌ Firebase token verification error:', error);
    
    // Handle specific Firebase errors
    let errorMessage = 'Invalid or expired ID token';
    let statusCode = StatusCode.Unauthorized;

    if (error.code === 'auth/id-token-expired') {
      errorMessage = 'ID token has expired';
    } else if (error.code === 'auth/id-token-revoked') {
      errorMessage = 'ID token has been revoked';
    } else if (error.code === 'auth/invalid-id-token') {
      errorMessage = 'Invalid ID token format';
    } else if (error.code === 'auth/project-not-found') {
      errorMessage = 'Firebase project not found';
      statusCode = StatusCode.Internal_Server_Error;
    }

    errorResponse(
      res, 
      errorMessage, 
      statusCode, 
      process.env.NODE_ENV === 'development' ? error.message : null
    );
  }
};

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      failResponse(res, 'Phone number is required', StatusCode.Bad_Request);
      return;
    }

    
    successResponse(
      res,
      { message: 'OTP functionality handled by Firebase client-side' },
      'OTP send request received',
      StatusCode.OK
    );
  } catch (error: any) {
    console.error('❌ Send OTP error:', error);
    errorResponse(res, 'Failed to send OTP', StatusCode.Internal_Server_Error, error.message);
  }
};