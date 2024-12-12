import express from 'express';
import { loginTestUser, registerTestUser } from '../controllers/testUserController.js';

const router = express.Router();

router.post('/test-users/login', loginTestUser);
router.post('/test-users/register', registerTestUser);

export default router;