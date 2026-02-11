import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence, type Auth } from 'firebase/auth';

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const config = Constants.expoConfig?.extra?.firebase as FirebaseConfig | undefined;

if (!config) {
  throw new Error('Missing Firebase configuration in app.json (expo.extra.firebase).');
}

const app = getApps().length ? getApps()[0] : initializeApp(config);

let authInstance: Auth;

if (Platform.OS === 'web') {
  authInstance = getAuth(app);
} else {
  try {
    authInstance = initializeAuth(app, {
      persistence: inMemoryPersistence,
    });
  } catch {
    authInstance = getAuth(app);
  }
}

export const auth = authInstance;
