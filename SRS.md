# Software Requirements Specification (SRS)
## Project: CST Tour Management System

> [!NOTE]
> This SRS is structured around an Iterative Development approach, defining a clear Minimum Viable Product (MVP) to prevent scope creep. This allows you to build the core system first before expanding to the mobile app.

---

## 1. Introduction
### 1.1 Purpose
This document defines the software requirements for the CST Tour Management System. The system is designed to help Tour Management Companies handle tourists, drivers, itineraries, agents, and hotel bookings in a centralized platform.

### 1.2 Scope (MVP Focus)
To avoid over-engineering and burning out, the project is divided into distinct versions.
- **Version 1.0 (MVP):** Focuses solely on core back-office operations (Web Dashboard & Backend API) for managing tourists, assigning drivers, and creating itineraries. **The mobile app is excluded from MVP.**
- **Version 2.0 (Mobile Extension):** Introduces a mobile app for drivers/guides to view itineraries and receive notifications.

---

## 2. System Architecture

```mermaid
%% Insert System Architecture Diagram Here (Space left intentionally for expansion)
```

*(Space for high-level system architecture diagram)*

---

## 3. User Roles (Actors)
1. **Company Admin:** Manages the entire company, onboarding, agents, and drivers.
2. **Tour Agent:** Registers foreign tourists and defines their travel requirements.
3. **Driver / Guide:** Responsible for executing the tour itinerary and accompanying tourists.
4. **Tourist:** The end customer (Lead Tourist and Group Members).

---

## 4. Minimum Viable Product (Version 1.0) Requirements

> [!IMPORTANT]
> The goal of Version 1.0 is to have a fully working, stable Web Dashboard and Backend API. 

### 4.1 Functional Requirements

#### 4.1.1 Company Management
- The system shall allow a user to register/onboard a new Tour Management Company.
- The system shall retrieve company details using authentication via Supabase.

#### 4.1.2 Tourist & Group Management
- The system shall allow creation, updating, and deletion of Foreign Tourists.
- The system shall support associating multiple Group Members (name, passport, email) to a Lead Tourist.
- The system shall capture arrival/departure dates, pax count, country, and duration for each tourist.

#### 4.1.3 Itinerary Management
- The system shall allow building a day-by-day itinerary for a tourist.
- The system shall allow adding specific destinations and activities to each day.
- The system shall allow linking hotel stays to a specific itinerary day.

#### 4.1.4 Driver & Agent Management
- The system shall allow the creation of Drivers/Guides.
- The system shall allow the creation of Foreign Tour Agents linked to a region.
- The system shall allow assigning a driver and an agent to a specific tourist group.

#### 4.1.5 Notifications (Alerts)
- The system shall allow creating urgent alerts/notifications.
- The system shall allow resolving alerts.

### 4.2 Non-Functional Requirements
- **Database:** PostgreSQL via Supabase.
- **Backend API:** FastAPI (Python).
- **Authentication:** Supabase Auth for driver and admin logins.
- **Reliability:** The API should handle basic CRUD operations without failing or dropping data.

---

## 5. Version 2.0 Requirements (Mobile App Integration)

> [!WARNING]
> Do not begin development on Version 2.0 features until Version 1.0 is fully tested and deployed. Building both at the same time is what caused the current issues!

### 5.1 Driver Mobile App
- Drivers shall be able to log in using credentials created by the Company Admin.
- Drivers shall view the list of assigned tours and daily itineraries.

```mermaid
%% Insert Mobile App Flow Diagram Here (Space left intentionally for expansion)
```

*(Space for Mobile App Flow diagram)*

---

## 6. Database Schema Summary

```mermaid
%% Insert Entity Relationship Diagram (ERD) Here (Space left intentionally for expansion)
```

*(Space for ERD)*

The core entities revolve around the `Company`, which owns:
- `ForeignTourists` (1:N)
- `Drivers` (1:N)
- `Hotels` (1:N)
- `Agents` (1:N)
- `Notifications` (1:N)

The `ForeignTourist` entity is the central point for operations, containing `GroupMembers` (1:N) and `TourItineraries` (1:N).
