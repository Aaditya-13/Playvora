# 🧠 Engineering Decisions

> Personal notes documenting the reasoning behind the technical decisions made while building Playvora. This document serves as a knowledge base for future development and interview preparation.

---

# Why React?

React provides a component-based architecture with a mature ecosystem. Combined with Vite, it offers a fast development experience while remaining flexible enough for medium-sized applications.

---

# Why Vite?

- Extremely fast startup
- Instant HMR
- Minimal configuration
- Excellent React support

---

# Why Feature-Based Architecture?

Instead of grouping files by type (`components/`, `hooks/`, `utils/`), related files are colocated inside each feature.

Benefits:

- Easier navigation
- Better scalability
- Less coupling
- Features remain self-contained

---

# Why TanStack Query?

Server state behaves differently from client state.

Instead of manually handling:

- Loading
- Errors
- Caching
- Refetching
- Request deduplication

TanStack Query solves these problems with a small API while reducing boilerplate.

---

# Why Zustand?

Redux felt unnecessary for the project's scale.

Zustand provides:

- Small bundle size
- Minimal boilerplate
- Simple API
- Great developer experience

Perfect for lightweight global state.

---

# Why React Hook Form?

Forms can trigger many unnecessary re-renders.

React Hook Form minimizes renders while integrating seamlessly with schema validation libraries.

---

# Why Zod?

Validation should happen before business logic.

Benefits:

- Schema-first validation
- Type-safe
- Reusable schemas
- Better error messages
- Cleaner controllers

---

# Why Axios?

Instead of calling fetch() everywhere:

- Centralized configuration
- Interceptors
- Better error handling
- Cleaner API layer

---

# Why MongoDB?

Playvora stores flexible, document-oriented data.

MongoDB naturally models:

- Users
- Activities
- Participants
- Nested documents

It also provides native GeoJSON support.

---

# Why GeoJSON?

Location is a core part of Playvora.

Instead of storing:

```json
{
    "latitude": ...,
    "longitude": ...
}
```

Activities are stored as:

```json
{
    "type": "Point",
    "coordinates": [
        longitude,
        latitude
    ]
}
```

Advantages:

- Native MongoDB geospatial queries
- 2dsphere indexes
- Distance calculations
- Standardized format

---

# Why MongoDB instead of PostgreSQL + PostGIS?

For this project:

- Easier setup
- Flexible schema
- Native GeoJSON support
- Better fit for document data

PostGIS is more powerful but unnecessary for the current scope.

---

# Why Leaflet?

Google Maps was intentionally avoided.

Leaflet is:

- Open source
- Lightweight
- No API key
- No usage limits
- Easy React integration

---

# Why Visibility Radius?

Not every activity should be globally discoverable.

A configurable visibility radius allows organizers to control how far away their activity can appear in nearby searches.

---

# Why Server-Side Nearby Search?

Instead of sending every activity to the client:

- Smaller responses
- Better scalability
- Faster rendering
- Consistent distance calculations

The backend is better suited for geospatial computation.

---

# Why JWT?

JWT provides stateless authentication suitable for REST APIs.

Combined with refresh tokens, it allows secure session management without storing session data on the server.

---

# Why Cloudinary?

Images shouldn't be stored inside the backend.

Cloudinary handles:

- Storage
- Optimization
- CDN delivery
- Image transformations

---

# Why Centralized Error Handling?

Instead of writing try/catch logic everywhere:

- Consistent API responses
- Cleaner controllers
- Easier debugging

---

# Why Middleware?

Authentication, validation, and security are cross-cutting concerns.

Keeping them in middleware avoids duplicating logic across controllers.

---

# Why k6?

Performance shouldn't be an afterthought.

Even for a portfolio project, load testing provides insight into how the application behaves under concurrent requests.

---

# Future Considerations

If Playvora continues to grow, potential additions include:

- Redis caching
- WebSockets
- Push notifications
- Recommendation engine
- Background jobs
- CI/CD pipeline
- Docker
- Kubernetes (learning purpose)

---

# Lessons Learned

Some of the biggest takeaways while building Playvora:

- Server state and client state should be managed differently.
- Feature-based architecture scales better than type-based organization.
- Validation should happen before business logic.
- Geospatial queries are significantly more efficient than client-side filtering.
- Good project structure reduces future complexity.
- Small architectural decisions compound as a project grows.