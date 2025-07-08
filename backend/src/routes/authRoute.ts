import express, { Router } from 'express'
import {login, registerUser} from '../controllers/userController'
import { verifyFirebaseOtpToken } from '../controllers/otpController';
const router=express.Router();


router.post('/register',registerUser);
router.post('/login',login);

router.post('/send-otp',verifyFirebaseOtpToken );


export default router;