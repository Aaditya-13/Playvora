# 📖 API Reference

> Overview of Playvora's REST API, endpoint groups, authentication, and request conventions.

---

# 🌐 Base URL

### Development

```text
http://localhost:3000/api/v1
```

### Production

```text
https://your-domain.com/api/v1
```

---

# 🔐 Authentication

Most endpoints require authentication.

Authentication is handled using **JWT** and protected through middleware.

---

# 📦 Response Format

Successful responses

```json
{
    "success": true,
    "message": "...",
    "data": {}
}
```

Error responses

```json
{
    "success": false,
    "message": "...",
    "errors": []
}
```

---

# 🔑 Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register a new account |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| POST | `/auth/guest` | Guest login |
| GET | `/auth/me` | Current authenticated user |
| POST | `/auth/refresh-token` | Refresh access token |
| DELETE | `/auth/delete-account` | Delete account |

### Register Request

```json
{
    "username": "raju",
    "fullName": "Raju Sharma",
    "email": "raju@gmail.com",
    "password": "password123"
}
```

### Login Request

```json
{
    "email": "raju@gmail.com",
    "password": "password123"
}
```

---

# 👤 User

| Method | Endpoint | Description |
|---------|----------|-------------|
| PATCH | `/users/profile` | Update profile |
| PATCH | `/users/avatar` | Update avatar |
| PATCH | `/users/change-password` | Change password |
| PATCH | `/users/favourite-sports` | Update favourite sports |
| GET | `/users/me/stats` | User statistics |

---

# ⚽ Activities

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/activities` | Create activity |
| GET | `/activities/nearby` | Nearby activities |
| GET | `/activities/:id` | Activity details |
| GET | `/activities/my-created` | Created activities |
| GET | `/activities/my-joined` | Joined activities |
| PATCH | `/activities/:id` | Update activity |
| PATCH | `/activities/:activityId/cancel` | Cancel activity |
| DELETE | `/activities/:activityId` | Delete activity |
| POST | `/activities/:activityId/leave` | Leave activity |

### Create Activity Request

```json
{
    "title": "Sunday Football",
    "sport": "football",
    "groundName": "City Turf",
    "latitude": 20.0059,
    "longitude": 73.7910,
    "scheduledAt": "2026-07-10T18:00:00Z",
    "maxPlayers": 10,
    "visibilityRadius": 5000
}
```

---

# 📍 Nearby Activities

```http
GET /activities/nearby
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `lat` | User latitude |
| `lng` | User longitude |
| `radius` | Search radius (meters) |
| `page` | Pagination |
| `limit` | Results per page |

Example

```text
GET /activities/nearby?lat=20.0059&lng=73.791&radius=5000&page=1&limit=10
```

📖 Read more in **[`geospatial-discovery.md`](./docs/geospatial-discovery.md)**

---

# 🤝 Join Requests

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/activities/:id/join` | Send join request |
| GET | `/join-requests/sent` | Sent requests |
| GET | `/join-requests/received` | Received requests |
| PATCH | `/join-requests/:id/approve` | Approve request |
| PATCH | `/join-requests/:id/reject` | Reject request |
| DELETE | `/join-requests/:id` | Delete request |

---

# ✅ Attendance

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/attendance/:activityId` | Mark attendance |
| GET | `/attendance/:activityId` | View attendance |

Example

```json
{
    "attendance":[
        {
            "participantId":"USER_ID",
            "status":"present"
        }
    ]
}
```

---

# 📊 Utility Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/dashboard` | Dashboard data |
| GET | `/search?q=` | Global search |
| GET | `/bootstrap` | Initial application data |
| GET | `/health` | Health check |

---

# 🚦 HTTP Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 📝 Notes

- All request bodies are validated using **Zod**.
- Protected endpoints require authentication.
- File uploads use **multipart/form-data**.
- Nearby discovery uses **GeoJSON** and MongoDB geospatial queries.
- Responses follow a consistent JSON structure.

---

# 🚀 Testing

A complete Postman collection containing every endpoint and sample requests is included with the project for local API testing.

---

# 📌 Summary

Playvora exposes a RESTful API organized into authentication, users, activities, join requests, attendance, and utility endpoints. The API follows consistent request validation, standardized responses, and JWT-based authentication while supporting location-aware activity discovery through MongoDB geospatial queries.