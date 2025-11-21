import express from 'express';
import { 
  createCategory, 
  getAllCategories, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllCategories);
router.post('/', isAdmin, createCategory);
router.put('/:id', isAdmin, updateCategory);
router.delete('/:id', isAdmin, deleteCategory);

export default router;
