# 🏛️ Smart Procurement Portal - Architecture Specification

## Overview

The Smart Procurement Portal is architected to separate routing, layout presentation, state context, and mock API data services.

```mermaid
graph TD
    App[App.jsx] --> AuthProvider[AuthContext]
    AuthProvider --> AppRoutes[AppRoutes.jsx]
    
    AppRoutes --> Landing[LandingPage]
    AppRoutes --> Auth[AuthLayout / Login]
    AppRoutes --> Farmer[FarmerLayout / FarmerPages]
    AppRoutes --> Officer[OfficerLayout / OfficerPages]
    AppRoutes --> Manager[ManagerLayout / ManagerPages]
    AppRoutes --> Admin[AdminLayout / AdminPages]

    Farmer --> CommonComp[Common Components / UI Kit]
    Officer --> CommonComp
    Manager --> CommonComp
    Admin --> CommonComp

    Farmer --> Services[Service Stubs / Mock Data]
    Officer --> Services
    Manager --> Services
    Admin --> Services
```

## Key Modules & Routes

- `/`: Landing Page
- `/login`: Role Login Selection
- `/farmer/*`: Farmer Dashboard, Book Slot, Token, Procurement Status, Payment Status, History, Help, Profile
- `/officer/*`: Officer Dashboard, Queue, Scan QR, Search Farmer, Weight Check, Quality Check, Submit Procurement, Receipt, History
- `/manager/*`: Manager Dashboard, Queue Monitoring, Slot Management, Officer Management, Reports, Issues, Analytics
- `/admin/*`: Admin Dashboard, State Analytics, District Analytics, Centre Monitoring, Payments, Reports, Users
