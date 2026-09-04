import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/profile', protectRoute, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected dashboard', userId: req.user.id });
});

export default router;