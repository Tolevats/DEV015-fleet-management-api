import { Router } from 'express';
import { fetchTrajectories, fetchLatestTrajectories } from '../controllers/trajectoryController';

const router = Router();

//route for fetching trajectories by taxiId and date
router.get('/trajectories', fetchTrajectories);

//route for fetching the latest trajectories
router.get('/trajectories/latest', fetchLatestTrajectories);

export default router;