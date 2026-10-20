# Dharma app

Expo Router application for Dharma.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and fill in the Firebase web app configuration values from Firebase Console → Project settings → Your apps.
3. Start Expo with `npm start` and open the app on a supported platform.

Firebase configuration is read from `EXPO_PUBLIC_FIREBASE_*` variables. The app reports a clear error at startup if a required value is missing. These values are embedded in client builds, so use Firebase security rules and API key restrictions; do not put private server credentials in this file.
