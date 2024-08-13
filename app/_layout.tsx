// Expo
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// React
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://04319c4944ba4d760abf804c4e3dad5b@o4507770620674048.ingest.us.sentry.io/4507770624147456',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }        
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
  );
};
