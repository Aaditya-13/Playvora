# 🏗️ Architecture

> This document provides a high-level overview of Playvora's architecture, system components, request lifecycle, and the engineering decisions that shape the application.

---

# Architecture Overview

Playvora follows a modern client-server architecture where the frontend, backend, and database are deployed independently and communicate through a REST API.

```text
                           User
                             │
                             ▼
                  React Frontend (Vite)
                             │
              React Router + TanStack Query
                             │
                       Axios HTTP Client
                             │
──────────────────────────────────────────────────
                   Express REST API
                             │
     Authentication • Validation • Middleware
                             │
               Controllers & Business Logic
                             │
                 MongoDB Atlas Database
                             │
                  Cloudinary (Media Storage)
```

Each layer has a well-defined responsibility, making the application easier to maintain, extend, and debug.

---

# Core Components

## Frontend

The frontend is responsible for:

- Rendering the user interface
- Managing routing
- Handling forms and validation
- Fetching and caching server data
- Displaying nearby activities on maps
- Managing lightweight client-side state

📖 See: **frontend.md**

---

## Backend

The backend acts as the application's central processing layer.

Responsibilities include:

- Authentication & Authorization
- Request validation
- Business logic
- Database operations
- Media uploads
- Standardized API responses

📖 See: **backend.md**

---

## Database

MongoDB stores application data, including:

- Users
- Activities
- Join requests
- Location information

GeoJSON and geospatial indexes power nearby activity discovery.

📖 See: **geospatial-discovery.md**

---

# Request Lifecycle

Every request follows a consistent processing pipeline.

```text
Client Request
      │
      ▼
Express Router
      │
      ▼
Global Middleware
      │
      ▼
Authentication (if required)
      │
      ▼
Request Validation
      │
      ▼
Controller
      │
      ▼
MongoDB
      │
      ▼
JSON Response
      │
      ▼
TanStack Query Cache
      │
      ▼
UI Update
```

Keeping this flow consistent across all endpoints simplifies development and debugging.

---

# Authentication Flow

Protected endpoints use JWT-based authentication.

```text
User Login
     │
     ▼
Credentials Verified
     │
     ▼
JWT Issued
     │
     ▼
Protected API Request
     │
     ▼
Authentication Middleware
     │
     ▼
Authorized Controller
```

Authentication is implemented as middleware, allowing controllers to remain focused on business logic.

---

# Activity Discovery

Location-aware activity discovery is one of Playvora's core features.

Instead of retrieving every activity, the backend performs geospatial queries using GeoJSON and MongoDB's **2dsphere** indexes to return only relevant nearby activities.

📖 Read the complete implementation in **geospatial-discovery.md**.

---

# Frontend–Backend Communication

The frontend communicates exclusively through REST APIs.

```text
React Component
        │
Custom Hook
        │
TanStack Query
        │
Axios Client
        │
REST API
        │
Express Controller
        │
MongoDB
```

Separating UI from API communication keeps components simple and encourages code reuse.

---

# Design Principles

Playvora is built around a few core engineering principles.

### Separation of Concerns

Each layer has a single responsibility.

- Components render UI.
- Hooks manage data.
- Controllers implement business logic.
- Models interact with the database.

---

### Feature-Based Organization

Frontend code is grouped by feature rather than file type, improving maintainability as the project grows.

---

### Server State vs Client State

Playvora distinguishes between:

- **Server State** → Managed by TanStack Query
- **Client State** → Managed by Zustand

This keeps global state lightweight while allowing React Query to handle networking, caching, and synchronization.

---

### Validation First

Incoming requests are validated before reaching business logic, ensuring controllers only operate on trusted data.

---

### Security by Default

Security-related concerns such as authentication, rate limiting, validation, and HTTP security headers are implemented centrally through middleware.

---

# Deployment Architecture

```text
                 Browser
                    │
                    ▼
           Vercel (Frontend)
                    │
               HTTPS Requests
                    │
                    ▼
          Render (Express API)
                    │
                    ▼
             MongoDB Atlas
                    │
                    ▼
              Cloudinary
```

The frontend and backend are deployed independently, allowing each service to evolve and scale without affecting the other.

---

# Documentation

For implementation details, refer to the corresponding documentation.

| Document | Description |
|----------|-------------|
| **frontend.md** | Frontend architecture and design decisions |
| **backend.md** | Backend implementation and middleware |
| **api.md** | REST API reference |
| **geospatial-discovery.md** | GeoJSON, nearby discovery, and location engine |

---

# Summary

Playvora adopts a layered architecture that separates presentation, business logic, and persistence into distinct components. By combining React, Express, MongoDB, TanStack Query, and GeoJSON, the project provides a maintainable foundation for building scalable location-based applications while keeping responsibilities clearly defined across the stack.