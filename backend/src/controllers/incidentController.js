import { validateIncident } from '../validators/incidentValidator.js';
import {
  createIncident,
  getAllIncidents,
  updateIncidentStatus,
  getIncidentStats,
} from '../models/incidentModel.js';

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

/**
 * PATCH /api/incidents/:id/status
 * Updates the status of a single incident.
 * Body: { status: "In Workshop" | "In-Progress" | "Fixed" | "Reported" }
 */
export const handleUpdateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'status field is required in the request body.',
      });
    }

    const updated = await updateIncidentStatus(Number(id), status);

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/incidents/stats
 * Returns aggregate dashboard statistics:
 *   - total incident count
 *   - breakdown by severity
 *   - breakdown by status
 *   - 5 most recent incidents
 */
export const handleGetStats = async (req, res, next) => {
  try {
    const stats = await getIncidentStats();
    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
