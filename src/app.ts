//initializing the Express app and attaching the routes

import express from 'express';
import taxiRoutes from './routes/taxiRoutes';

const app = express();
app.use(express.json())

//register taxi routes
app.use(taxiRoutes);

export default app;