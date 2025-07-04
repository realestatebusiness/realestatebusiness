import express, { Router } from 'express'
import {login, registerUser} from '../controllers/userController'
import { sendOTP, verifyOTP } from '../controllers/otpController';
const router=express.Router();


router.post('/register',registerUser);
router.post('/login',login);

router.post('/send-otp',sendOTP);
router.post('/verify',verifyOTP)


export default router;