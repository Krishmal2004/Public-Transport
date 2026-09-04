import { Router } from 'express';
const router = Router();

// GET /api/users
router.get('/', (req, res) => {
  res.json({ message: 'Get all users - coming soon' });
});

export default router;
