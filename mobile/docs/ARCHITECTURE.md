# Playvora Mobile App Architecture

This document outlines the high-level architecture constraints and boundaries for the Playvora mobile application, built with Expo (React Native). The goal is to build a highly performant, premium sports discovery app (inspired by Playo/Khelomore) that feels entirely native.

## 1. Monorepo Layout (Polyrepo approach)
Playvora uses a "faux-monorepo" layout. 
- `backend/` - Node.js Express server deployed to Render.
- `frontend/` - React Vite web app deployed to Vercel.
- `mobile/` - Expo mobile app built via EAS Build.

**Constraint:** Do NOT attempt to set up npm/pnpm workspaces. The `mobile` folder is 100% self-contained.

## 2. Premium Performance Tech Stack
To achieve a premium, 60FPS feel, we enforce strict library choices:
- **Lists:** Use `@shopify/flash-list` exclusively instead of React Native's default `FlatList`. It is vastly superior for complex feeds.
- **Animations:** Use `react-native-reanimated` exclusively. Never use the legacy React Native `Animated` API to ensure animations run on the UI thread.
- **BottomSheet:** Use `@gorhom/bottom-sheet` for smooth, native-feeling modal overlays.
- **Image Caching:** Use `expo-image` for aggressive caching and blur-hash loading states. Do NOT use the default `<Image>`.

## 3. Shared Code Strategy (Duplication)
- Zod Schemas (`ActivitySchema`, etc.) must be manually copied from `backend/src/validations` to `mobile/src/validations`.
- Constants (`activity.constants.ts`, etc.) must be manually copied and typed.

## 4. Expo & Build Architecture
We are strictly relying on **EAS (Expo Application Services)**.
- **NO LOCAL ANDROID SDK:** Do not attempt to use `Android Studio`.
- **Custom Native Code:** When integrating libraries like `react-native-maps` or `reanimated`, you must add their Expo Plugins to `app.json` and trigger `eas build --profile development --platform android` to generate a custom dev client.

## 5. State Management & API
- **API Client:** Axios (configured to send `Authorization: Bearer <token>`).
- **State:** `@tanstack/react-query` for remote data fetching, matching the web app.
- **Navigation:** Expo Router (file-based routing).
