// Runs all SQL migration files in order.
// Usage: node src/db/migrate.js

import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationsDir = join(__dirname, 'migrations');

// Read all .sql files sorted alphabetically (001, 002, ...)
const migrationFiles = readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

(async () => {
  for (const file of migrationFiles) {
    const sql = readFileSync(join(migrationsDir, file), 'utf8');
    try {
      console.log(`Running migration: ${file} ...`);
      await pool.query(sql);
      console.log(`✅  ${file} completed.`);
    } catch (err) {
      console.error(`❌  ${file} failed:`, err.message);
      process.exit(1);
    }
  }
  console.log('\nAll migrations completed successfully.');
  await pool.end();
})();
