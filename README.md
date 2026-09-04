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

## 👥 Team Contributions

- **Obesekara S.O.K.D. (IT24103866) — Backend Lead & Cloud Deployment**
  Handled the complete database architecture and server deployment workflows. Configured the serverless Neon PostgreSQL database connection pooling with SSL support and managed cloud hosting environment configurations. Developed the core incident creation API (`POST /api/incidents`) with authoritative server-side validation middleware. Implemented the authentication system using bcrypt password hashing, JWT token issuance, and `protectRoute` middleware to secure backend endpoints.

- **Weerasooriya W.H.M.S.P. (IT24104192) — Backend & API Architecture**
  Engineered the server-side API processing logic and analytics pipelines. Implemented the repair queue endpoints (`GET /api/incidents`) supporting dynamic multi-filtering and sorting, as well as the incident status update route (`PATCH /api/incidents/:id/status`) to manage live state changes. Created the fleet metrics aggregation API (`GET /api/incidents/stats`) to compute real-time operational statistics and implemented rule-based logic to auto-suggest critical severity for high-risk safety hazards.

- **Pehesara W.A.C. (IT24103684) — Frontend Engineer (Incident Module)**
  Built the user-facing Incident Report module using React 18 and Vite. Implemented robust client-side input validation, including Sri Lankan vehicle registration regex pattern checks and instant inline error messages. Integrated the HTML5 Browser Geolocation API to auto-detect vehicle latitude and longitude coordinates. Connected the reporting form to the backend REST API with server-side validation error mapping back to individual input fields.

- **Peiris W.S.V. (IT24103792) — Frontend Engineer (Dashboard & Queue)**
  Developed the core monitoring interfaces, including the Fleet Dashboard and the interactive Depot Repair Queue table. Implemented live queue features such as text search, multi-faceted filtering (depot, severity, status), and row-level status dropdowns with immediate UI state reflection. Designed modal-based login and registration overlays to preserve seamless single-page navigation, and styled the entire application using Vanilla CSS to ensure full responsiveness across desktop workstations and mobile screens.

---

## 🤖 AI Usage Declaration (Requirement 2.3)

In accordance with the assignment rubric (Section 2.3 Declaration), we formally declare the use of AI tools in the development of this project.

- **Google Gemini / Antigravity Agent**: Used as an AI pair-programmer to scaffold the initial React frontend components (Vite setup, routing structure), generate the base CSS design system (gov-theme), and implement the Vercel deployment configuration. We manually refined the validation logic, implemented role-based authentication rules, connected the mock data sets, and polished the final user interface.

### AI Prompt Log

To further document our usage, here are the primary prompts used to generate core logic:

- **Prompt 1 (Sri Lankan Vehicle Plate Pattern)**: *"Provide a JavaScript regular expression that validates Sri Lankan vehicle registration numbers for both modern and older formats (e.g., 'WP NA-1290', 'NC-3341', '62-1234')."*
- **Prompt 2 (PostgreSQL Schema for Fleet Issues)**: *"Create a PostgreSQL schema for tracking bus breakdown incidents with status tracking ('Reported', 'In Workshop', 'In-Progress', 'Fixed'), geolocation coordinates, foreign key user references, and automated timestamps."*

*(Note: The "Auto-Suggest Severity" button in the Incident Report form is a mocked frontend feature designed to fulfill the optional AI Hook requirement, rather than a live external LLM API call).*
