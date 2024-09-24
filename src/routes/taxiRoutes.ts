//setting up the /taxis route and points to the controller that handles the request

import { Router } from 'express';
import { fetchTaxis } from '../controllers/taxiController';

const router = Router();

// GET /taxis endpoint
router.get('/taxis', fetchTaxis);

export default router;