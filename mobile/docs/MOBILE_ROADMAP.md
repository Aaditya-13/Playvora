# Mobile Development Roadmap

This document outlines the sequential milestones for building the Playvora mobile app with a focus on delivering a premium, native feel.

## 🔴 Phase 1: Scaffold, Navigation, & Authentication
- [ ] Initialize Expo project in the `mobile` directory.
- [ ] Configure `eas.json` for development and preview APK builds.
- [ ] Setup NativeWind, Expo Router, and React Query.
- [ ] Build Login / Registration screens featuring smooth keyboard-avoiding views.
- [ ] Connect to backend using Axios and store the `accessToken` in Expo `SecureStore`.

## 🔴 Phase 2: Feed & Geospatial Search
- [ ] Install `react-native-maps` and `@shopify/flash-list`.
- [ ] Query `/api/v1/activities/nearby` using device location.
- [ ] Build a robust map interface with custom markers and bottom sheet (`@gorhom/bottom-sheet`) previews.
- [ ] Build a 60fps FlashList feed with beautiful skeleton loaders (`expo-image` integration).

## 🔴 Phase 3: Activity Details
- [ ] Build the Activity Details screen with sticky blur-headers.
- [ ] Implement Native Share API logic (equivalent to web's `ShareActivityModal`).
- [ ] Connect Join/Leave mutations with **Optimistic UI Updates**.

## 🔴 Phase 4: Activity Creation
- [ ] Build the "Create Activity" multi-step flow using smooth sliding transitions (`react-native-reanimated`).
- [ ] Integrate local image picking (`expo-image-picker`) for activity banners.

## 🔴 Phase 5: Premium Polish (Crucial)
- [ ] Audit entire app for `expo-haptics` integration on all interactions.
- [ ] Audit all network states (Offline detection, Error Boundaries).
- [ ] Add micro-animations (e.g., heart pulse on like, spring animations on modal openings).
