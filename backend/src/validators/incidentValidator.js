// Allowed enum values — kept in sync with the frontend dropdowns
const ALLOWED_DEPOTS = ['Maharagama', 'Pettah', 'Meegoda'];
const ALLOWED_CATEGORIES = [
  'Engine',
  'Brake Failure',
  'Transmission',
  'Electrical Issue',
  'Body Damage',
];
const ALLOWED_SEVERITIES = ['Low', 'High', 'Critical'];

// Bus registration regex: 2–3 uppercase letters, hyphen, exactly 4 digits
const BUS_NO_REGEX = /^[A-Z]{2,3}-\d{4}$/;

/**
 * Validates the incident report payload.
 * @param {object} body - Request body
 * @returns {{ valid: boolean, errors: object }} - Validation result
 */
export const validateIncident = (body) => {
  const errors = {};
  const { busNo, depot, category, severity, description, location } = body;

  // busNo — required + format
  if (!busNo || typeof busNo !== 'string' || busNo.trim() === '') {
    errors.busNo = 'Bus Registration Number is required.';
  } else if (!BUS_NO_REGEX.test(busNo.trim())) {
    errors.busNo = 'Invalid format. Use AA-1234 or ABC-1234 (uppercase letters only).';
  }

  // depot — required + whitelist
  if (!depot || typeof depot !== 'string' || depot.trim() === '') {
    errors.depot = 'Assigned Depot is required.';
  } else if (!ALLOWED_DEPOTS.includes(depot.trim())) {
    errors.depot = `Depot must be one of: ${ALLOWED_DEPOTS.join(', ')}.`;
  }

  // category — required + whitelist
  if (!category || typeof category !== 'string' || category.trim() === '') {
    errors.category = 'Breakdown Category is required.';
  } else if (!ALLOWED_CATEGORIES.includes(category.trim())) {
    errors.category = `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}.`;
  }

  // severity — required + whitelist
  if (!severity || typeof severity !== 'string' || severity.trim() === '') {
    errors.severity = 'Severity Level is required.';
  } else if (!ALLOWED_SEVERITIES.includes(severity.trim())) {
    errors.severity = `Severity must be one of: ${ALLOWED_SEVERITIES.join(', ')}.`;
  }

  // description — optional, max 1000 chars
  if (description && description.length > 1000) {
    errors.description = 'Description must not exceed 1000 characters.';
  }

  // location — optional, max 100 chars
  if (location && location.length > 100) {
    errors.location = 'Location string must not exceed 100 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
