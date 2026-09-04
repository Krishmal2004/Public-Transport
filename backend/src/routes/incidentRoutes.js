import { Router } from 'express';
import {
  handleCreateIncident,
  handleGetIncidents,
  handleUpdateStatus,
  handleGetStats,
} from '../controllers/incidentController.js';

const router = Router();

// GET  /api/incidents/stats  — dashboard aggregate metrics (must be before /:id routes)
router.get('/stats', handleGetStats);

// POST /api/incidents        — submit a new breakdown incident report
router.post('/', handleCreateIncident);

// GET  /api/incidents        — retrieve all incidents (newest first)
router.get('/', handleGetIncidents);

// PATCH /api/incidents/:id/status — update the status of one incident
router.patch('/:id/status', handleUpdateStatus);

export default router;
