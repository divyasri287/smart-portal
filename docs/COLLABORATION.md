# 🤝 Developer Collaboration & Branching Strategy

This document outlines the strict guidelines for team members working on the **Smart Procurement Portal** repository.

---

## 🏗️ Developer Responsibilities & Scoping

| Developer | Branch Prefix | Scope Directory | Primary Tasks |
| :--- | :--- | :--- | :--- |
| **Member 1** | `feature/farmer/` | `client/src/pages/farmer/` | Farmer dashboard, slot booking, QR token display, payment status, history, helpdesk |
| **Member 2** | `feature/officer/` | `client/src/pages/officer/` | Officer queue view, QR scanner interface, grain moisture/quality checks, weighbridge submission |
| **Member 3** | `feature/manager/` | `client/src/pages/manager/` | Centre queue monitoring, daily slot allocation, officer assignment, dispute management |
| **Member 4** | `feature/admin/` | `client/src/pages/admin/` | State/District dashboard, centre master list, payments audit, user management |
| **Member 5** | `feature/server/` | `server/` | Express controllers, models, routes, and middleware integrations |

---

## 🚫 Rules to Prevent Merge Conflicts

1. **Do NOT modify common components without team sync**: Reusable components (`client/src/components/common`, `buttons`, `inputs`, `cards`) are shared. If you need a custom component, create it inside your page folder first or coordinate before editing common UI components.
2. **Import from shared services**: Call stubs from `client/src/services/` instead of hardcoding fetch calls inside pages.
3. **Use Mock JSON datasets**: Read initial state from `client/src/data/*.json`.
4. **Never commit directly to `main`**: Always push to your `feature/<module>` branch and open a Pull Request (PR).
