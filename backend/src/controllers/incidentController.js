import { validateIncident } from '../validators/incidentValidator.js';
import { createIncident, getAllIncidents } from '../models/incidentModel.js';

/**
 * POST /api/incidents
 * Creates a new breakdown incident report.
 */
export const handleCreateIncident = async (req, res, next) => {
  try {
    const { valid, errors } = validateIncident(req.body);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors,
      });
    }

    const incident = await createIncident(req.body);

    return res.status(201).json({
      success: true,
      message: 'Incident reported successfully.',
      data: incident,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/incidents
 * Returns all incident records (newest first).
 */
export const handleGetIncidents = async (req, res, next) => {
  try {
    const incidents = await getAllIncidents();
    return res.status(200).json({
      success: true,
      count: incidents.length,
      data: incidents,
    });
  } catch (error) {
    next(error);
  }
};
