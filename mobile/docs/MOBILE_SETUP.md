# Mobile Setup & Build Workflow

This guide details exactly how to initialize the Expo project and utilize EAS for builds, strictly avoiding local Android SDK installations.

## 1. Project Initialization
Do not run this until you are ready to write code.
```bash
cd d:\Coding\Playvora\mobile
npx create-expo-app@latest .
```

## 2. Environment Variables
Since you will test on a physical device, `localhost` points to the phone itself, NOT your computer.
- You must use your computer's local IP address (e.g., `192.168.1.X`).
- Create an `.env` file in the `mobile` directory:
  ```env
  EXPO_PUBLIC_API_URL=http://192.168.1.X:3000/api/v1
  ```

## 3. EAS (Expo Application Services) Configuration
We will use EAS for all native compilations.
1. Install EAS CLI globally if not already installed: `npm install -g eas-cli`
2. Login: `eas login`
3. Configure the project: `eas build:configure`

### `eas.json` Profiles
Ensure your `eas.json` is set up to produce an `.apk` (for Android) rather than an `.aab` during development/preview so you can easily install it on your physical phone:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {}
  }
}
```

## 4. How to Build & Run
**Standard UI Dev:**
```bash
npx expo start
```
*(Scan the QR code with the Expo Go app on your physical phone).*

**When adding Native Modules (Custom Dev Client):**
1. Run `eas build --profile development --platform android`
2. Download the resulting APK to your phone and install it.
3. Run `npx expo start --dev-client`
4. Open the installed app on your phone and connect to the local bundler.
