# ⚙️ Backend

> Overview of the Playvora backend architecture, request lifecycle, security, and implementation details.

---

# 🚀 Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Validation | Zod |
| File Uploads | Multer, Cloudinary |
| Security | Helmet, CORS, express-rate-limit |
| Performance | Compression, k6 |

---

# 📂 Folder Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   └── app.js
│
├── docs/
├── k6/
├── public/
└── package.json
```

The project follows a layered architecture where each layer has a single responsibility—routing, validation, business logic, and persistence remain independent.

---

# 🔄 Request Lifecycle

Every request follows the same pipeline.

```text
Client
   │
   ▼
Express Router
   │
Helmet • CORS • Compression
   │
Rate Limiter
   │
JWT Authentication (Protected Routes)
   │
Zod Validation
   │
Controller
   │
MongoDB / Cloudinary
   │
Global Error Handler
   │
JSON Response
```

This keeps controllers focused entirely on business logic.

---

# 📝 Request Validation

Playvora validates incoming requests using **Zod** before they reach the controllers.

```js
export const createActivitySchema = z.object({
    title: z.string().trim().min(3).max(100),
    sport: z.enum(SPORTS),
    latitude: z.number(),
    longitude: z.number(),
    scheduledAt: z.string(),
    maxPlayers: z.number(),
    visibilityRadius: z.number(),
});
```

### Why validate first?

- Prevent invalid data from reaching business logic
- Keep controllers clean
- Return consistent validation errors
- Maintain predictable API contracts

---

# 🔐 Authentication

Authentication is handled using JWT and middleware.

Protected routes are verified before controller execution, ensuring only authenticated users can access secured resources.

Current authentication features include:

- User Registration
- User Login
- Guest Login
- Access Token Verification
- Refresh Token Endpoint
- Logout
- Account Deletion

---

# 🛡️ Security

Security is applied centrally through middleware instead of individual controllers.

| Feature | Implementation |
|---------|----------------|
| Security Headers | Helmet |
| Password Hashing | bcrypt |
| Request Validation | Zod |
| Rate Limiting | express-rate-limit |
| Response Compression | compression |
| Cookie Support | cookie-parser |
| CORS | Configured through environment variables |

Current rate limiting:

| Route | Limit |
|-------|-------|
| General API | **200 requests / 15 minutes / IP** |
| Login | **15 requests / 15 minutes / IP** |
| Register / Guest Login | **10 requests / hour / IP** |

---

# ⚽ Activity Management

The backend powers the complete activity lifecycle.

Supported operations include:

- Create Activity
- Update Activity
- Cancel Activity
- Delete Activity
- View Activity Details
- Browse Nearby Activities
- View Created Activities
- View Joined Activities
- Leave Activity

---

# 📍 Geospatial Discovery

Playvora stores activity locations using **GeoJSON**.

```js
location: {
    type: {
        type: String,
        enum: ["Point"],
        default: "Point",
    },
    coordinates: {
        type: [Number],
        required: true,
    },
}
```

The location field is indexed using MongoDB's **2dsphere** index, enabling efficient nearby searches without scanning the entire collection.

📖 **Read the complete implementation in `geospatial-discovery.md`.**

---

# ☁️ Media Uploads

Profile images follow a simple upload pipeline.

```text
Client
   │
   ▼
Multer
   │
Cloudinary
   │
Avatar URL
   │
MongoDB
```

Separating media storage from the database keeps documents lightweight while allowing Cloudinary to handle image hosting and delivery.

---

# ⚠️ Error Handling

Errors are handled centrally through a global middleware.

Benefits include:

- Consistent response structure
- Proper HTTP status codes
- Cleaner controller code
- Easier debugging

Typical error response:

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": []
}
```

---

# 🌐 API Structure

```text
/api/v1
│
├── auth/
├── users/
├── activities/
├── join-requests/
├── attendance/
├── dashboard/
├── search/
└── bootstrap/
```

Complete endpoint documentation is available in **`api.md`**.

---

# ⚡ Performance

Current backend optimizations include:

- Response Compression
- MongoDB Indexing
- Geospatial Queries
- Request Rate Limiting
- Load Testing using k6

The project also includes a dedicated **k6** directory for stress and load testing API endpoints.

---

# 🚧 Known Limitations

Every project has trade-offs. Current areas for future improvement include:

- Join request approval can benefit from stronger concurrency handling.
- Redis caching has not yet been introduced.
- Background jobs are not implemented.
- WebSocket support is planned for future real-time features.

---

# 📈 Future Improvements

- Redis
- Background Jobs
- WebSockets
- Push Notifications
- Recommendation Engine
- Event Scheduling
- Distributed Caching

---

# 📌 Summary

The Playvora backend follows a layered architecture that separates routing, validation, authentication, business logic, and persistence into independent layers. By combining Express, MongoDB, JWT, Zod, Cloudinary, and GeoJSON, the backend remains modular, maintainable, and ready to support future features while keeping controllers concise and business-focused.