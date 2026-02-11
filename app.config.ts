import type { ExpoConfig } from 'expo/config';
import appJson from './app.json';

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const baseConfig = appJson.expo as ExpoConfig;

export default (): ExpoConfig => ({
  ...baseConfig,
  extra: {
    ...(baseConfig.extra ?? {}),
    firebase: {
      apiKey: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_API_KEY, 'EXPO_PUBLIC_FIREBASE_API_KEY'),
      authDomain: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN, 'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
      projectId: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID, 'EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
      storageBucket: requireEnv(
        process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
      ),
      messagingSenderId: requireEnv(
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      ),
      appId: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_APP_ID, 'EXPO_PUBLIC_FIREBASE_APP_ID'),
    },
    googleSignIn: {
      webClientId: requireEnv(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, 'EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID'),
      androidClientId: requireEnv(
        process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        'EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID',
      ),
      iosClientId: requireEnv(process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID, 'EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID'),
    },
  },
});
