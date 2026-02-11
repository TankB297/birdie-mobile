import Constants from 'expo-constants';

type GoogleSignInConfig = {
  webClientId: string;
  iosClientId?: string;
  androidClientId?: string;
};

type GoogleSigninModule = typeof import('@react-native-google-signin/google-signin').GoogleSignin;

const config = Constants.expoConfig?.extra?.googleSignIn as GoogleSignInConfig | undefined;
let configured = false;

function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo';
}

async function getGoogleSignin(): Promise<GoogleSigninModule> {
  if (isExpoGo()) {
    throw new Error(
      'Google Sign-In via @react-native-google-signin/google-signin is not available in Expo Go. Use a development build (expo run:ios / expo run:android).',
    );
  }

  const module = await import('@react-native-google-signin/google-signin');
  return module.GoogleSignin;
}

export async function configureGoogleSignin(): Promise<void> {
  if (configured) return;
  if (!config?.webClientId) {
    throw new Error('Missing Google Sign-In config in app.json (expo.extra.googleSignIn).');
  }

  const GoogleSignin = await getGoogleSignin();

  GoogleSignin.configure({
    webClientId: config.webClientId,
    iosClientId: config.iosClientId,
    offlineAccess: false,
    forceCodeForRefreshToken: false,
  });

  configured = true;
}

export async function getConfiguredGoogleSignin(): Promise<GoogleSigninModule> {
  await configureGoogleSignin();
  return getGoogleSignin();
}
