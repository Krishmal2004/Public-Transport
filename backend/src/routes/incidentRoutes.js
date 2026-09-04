import { Router } from 'express';
import {
  handleCreateIncident,
  handleGetIncidents,
} from '../controllers/incidentController.js';

const router = Router();

// POST /api/incidents — submit a new breakdown incident report
router.post('/', handleCreateIncident);

// GET  /api/incidents — retrieve all incidents (admin / debug)
router.get('/', handleGetIncidents);

export default router;
