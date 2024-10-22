//initializing the Express app and attaching the routes
import express from 'express';
import taxiRoutes from './routes/taxiRoutes';
import trajectoryRoutes from './routes/trajectoryRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json()); //parses incoming request body

//register routes
app.use(taxiRoutes);
app.use(trajectoryRoutes);
app.use(userRoutes);
app.use(authRoutes);

export default app;