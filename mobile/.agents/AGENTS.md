# Playvora Mobile AI Guidelines

These rules apply globally to all tasks inside the `mobile` workspace. The expectation is a top-tier, premium mobile experience.

## 1. Zero Local Android SDK Rule
- **NEVER** attempt to install or use the local Android SDK.
- **NEVER** run `npm run android` or `expo run:android` if it triggers a local Gradle build.
- All native compilation must happen exclusively through EAS Build in the cloud.

## 2. The "Premium UI" Mandate
- **No Hallucinated UI:** You must proactively use skeleton loaders, bottom sheets (`@gorhom/bottom-sheet`), and fast lists (`@shopify/flash-list`). Do not default to plain `Text`, `FlatList`, or standard `<Modal>`.
- **Haptics:** Always integrate `expo-haptics` on interactive elements.
- **Fluid Animations:** Any loading transitions or state changes must be animated smoothly using `react-native-reanimated`.
- **Image Loading:** ALWAYS use `expo-image` for network images, complete with caching policies and blur-hashes. 

## 3. Shared Code Duplication
- Playvora is a Faux-Monorepo. Do not attempt to read from `../backend` via relative paths in code.
- If you need a Zod validation schema or constant from the backend, duplicate the code directly into the mobile app's `src/validations/` or `src/constants/` directory.

## 4. Secure API Communication
- Always retrieve the JWT token from Expo `SecureStore` (do not look for HTTP cookies).
- Always implement Optimistic Updates via React Query for mutations (e.g., joining an activity) to hide network latency.

## 5. Technology & Library Guidelines
- **TypeScript First:** We are exclusively using TypeScript for the mobile app (not JavaScript). Ensure all copied backend constants and schemas are typed appropriately (e.g., `.ts` extensions).
- **MANDATORY LIBRARY DOCS RULE:** You must ALWAYS look up and follow the **latest official documentation** specifically corresponding to the versions of the libraries installed in `package.json` (e.g., Expo SDK 57). Do not guess APIs; strictly follow the latest docs to prevent version mismatch issues.
