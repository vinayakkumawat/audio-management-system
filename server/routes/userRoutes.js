import express from 'express';
import {
  createUser,
  getUsers,
  updateUserById,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUser);

export default router;