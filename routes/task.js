import express from 'express';

import { authenticate } from '../middleware/auth.js';
import { createTask, getOrganizationTasks } from '../controllers/task.js';

const router = express.Router();

// Create task
router.post('/', authenticate, createTask);
  
// Get task for logged in user grouped by organisation they are part of
router.get('/', authenticate, getOrganizationTasks);


export default router;