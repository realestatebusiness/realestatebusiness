import express, { Router } from 'express'
import {login, registerUser} from '../controllers/userController'
import { sendOtp, verifyFirebaseOtpToken } from '../controllers/otpController';
const router=express.Router();


router.post('/register',registerUser);
router.post('/login',login);

router.post('/verify-otp', verifyFirebaseOtpToken);

router.post('/send-otp', sendOtp);

export default router;