import { Router } from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './auth.routes.js';

const router = Router();

// Fixed: was '/auth/auth' (double prefix), now correctly '/auth'
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
