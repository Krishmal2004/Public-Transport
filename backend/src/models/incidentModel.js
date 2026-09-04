import pool from '../config/db.js';

const ALLOWED_STATUSES = ['Reported', 'In Workshop', 'In-Progress', 'Fixed'];

/**
 * Insert a new incident record into the database.
 */
export const createIncident = async ({ busNo, depot, category, severity, description, location }) => {
  const query = `
    INSERT INTO incidents (bus_no, depot, category, severity, description, location)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    busNo.trim(),
    depot.trim(),
    category.trim(),
    severity.trim(),
    description ? description.trim() : null,
    location ? location.trim() : null,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/**
 * Retrieve all incidents, newest first.
 */
export const getAllIncidents = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM incidents ORDER BY created_at DESC;'
  );
  return rows;
};

/**
 * Update the status of a single incident.
 * @param {number} id - Incident ID
 * @param {string} status - New status value
 * @returns {Promise<object>} Updated incident row
 */
export const updateIncidentStatus = async (id, status) => {
  if (!ALLOWED_STATUSES.includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }

  const { rows } = await pool.query(
    'UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *;',
    [status, id]
  );

  if (rows.length === 0) {
    const err = new Error(`Incident with id ${id} not found.`);
    err.statusCode = 404;
    throw err;
  }

  return rows[0];
};

/**
 * Get dashboard stats:
 *  - total incidents
 *  - count by severity
 *  - count by status
 *  - 5 most recent incidents (for dashboard cards)
 */
export const getIncidentStats = async () => {
  const [totalResult, bySeverityResult, byStatusResult, recentResult] = await Promise.all([
    // Total count
    pool.query('SELECT COUNT(*) AS total FROM incidents;'),

    // Count grouped by severity
    pool.query(`
      SELECT severity, COUNT(*) AS count
      FROM incidents
      GROUP BY severity
      ORDER BY count DESC;
    `),

    // Count grouped by status
    pool.query(`
      SELECT status, COUNT(*) AS count
      FROM incidents
      GROUP BY status
      ORDER BY count DESC;
    `),

    // 5 most recent incidents
    pool.query(`
      SELECT id, bus_no, category, severity, depot, status, created_at
      FROM incidents
      ORDER BY created_at DESC
      LIMIT 5;
    `),
  ]);

  return {
    total: parseInt(totalResult.rows[0].total, 10),
    bySeverity: bySeverityResult.rows,
    byStatus: byStatusResult.rows,
    recent: recentResult.rows,
  };
};
