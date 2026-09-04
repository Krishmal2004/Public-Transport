import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './userRoutes.js';
import incidentRoutes from './incidentRoutes.js';

const router = Router();

// Fixed: was '/auth/auth' (double prefix), now correctly '/auth'
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/incidents', incidentRoutes);

export default router;
