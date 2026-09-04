-- Migration 001: Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id          SERIAL PRIMARY KEY,
  bus_no      VARCHAR(10)  NOT NULL,
  depot       VARCHAR(50)  NOT NULL,
  category    VARCHAR(50)  NOT NULL,
  severity    VARCHAR(20)  NOT NULL,
  description TEXT,
  location    VARCHAR(100),
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);
