# SLTB DepotOps: Smart Fleet Breakdown & Maintenance Tracker

## Overview
**SLTB DepotOps** is a centralized, responsive internal dashboard designed to address a critical issue facing the Sri Lanka Transport Board (SLTB/CTB). Out of roughly 7,100 buses, nearly 2,000 sit idle at depots at any given time due to breakdowns, poor maintenance tracking, and spare-part bottlenecks. 

By allowing drivers and depot controllers to log breakdown incidents in real-time and enabling engineering maintenance teams to prioritize, assign, and track repairs, DepotOps aims to significantly reduce bus downtime, ensuring more buses remain active and commuters aren't left stranded.

---

## 🎯 The Problem Context (Rubric Criterion 3.1: Relevance)
*Over 25% of the SLTB fleet is grounded due to untracked mechanical issues and depot delays, directly stranding thousands of daily commuters.*

This project shifts operations from manual paper logbooks to a real-time digital ticket tracking system, directly reducing idle time and preventing sudden service cancellations for daily passengers.

---

## 🚀 Features

### 1. Landing Page / Main UI
A clean depot manager dashboard displaying the active fleet health (e.g., "Active: 42 | Grounded: 12") at a glance.

### 2. Two Functional Features
- **Feature 1: Dynamic Breakdown Incident Logging & Repair Assignment**
  Streamlines the reporting of new issues directly from drivers or controllers.
- **Feature 2: Live Maintenance Queue**
  A robust tracking view featuring priority scoring and status filtering for maintenance teams.

### 3. User Input Form & Validation
- **Incident Report Form:** Includes fields for Bus Registration Number (e.g., `NB-4521`), Assigned Depot (e.g., Maharagama, Meegoda, Pettah), Breakdown Category (Engine, Brake Failure, Transmission, Electrical), and Severity Level.
- **Smart Validation:** Prevents empty submissions, verifies the Sri Lankan vehicle registration format (`^[A-Z]{2,3}-[0-9]{4}$`), and displays friendly, inline error messages (e.g., *"Please select an assigned SLTB depot."*).

### 4. Search, Filter & Process
A searchable table/card grid where depot staff can filter issues by:
- **Depot location**
- **Repair Status** (Reported, In Workshop, Fixed)
- **Severity** (Low, High, Critical)
*Includes computed metrics like Total Downtime Hours.*

### 5. Responsive Interface
- **Mobile-friendly card layout** for mechanics using mobile devices in the workshop.
- **Comprehensive data table** for desktop depot controllers monitoring the fleet.

### 6. Basic Navigation
A persistent navigation bar with tabs:
- **Overview** (Landing Dashboard)
- **Log Breakdown** (Incident Form)
- **Depot Repair Queue** (Data Table)

### 7. Sample Data
Pre-loaded with realistic data featuring authentic CTB bus numbers (e.g., `WP NA-1290`, `NC-3341`), routes (`138`, `122`, `177`), and regional depots.

---

## 🤖 Optional AI Hook: Maintenance Priority Recommender
A lightweight endpoint acting as an **AI Maintenance Priority Recommender**. 
When an issue is described in plain text (e.g., *"loud grinding noise from front axle when braking"*), the AI categorizes the severity (e.g., **Critical Safety Hazard (Tier 1)**) and auto-assigns it ahead of cosmetic or minor issues.

---

## ⏱️ 4-Hour Hackathon Execution Plan

Our team of 4 is structured to deliver this MVP efficiently:

- **Member 1 (UI & Framing):** Builds the Next.js landing view, responsive navbar, and in-app problem description card.
- **Member 2 (Breakdown Form & Validation):** Develops the breakdown reporting form with rigorous inline error validation and regex checking.
- **Member 3 (Repair Queue & Processing):** Implements the searchable incident queue, depot filters, and downtime status toggles (`In-Progress` -> `Resolved`).
- **Member 4 (DevOps, Video & Deliverables):** Deploys the application to Vercel immediately, prepares the mock JSON dataset, maintains the `AI Prompt Log`, and records the 2-minute demonstration video.
