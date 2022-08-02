import { Router } from 'express';

// import authMiddleware from '../middlewares/auth';
import userRoutes from "./users";
import todoRoutes from "./todos";


const router = Router();

router.get('/', (req, res) => {
	res.send("ToDo App, lets start");
})

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);

export default router;
