import express from 'express';
import { 
  createTask, 
  getUserTasks, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createTask);
router.get('/', getUserTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
