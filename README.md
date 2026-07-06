# ⚽ Playvora

> **Find. Organize. Play.**
>
> **Playvora** is a full-stack location-based sports community platform that helps players discover nearby sports activities, organize games, and connect with local communities. Built with a modern React frontend and an Express + MongoDB backend, the project emphasizes scalable architecture, clean code organization, and real-world engineering practices.

<p align="center">
  <a href="https://playvora-omega.vercel.app"><strong>🌐 Live Demo</strong></a>
  •
  <a href="./docs/architecture.md"><strong>Architecture</strong></a>
  •
  <a href="./docs/frontend.md"><strong>Frontend</strong></a>
  •
  <a href="./docs/backend.md"><strong>Backend</strong></a>
  •
  <a href="./docs/api.md"><strong>API</strong></a>
  •
  <a href="./docs/geospatial-discovery.md"><strong>📍 Geospatial Discovery</strong></a>
</p>

---

## 📖 Overview

Organizing casual sports games is still surprisingly difficult. Players often rely on scattered WhatsApp groups, social media posts, or word-of-mouth to find teammates and nearby matches.

Playvora brings everything together into one platform where users can create activities, discover games around them, manage participation, and build local sports communities through location-aware discovery.

Beyond the user experience, the project was built to explore production-oriented full-stack development, focusing on scalable architecture, security, validation, server-state management, and geospatial data modeling.

---

## ✨ Features

### 📍 Location-Based Discovery

- Discover nearby sports activities
- GeoJSON-powered geospatial search
- Configurable activity visibility radius
- Interactive maps with Leaflet
- Distance-aware activity discovery

### ⚽ Activity Management

- Create and organize sports activities
- View activity details
- Join or leave activities
- Manage participants

### 🔐 Authentication

- Secure user registration
- JWT Authentication
- Refresh token support
- Guest login
- Protected routes

### 💻 User Experience

- Mobile-first responsive design
- Skeleton loading states
- Toast notifications
- Form validation
- Clean and lightweight interface

### 🏗 Engineering Highlights

- Feature-based frontend architecture
- TanStack Query for server-state management
- Zod schema validation
- Centralized API error handling
- Security middleware
- Load testing using k6

---

# 🛠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React 19, Vite, React Router v7, Tailwind CSS v4 |
| **State Management** | TanStack Query, Zustand |
| **Forms & Validation** | React Hook Form, Zod |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT |
| **Maps & Geospatial** | Leaflet, GeoJSON |
| **Media Storage** | Cloudinary, Multer |
| **Security** | Helmet, Rate Limiting, Compression |
| **Deployment** | Vercel, Render, MongoDB Atlas |

---

# 🏗 System Overview

```text
                    Browser
                       │
                       ▼
              React + React Router
                       │
         TanStack Query + Axios Client
                       │
──────────────────────────────────────────
                Express REST API
                       │
     Authentication • Validation • Security
                       │
          Controllers • Database Models
                       │
           MongoDB Atlas + Cloudinary
```

A detailed explanation of the architecture is available in **[`docs/architecture.md`](./docs/architecture.md)**.

---

# 📚 Documentation

| Document | Description |
|----------|-------------|
| 🏗️ **[`architecture.md`](./docs/architecture.md)** | High-level system architecture and request lifecycle |
| ⚛️ **[`frontend.md`](./docs/frontend.md)** | Frontend architecture, state management, and design decisions |
| ⚙️ **[`backend.md`](./docs/backend.md)** | Backend architecture, middleware, authentication, and security |
| 📖 **[`api.md`](./docs/api.md)** | REST API reference with endpoints and request/response examples |
| ⭐ **[`geospatial-discovery.md`](./docs/geospatial-discovery.md)** | Deep dive into Playvora's location engine, GeoJSON, MongoDB geospatial queries, visibility radius, and nearby activity discovery |

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Aaditya-13/Playvora.git

cd Playvora
```

## Backend

```bash
cd backend

npm install

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory using the provided sample configuration.

```text
backend/.env.sample
```

Configure the required environment variables before running the application locally.

---

# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

**Live Demo:** https://playvora-omega.vercel.app

> **Note**
>
> Since the backend is hosted on Render's free tier, the first request may take a few seconds if the server is waking from inactivity.

---

# 🔒 Security

Playvora incorporates several security practices, including:

- JWT-based authentication
- Request validation using Zod
- Password hashing
- Helmet security headers
- API rate limiting
- Centralized error handling
- Environment-based configuration

---

# 📈 Performance

The backend includes **k6** load testing scripts for evaluating API performance and identifying bottlenecks. Performance benchmarks and optimization notes are maintained separately as the project evolves.

---

# 🗺 Roadmap

Future improvements include:

- Real-time chat
- Push notifications
- Team management
- Tournament support
- Activity recommendations
- Progressive Web App (PWA)
- Enhanced search & filtering

---

# 🤝 Contributing

Playvora is currently a personal portfolio project. Suggestions, bug reports, and constructive feedback are always welcome.

---

# 📄 License

This project is intended for educational and portfolio purposes unless stated otherwise.

---

<p align="center">
Built with ❤️ while exploring modern full-stack application architecture.
</p>