import pool from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/hash.util.js';

export const registerUser = async (userData) => {
  const { name, phone, email, password } = userData;

  // Check if a user with the same phone or email already exists
  const { rows: existing } = await pool.query(
    `SELECT id FROM users
     WHERE ($1::text IS NOT NULL AND phone = $1)
        OR ($2::text IS NOT NULL AND email = $2)
     LIMIT 1`,
    [phone || null, email || null]
  );

  if (existing.length > 0) {
    throw new Error('User already exists with this email or phone.');
  }

  const hashedPassword = await hashPassword(password);

  const { rows } = await pool.query(
    `INSERT INTO users (name, phone, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, phone, email, created_at`,
    [name, phone || null, email || null, hashedPassword]
  );

  return rows[0];
};

export const loginUser = async (username, password) => {
  // username can be an email or a phone number
  const { rows } = await pool.query(
    `SELECT * FROM users
     WHERE email = $1 OR phone = $1
     LIMIT 1`,
    [username]
  );

  if (rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = rows[0];
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};