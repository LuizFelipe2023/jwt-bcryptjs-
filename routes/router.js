import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';
const router = express.Router();

router.post('/register',userController.createUser);
router.get('/users',authController.verifyToken,userController.getAllUsers);
router.post('/login',authController.login);
router.post('/reset-password',authController.verifyToken,userController.resetPassword);


export default router;