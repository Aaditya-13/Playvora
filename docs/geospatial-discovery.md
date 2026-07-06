# 📍 Geospatial Discovery

> One of Playvora's core features is its ability to discover nearby sports activities using MongoDB's geospatial capabilities. This document explains how location data flows through the system, why GeoJSON was chosen, and the engineering decisions behind the nearby discovery engine.

---

# Why Geospatial Discovery?

Traditional CRUD applications retrieve every record and rely on client-side filtering.

For a location-based platform, this approach quickly becomes inefficient as the number of activities grows.

Instead, Playvora treats location as a first-class entity by storing activities as geographic points and allowing the database to perform efficient spatial queries.

---

# System Overview

```text
                Organizer
                    │
        Creates an Activity
                    │
                    ▼
          GeoJSON Location Stored
                    │
              MongoDB Database
─────────────────────────────────────────
                    │
                    ▼
                 Player
                    │
        Shares Current Location
                    │
                    ▼
          Nearby Activities API
                    │
                    ▼
       Geospatial Query + Filtering
                    │
                    ▼
        Distance Sorted Activities
                    │
                    ▼
              React Application
```

---

# GeoJSON Data Model

Every activity stores its location using the GeoJSON **Point** format.

```json
{
  "type": "Point",
  "coordinates": [
    longitude,
    latitude
  ]
}
```

Using GeoJSON allows MongoDB to understand locations as geographic objects instead of simple numeric values.

---

# Why GeoJSON?

Although storing latitude and longitude as separate fields is simpler, it makes efficient geospatial querying difficult.

GeoJSON provides several advantages:

- Native MongoDB geospatial support
- Efficient radius-based searching
- Distance calculations
- Standardized location format
- Future compatibility with additional map features

---

# 2dsphere Index

Playvora creates a **2dsphere** index on activity locations.

Instead of scanning every activity in the database, MongoDB uses this spatial index to quickly identify activities within the requested search radius.

This allows nearby discovery to scale much better as the dataset grows.

---

# Visibility Radius

Every activity includes a configurable **visibility radius**.

Rather than exposing every activity globally, organizers decide how far away their activity should be discoverable.

Examples:

| Visibility Radius | Typical Use Case |
|------------------:|------------------|
| 2 km | Small neighborhood games |
| 5 km | Community sports |
| 10 km | City-wide activities |
| 20+ km | Tournaments or large events |

This improves relevance while giving organizers control over activity discovery.

---

# Nearby Discovery Flow

```text
Browser
    │
Current Location
    │
    ▼
React Query
    │
Axios Request
    │
    ▼
Nearby Activities API
    │
Coordinate Validation
    │
    ▼
MongoDB Geospatial Query
    │
Distance Filtering
    │
Visibility Radius Check
    │
    ▼
Nearby Activities
    │
React Query Cache
    │
    ▼
Activity Cards
```

---

# Frontend Responsibilities

The frontend is responsible for:

- Requesting the user's location
- Sending coordinates to the backend
- Displaying nearby activities
- Rendering interactive maps
- Caching nearby results using TanStack Query

The frontend intentionally avoids performing distance calculations, leaving geospatial operations to the database.

---

# Backend Responsibilities

The backend handles:

- Coordinate validation
- Geospatial queries
- Visibility filtering
- Activity retrieval
- Response formatting

Keeping these operations server-side ensures consistent results and prevents exposing unnecessary data.

---

# Why Server-Side Discovery?

Performing location filtering on the backend provides several advantages:

- Smaller API responses
- Better scalability
- Faster client rendering
- Consistent distance calculations
- Reduced client-side processing

Instead of downloading hundreds of activities and filtering locally, only relevant activities are returned.

---

# Engineering Decisions

### Why MongoDB?

MongoDB provides built-in support for geospatial indexes and GeoJSON, making it well suited for location-aware applications without introducing additional GIS infrastructure.

---

### Why Leaflet?

Leaflet is lightweight, open source, and integrates well with React while avoiding the complexity and usage restrictions of commercial mapping platforms.

---

### Why Configurable Visibility Radius?

Different activities naturally have different audiences.

A neighborhood badminton game and a city-wide football tournament should not have the same discoverability range.

Giving organizers control improves the relevance of nearby search results.

---

### Why React Query?

Nearby activities change frequently as users move, create activities, or join games.

TanStack Query automatically manages caching, background refetching, and cache invalidation, reducing unnecessary network requests while keeping the UI synchronized with the backend.

---

# Future Improvements

Potential enhancements include:

- Dynamic search radius
- Polygon and city boundary search
- Route-based distance calculations
- Activity clustering
- Heatmaps
- Location-based recommendations
- Real-time nearby activity updates

---

# Summary

Geospatial discovery is one of Playvora's defining capabilities.

By combining **GeoJSON**, **MongoDB's 2dsphere indexes**, **configurable visibility radii**, **Leaflet**, and **TanStack Query**, the application efficiently connects players with relevant nearby sports activities while maintaining scalability and a clean separation of responsibilities between the frontend and backend.