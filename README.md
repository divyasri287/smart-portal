# 🌾 Smart Procurement Portal

> **Smart India Hackathon Project Architecture**  
> A Next-Gen National Agricultural Procurement & Grain Logistics Management System.

---

## 📌 Project Overview

The **Smart Procurement Portal** is a unified, multi-role digital platform engineered to streamline agricultural procurement at Minimum Support Prices (MSP) across India. It addresses slot booking bottlenecks, queue management, grain quality assessment, automated weighbridge logging, payment reconciliation, and real-time national analytics.

---

## 👥 Team Collaboration Architecture (5 Developers)

To ensure zero merge conflicts during team collaboration on GitHub, the codebase is modularized by functional domains:

| Team Member | Module Assigned | Working Directory Path | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **Developer 1** | **Farmer Module** | `client/src/pages/farmer/` | Slot booking, token generation, payment tracking, grievance helpdesk |
| **Developer 2** | **Officer Module** | `client/src/pages/officer/` | QR scanning, grain moisture/quality checks, weighbridge submission, digital receipts |
| **Developer 3** | **Manager Module** | `client/src/pages/manager/` | Centre queue oversight, slot capacity allocation, officer deployment, grievance resolution |
| **Developer 4** | **Admin Module** | `client/src/pages/admin/` | State/District cross-analytics, procurement centre master data, system audit & user roles |
| **Developer 5** | **Backend Server** | `server/` | Node.js / Express API services, database controllers, models, and middlewares |

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite 6
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS (Government UI Palette: Emerald Green, Crisp White, Slate, Saffron)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **State Management**: React Context API (`AuthContext`, `RoleContext`, `ToastContext`)
- **Micro-Animations**: Framer Motion (Minimal transitions)

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Installation & Running Locally

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-org/smart-procurement-portal.git
   cd "Smart portal"
   ```

2. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   ```

3. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 📁 Repository Structure

```
Smart portal/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/        # Visual assets and logos
│   │   ├── components/    # Reusable UI component library (Buttons, Inputs, Cards, Tables, Dialogs, Sidebars, Navbar, Footer)
│   │   ├── constants/     # Roles, paths, and status configuration
│   │   ├── context/       # Auth, Role, and Toast Context Providers
│   │   ├── data/          # Mock JSON datasets (farmers, bookings, queue, payments, reports, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # AuthLayout, FarmerLayout, OfficerLayout, ManagerLayout, AdminLayout
│   │   ├── pages/         # Segmented domain pages (admin, officer, farmer, manager, auth, shared)
│   │   ├── routes/        # AppRoutes, ProtectedRoute & module sub-routes
│   │   ├── services/      # Service stubs for API integration
│   │   ├── styles/        # Global Tailwind CSS & custom variables
│   │   └── utils/         # Formatting & helper utilities
│   └── package.json
├── server/                # Backend API scaffolding
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   └── package.json
├── docs/                  # Architecture & Git workflow specs
└── README.md
```

---

## 🎨 Design System & Accessibility Guidelines

- **Color Palette**:
  - Primary Green: `#047857` (`emerald-700`)
  - Secondary Saffron/Orange: `#D97706` (`amber-600`)
  - Accent Dark Navy: `#1E293B` (`slate-800`)
  - High Contrast Background: `#F8FAFC` (`slate-50`)
- **Typography**: High contrast, readable sans-serif typography with large action buttons for ease of access in rural agricultural centres.
