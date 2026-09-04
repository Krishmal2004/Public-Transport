import { Router } from 'express';
const router = Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  res.json({ message: 'Register route - coming soon' });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  res.json({ message: 'Login route - coming soon' });
});

export default router;
