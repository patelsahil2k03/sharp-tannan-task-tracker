import express from 'express';
import { getAllTasks, getAllUsers, getDashboardStats } from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(isAdmin);

router.get('/tasks', getAllTasks);
router.get('/users', getAllUsers);
router.get('/stats', getDashboardStats);

export default router;
