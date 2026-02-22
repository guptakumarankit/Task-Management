import express from 'express'
import { loginUserController, signUpUserController } from '../Controllers/userController.js';

const router = express.Router();

router.post('/signUp' , signUpUserController);
router.post('/login' , loginUserController);

export default router;