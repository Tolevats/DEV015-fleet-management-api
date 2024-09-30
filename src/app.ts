//initializing the Express app and attaching the routes

import express from 'express';
import taxiRoutes from './routes/taxiRoutes';
import trajectoryRoutes from './routes/trajectoryRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json())

//register routes
app.use(taxiRoutes);
app.use(trajectoryRoutes);
app.use(userRoutes);

export default app;