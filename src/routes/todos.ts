import { Router } from 'express';
import todosController from '../controllers/todos';
import { authMiddleware } from '../middlewares/authentication';

const router = Router();

router.use(authMiddleware);
router.post('/addToDo', todosController.addToDo);
router.post('/updateToDo', todosController.updateToDo);

export default router;