import { Platform } from 'react-native';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { getConfiguredGoogleSignin } from '@/lib/google';

export async function signInWithGoogle(): Promise<void> {
  const GoogleSignin = await getConfiguredGoogleSignin();

  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  }

  const response = await GoogleSignin.signIn();
  if (response.type !== 'success') {
    throw new Error('Google Sign-In was cancelled.');
  }

  const { idToken } = response.data;

  if (!idToken) {
    throw new Error('Google Sign-In failed to return an ID token.');
  }

  const credential = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(auth, credential);
}

export async function signOut(): Promise<void> {
  await auth.signOut();

  try {
    const GoogleSignin = await getConfiguredGoogleSignin();
    await GoogleSignin.signOut();
  } catch {
    // No-op: module can be unavailable in Expo Go.
  }
}
