# ⚛️ Frontend Architecture

> An overview of Playvora's frontend architecture, state management, and engineering decisions.

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|--------------|
| ⚛️ Framework | React 19, Vite |
| 🧭 Routing | React Router v7 |
| 🔄 Server State | TanStack Query |
| 🗂️ Client State | Zustand |
| 📝 Forms | React Hook Form + Zod |
| 🎨 Styling | Tailwind CSS v4, shadcn/ui |
| 🗺️ Maps | Leaflet |
| 🌐 API Client | Axios |
| 🔔 Notifications | Sonner |
| ✨ Animations | Motion |

---

## 📂 Project Structure

```text
frontend/
│
├── public/
└── src/
    ├── api/
    ├── app/
    ├── assets/
    ├── components/
    ├── constants/
    ├── features/
    ├── hooks/
    ├── lib/
    ├── pages/
    ├── router/
    ├── store/
    └── utils/
```

---

## 🏗️ Architecture

The frontend follows a **feature-based architecture**, where each feature owns its components, hooks, API layer, and business logic.

```text
Page
 │
 ▼
Feature
 │
 ▼
Custom Hook
 │
 ▼
TanStack Query
 │
 ▼
Axios
 │
 ▼
Backend API
```

---

## 🧭 Routing

React Router v7 powers the application's navigation.

Current routes include:

- 🔓 Public Pages
- 🔐 Authentication
- 🏠 Dashboard
- ⚽ Activity Details
- ➕ Create Activity
- 👤 User Profile
- 🛡️ Protected Routes

---

## 🔄 State Management

Playvora separates **Server State** from **Client State**.

| Type | Library | Responsibility |
|------|---------|----------------|
| 🌍 Server State | TanStack Query | Fetching, Caching & Synchronization |
| 💾 Client State | Zustand | UI & Global Application State |

This separation keeps networking concerns independent from application logic.

---

## 🌐 Data Fetching

Every API request follows the same flow.

```text
Component
     │
     ▼
Custom Hook
     │
     ▼
TanStack Query
     │
     ▼
Axios Client
     │
     ▼
REST API
```

### Benefits

- ⚡ Automatic caching
- 🔄 Background refetching
- 🚀 Query invalidation
- ⏳ Loading states
- ❌ Error handling

---

## 📝 Forms & Validation

Forms are powered by:

- React Hook Form
- Zod Validation

This combination provides fast rendering, schema-based validation, and immediate user feedback before requests reach the backend.

---

## 🗺️ Maps & Location

Leaflet powers Playvora's location-aware experience.

Current capabilities include:

- 📍 Activity location preview
- 🗺️ Interactive maps
- 📌 Coordinate selection
- 🌍 Nearby activity visualization

> 📖 **Learn how nearby discovery works → [`geospatial-discovery.md`](./geospatial-discovery.md)**

---

## 🧩 Reusable Components

Shared UI components improve consistency across the application.

Examples include:

- 🔘 Buttons
- 📝 Inputs
- 🪪 Cards
- 💬 Dialogs
- 🏷️ Badges
- 🧭 Navigation
- 💀 Skeleton Loaders
- 📭 Empty States

---

## ⚡ Performance

Current frontend optimizations:

- ⚡ TanStack Query caching
- 🔁 Request deduplication
- 💀 Skeleton loading
- ♻️ Component reuse
- 📦 Lazy loading (where applicable)
- 🪶 Lightweight global state

---

## 🤔 Engineering Decisions

| Decision | Why? |
|----------|------|
| 🏗️ Feature-Based Architecture | Better scalability and maintainability |
| 🔄 TanStack Query | Efficient server-state management |
| 🗂️ Zustand | Lightweight global state |
| 📝 React Hook Form | Minimal re-renders |
| ✅ Zod | Schema-first validation |
| 🌐 Axios | Centralized API communication |
| 🎨 Tailwind CSS | Rapid and consistent UI development |

---

## 🔮 Future Improvements

- 📱 Progressive Web App (PWA)
- 🌐 Offline Support
- ♾️ Infinite Scrolling
- 📋 Virtualized Lists
- 🌙 Dark Mode
- 🌍 Internationalization (i18n)
- ♿ Accessibility Improvements

---

## 📌 Summary

The Playvora frontend emphasizes **modularity**, **reusability**, and **predictable state management**. By separating server state from client state and organizing code by feature, the application remains easy to maintain while delivering a fast and responsive user experience.