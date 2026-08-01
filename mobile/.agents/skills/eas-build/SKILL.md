---
name: eas-build
description: Explains how to trigger and test native Expo builds via EAS without using the local Android SDK.
---

# EAS Build Workflow

Because we do NOT use the local Android SDK, any time a native module is added that requires custom compilation (e.g., `react-native-maps`, `react-native-reanimated`, `expo-secure-store`), you must build a custom Development Client in the cloud via EAS.

## Step 0: Pre-requisites (Critical)
Before triggering an EAS build, you MUST ensure that any required Expo Plugins (like `"react-native-reanimated/plugin"`) are correctly added to `app.json` or `babel.config.js`. If you miss this, the cloud build will fail or the app will crash on launch.

## Step 1: Trigger the Build
Run the following command to tell EAS to compile the app in the cloud and generate an APK:
```bash
eas build --profile development --platform android
```
*(This command will output a QR code and a link to the APK).*

## Step 2: Instruct the User
Once the build completes, stop executing commands and instruct the user to:
1. Open the EAS link on their Android phone.
2. Download and install the `.apk` file.

## Step 3: Start the Local Dev Server
Once the user has installed the APK, start the Expo bundler locally so their phone can connect to it over the local network:
```bash
npx expo start --dev-client
```
