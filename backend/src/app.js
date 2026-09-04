import express from 'express';
import cors from 'cors';
import { NODE_ENV } from './config/env.js';
import routes from './routes/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Public Transport API is running', env: NODE_ENV });
});

// Error handling (must be last)
app.use(errorMiddleware);

export default app;
