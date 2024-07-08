// Expo
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// React
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';

// Backed
import { ThemeContext } from '@/constants/context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [primaryColor, setPrimaryColor] = useState("#24C2F4");
  const [secondaryColor, setSecondaryColor] = useState("black");

  const changeColors = (primary: any, secondary: any) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
  };

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
      <ThemeContext.Provider value={{"primaryColor": primaryColor, "secondaryColor": secondaryColor, "changeColors": changeColors}}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
      </ThemeContext.Provider>
  );
}
