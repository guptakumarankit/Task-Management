import express from 'express'
import { addTaskController, deleteTaskController, editTaskController, fetchAllTaskController } from '../Controllers/taskController.js';

const router = express.Router();

router.post('/addTask' , addTaskController);
router.get('/fetchTask' , fetchAllTaskController);
router.put('/updateTask/:id' , editTaskController);
router.delete('/deleteTask/:id' , deleteTaskController);

export default router;