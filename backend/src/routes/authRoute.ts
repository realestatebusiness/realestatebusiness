import express, { Router } from 'express'
import {login, registerUser} from '../controllers/userController'
import { sendOtp, verifyFirebaseOtpToken } from '../controllers/otpController';
import { createProperty } from '../controllers/propertyController';
const router=express.Router();


router.post('/register',registerUser);
router.post('/login',login);

router.post('/verify-otp', verifyFirebaseOtpToken);

router.post('/send-otp', sendOtp);
router.post('/createProperty',createProperty);

export default router;