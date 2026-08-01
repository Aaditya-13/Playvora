# Mobile API Contract & Integration Rules

This document outlines how the mobile app communicates with the existing Playvora Node.js backend to ensure high-performance, resilient data flow.

## 1. Authentication Strategy (Bearer Tokens)
The web app uses HTTP-Only cookies. The mobile app **will not** use cookies.
Instead, the backend explicitly returns the `accessToken` in the JSON body upon login/registration.

### Login Payload & Response
`POST /api/v1/auth/login`
- **Body:** `{ email, password }`
- **Response:**
  ```json
  {
    "statusCode": 200,
    "data": {
      "user": { ... },
      "accessToken": "eyJh..."
    },
    "message": "Login successful"
  }
  ```

### Token Storage & Axios Interceptor
1. Store the `accessToken` securely using `expo-secure-store`.
2. Configure your Axios interceptor to append this token and gracefully handle 401s (token expiry) by directing the user to the login screen or attempting a silent refresh if implemented later:
   ```javascript
   axiosInstance.interceptors.request.use(async (config) => {
     const token = await SecureStore.getItemAsync('accessToken');
     if (token) config.headers.Authorization = `Bearer ${token}`;
     return config;
   });
   ```

## 2. Geospatial API (`/activities/nearby`)
The mobile map view will rely on the `nearby` endpoint.
`GET /api/v1/activities/nearby?lat=20.0059&lng=73.791`
- **Params:** `lat`, `lng` (Required)
- **Response:** Array of `Activity` objects containing a `location.coordinates` array (GeoJSON: `[longitude, latitude]`).
- **CRITICAL Map Constraint:** Always remember GeoJSON returns `[lng, lat]`, but `react-native-maps` expects `{ latitude, longitude }`. You must map these coordinates correctly on the frontend!

## 3. Network Resilience
- Mobile networks drop frequently. The API client must have defined timeout limits (e.g., 10 seconds).
- React Query should be configured to retry failed GET requests at least twice with exponential backoff before showing an error boundary.
