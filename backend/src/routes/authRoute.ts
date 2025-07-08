import express, { Router } from 'express'
import {login, registerUser} from '../controllers/userController'
import { createProperty } from '../controllers/propertyController';

const router=express.Router();


router.post('/register',registerUser);
router.post('/login',login)

router.post('/createProperty',createProperty);

export default router;