import pool from '../config/db.js';

/**
 * Insert a new incident record into the database.
 * @param {{ busNo, depot, category, severity, description, location }} data
 * @returns {Promise<object>} The newly created incident row
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
 * @returns {Promise<object[]>} Array of incident rows
 */
export const getAllIncidents = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM incidents ORDER BY created_at DESC;'
  );
  return rows;
};
