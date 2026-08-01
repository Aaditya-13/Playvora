# Mobile Coding Conventions & Premium UI Rules

## 1. Expo Router (File-based Routing)
Playvora Mobile uses Expo Router.
- All screens live inside the `mobile/app/` directory.
- `app/(auth)/login.jsx` for auth screens.
- `app/(tabs)/index.jsx` for main tab navigation.

## 2. Directory Structure
```text
mobile/
├── app/                  # Screens and Navigation (Expo Router)
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks (React Query)
│   ├── lib/              # Axios instances, utilities
│   ├── validations/      # Zod schemas (copied from backend)
│   └── constants/        # Shared constants (copied from backend)
├── docs/                 # Documentation (You are here)
└── .agents/              # AI Agent context and rules
```

## 3. Styling & The "Premium Feel"
- **NativeWind:** Use Tailwind CSS for React Native.
- **Haptic Feedback:** Import `expo-haptics`. Trigger light haptics (`Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)`) on all meaningful button presses (like, join, share).
- **Skeleton Loaders:** Do not use basic "Loading..." text or generic spinners. Use highly polished, animated skeleton loaders for all feed lists and detail screens while data is fetching.
- **Glassmorphism:** Use `expo-blur` (`BlurView`) for bottom tabs, sticky headers, and floating action buttons to give a modern, layered depth.
- **Micro-animations:** Elements (like heart icons, join buttons, or cards) should have subtle spring animations when tapped using Reanimated.

## 4. State Management & Offline Awareness
- Use `@tanstack/react-query` for all server state.
- **Optimistic Updates:** When a user taps "Join Activity", immediately update the UI locally using React Query's `onMutate` before the server responds to make the app feel instantaneously fast.
- Check for network connectivity using `expo-network` and display graceful fallback UI when offline.
