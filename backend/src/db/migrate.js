// Run this once to create the incidents table on Neon PostgreSQL.
// Usage: node src/db/migrate.js

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationPath = join(__dirname, 'migrations', '001_create_incidents_table.sql');
const sql = readFileSync(migrationPath, 'utf8');

(async () => {
  try {
    console.log('Running migration: 001_create_incidents_table.sql ...');
    await pool.query(sql);
    console.log('✅  Migration completed successfully.');
  } catch (err) {
    console.error('❌  Migration failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
