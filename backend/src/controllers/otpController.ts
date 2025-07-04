import { Request, Response } from 'express';
import { Messages } from '../utils/constants';
import { errorResponse, failResponse, successResponse } from '../utils/response';
import { StatusCode } from '../utils/statusCode';
import twilioClient from '../utils/twilio';
const otpStore: { [phone: string]: string } = {};
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phone } = req.body;
        console.log(req.body)

        if (!phone) {
            res.status(400).json({ success: false, message: 'Phone number is required' });
            return;
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[phone] = otp;

        if (!twilioClient) {
            res.status(500).json({ success: false, message: 'Twilio client not initialized' });
            return;
        }

        const message = await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_TRIAL_NUMBER!,
            to: phone,
        });

        console.log('OTP sent:', message.sid);

        res.status(200).json({ success: true, message: 'OTP sent successfully' });

    } catch (error: any) {
        console.error('Error sending OTP:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to send OTP',
            error: error.message,
        });
    }
};


export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phoneNumber, otp } = req.body;
        console.log('req.body0',req.body)

        if (!phoneNumber || !otp) {
            failResponse(res,Messages.PhoneNumberAndOtp_Required,StatusCode.Bad_Request);
            return;
        }

        if (!/^\d{4,6}$/.test(otp)) {
            failResponse(res,Messages.InvalidOtp_Format , StatusCode.Bad_Request);
            return;
        }

        if (!twilioClient) {
            console.error('Twilio client not available');
            errorResponse(res, Messages.SMS_Unavailable, StatusCode.Service_Unavailable);
            return;
        }

        const verifySid = process.env.TWILIO_VERIFY_SID!;
        console.log('🔍 Verifying OTP for:', phoneNumber);

        const verificationCheck = await twilioClient.verify.v2.services(verifySid)
            .verificationChecks
            .create({
                to: phoneNumber,
                code: otp
            });

        console.log('📬 Verification status:', verificationCheck.status);

        if (verificationCheck.status === 'approved') {
            successResponse(res, {
                status: verificationCheck.status
            }, Messages.OtpVerification_Success,StatusCode.OK);
        } else {
            failResponse(res, 'Invalid or expired OTP', 400);
        }
    } catch (error: any) {
        console.error('❌ Error verifying OTP:', error);

        const twilioErrorMessages: { [key: number]: string } = {
            20404: 'Invalid verification code',
            60200: 'Invalid phone number format',
            60202: 'Max attempts reached'
        };

        const message = error.code ? twilioErrorMessages[error.code] || 'Verification failed' : 'Failed to verify OTP';
        const statusCode = error.code ? 400 : 500;

        errorResponse(res, message, statusCode, error.message || null);
    }
};
