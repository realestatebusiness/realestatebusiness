import express from 'express'
import {login, registerUser, getProfile, updateProfile, locationdata } from '../controllers/userController'
import { sendOtp, verifyFirebaseOtpToken } from '../controllers/otpController';
import { createProperty, getAllProperties } from '../controllers/propertyController';

import { nearByLocation } from '../controllers/nearByLocation';
import authenticate from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

router.post('/verify-otp', verifyFirebaseOtpToken);

router.post('/send-otp', sendOtp);
router.post('/createProperty', createProperty);

router.get('/properties', getAllProperties);
router.get("/nearby", nearByLocation);

router.get('/profile', authenticate, getProfile);
router.put('/profile/update',authenticate, updateProfile);
router.post('/locationdata',locationdata)


export default router;