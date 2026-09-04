import pg from 'pg';
import { DATABASE_URL } from './env.js';

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = DATABASE_URL;

const pool = new Pool({
  connectionString,
  ...(connectionString.includes('neon.tech') || connectionString.includes('sslmode=require') || isProduction
    ? { ssl: { rejectUnauthorized: false } }
    : {}),
});

export const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Creates the users table if it doesn't exist
export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(255) NOT NULL,
      phone     VARCHAR(20)  UNIQUE,
      email     VARCHAR(255) UNIQUE,
      password  TEXT         NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('Database schema initialised');
};

export default pool;
