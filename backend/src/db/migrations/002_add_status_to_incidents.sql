-- Migration 002: Add status column to incidents table
ALTER TABLE incidents
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'Reported'
    CHECK (status IN ('Reported', 'In Workshop', 'In-Progress', 'Fixed'));
