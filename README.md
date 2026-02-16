# Willa Zofiówka – Full-Stack Booking Platform

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react\&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/API-Express-000000?logo=express\&logoColor=white)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite\&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?logo=vercel\&logoColor=white)
![Railway](https://img.shields.io/badge/Backend%20Hosting-Railway-0B0D0E)
![Cloudflare](https://img.shields.io/badge/Infrastructure-Cloudflare-F38020?logo=cloudflare\&logoColor=white)
![Web3](https://img.shields.io/badge/Payments-Crypto%20Supported-6f42c1)

Production-grade full-stack booking platform for a villa rental property in Zakopane, Poland.

This project was independently designed, implemented, and deployed end-to-end.

---

## Role & Ownership

**Sole Developer – Full Stack & Infrastructure**

Responsibilities included:

* Full system architecture design
* Frontend development (React)
* Backend development (Node.js / Express)
* Database design & logic
* UI/UX design from scratch
* Infrastructure configuration
* Production deployment
* API integrations
* Ongoing maintenance and debugging

The UI and UX were designed and implemented independently, without templates or external designers, focusing on clarity, booking flow simplicity, and performance.

---

## Project Overview

Willa Zofiówka is a production web application built to manage:

* Direct bookings
* Calendar synchronization
* Crypto & traditional payments
* Review aggregation
* Secure guest data handling
* Automated confirmations
* Cloud-based deployment infrastructure

The platform replaces dependency on OTA-only workflows by providing a direct booking solution with integrated availability control.

---

## Technology Stack

### Frontend

* React
* React Router
* i18next (multilingual support)
* Custom CSS (independently designed UI/UX)
* Deployed on Vercel

### Backend

* Node.js
* Express
* SQLite
* Google Places API
* iCal feed synchronization
* SMTP email automation
* Deployed on Railway

### Infrastructure

* Cloudflare DNS
* Cloudflare R2 object storage
* GitHub version control
* CI-based deployment pipeline

---

## System Architecture

React Client (Vercel)
→ REST API
→ Node.js / Express (Railway)
→ SQLite Database
→ iCal OTA Feeds
→ Google Places API
→ SMTP Email Service
→ Cloudflare R2 (Media Hosting)

---

## Core Features

### 1. Custom Booking Engine

* Date range validation
* Server-side availability checks
* Conflict prevention
* Dynamic price calculation
* Booking confirmation emails
* Calendar persistence in database

---

### 2. OTA Calendar Synchronization

* Imports external iCal feeds
* Automatically blocks unavailable dates
* Prevents double-booking conflicts
* Maintains calendar integrity

---

### 3. Crypto Payment Support

The platform supports cryptocurrency-based payments in addition to traditional booking confirmation flows.

Features:

* Blockchain transaction-based settlement
* Transaction hash validation
* Wallet transfer verification
* Booking confirmation triggered upon transaction confirmation

Blockchain transactions are linked to booking records for integrity verification.

No personal guest data is stored on-chain.

---

### 4. Secure Data Handling

Security considerations implemented:

* Backend-only API key usage
* Environment variable isolation
* Server-side validation
* Controlled access to booking data
* Separation of payment validation and personal data storage

Calendar records may be cryptographically associated with transaction hashes to ensure booking-payment integrity.

---

### 5. Google Reviews Integration

* Server-side API proxy (`/api/reviews`)
* Prevents frontend API key exposure
* Fetches verified review data dynamically

---

### 6. Media Optimization

* Large hero videos stored in Cloudflare R2
* Served via dedicated media subdomain
* Improves performance and repository cleanliness
* Reduces frontend bundle size

---

## Environment Variables (Backend)

```
GOOGLE_PLACES_API_KEY=
PLACE_ID=
EMAIL_USER=
EMAIL_PASS=
CRYPTO_WALLET_ADDRESS=
```

Sensitive configuration is managed securely via Railway environment settings.

---

## Repository Structure

```
/client        React frontend
/server        Express backend
/database      SQLite storage
/public        Static assets
```

---

## Deployment Strategy

### Frontend

* Hosted on Vercel
* Automatic deployment from GitHub

### Backend

* Hosted on Railway
* Environment-based configuration
* Production REST endpoints

### Infrastructure

* Domain via home.pl
* DNS & routing via Cloudflare
* Media served from:
  [https://media.willazofiowka.pl](https://media.willazofiowka.pl)

---

## Engineering Challenges Addressed

* Designing a full booking flow independently
* Preventing double bookings across OTA platforms
* Securely integrating third-party APIs
* Blockchain transaction validation workflow
* Separating media from application hosting
* Managing production environment configuration
* Maintaining full-stack deployment without SaaS booking tools

---

## Demonstrated Competencies

* Full-stack JavaScript development
* UI/UX system design
* REST API architecture
* Cloud deployment & CI/CD
* Infrastructure management
* Secure configuration handling
* Blockchain-based payment validation integration
* Independent production system ownership

---

## Author

Nicola Wojcikowska
Full-stack Developer

This project was independently architected, designed (UI/UX), implemented, deployed, and maintained in a live production environment.

---
