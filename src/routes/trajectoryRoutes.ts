import { Router } from 'express';
import { fetchTrajectories } from '../controllers/trajectoryController';

const router = Router();

// Define the GET /trajectories route
router.get('/trajectories', fetchTrajectories);

export default router;