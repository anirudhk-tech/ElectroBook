// Expo
import { router, Tabs, useSegments } from "expo-router";

// React
import React, { useState, useEffect, useCallback } from "react";
import { BackHandler } from "react-native";

// Backend
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { styles } from "@/constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useChecks } from "../../hooks/useCheckUser";

export default function TabLayout() {
  let anyType: any = "default"
  const { primaryColor, secondaryColor } = useColor();
  const { settingsCheck } = useChecks();
  const [ blurScreen, setBlurScreen ] = useState(anyType);

  useEffect(() => {
    const screenName = blurScreen.split("-")[0];

    const checkBack = () => {
      if (router.canDismiss()) {
        router.dismiss();
      } else {
        if (screenName == "menuScreen") {
          router.navigate('/libraryScreen');
          return true
        };
        router.navigate(`/${screenName}`);
      };
      return true;
    };
    
    const handler = BackHandler.addEventListener('hardwareBackPress', checkBack);

    return () => handler.remove();
  }, [blurScreen]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: primaryColor,
        tabBarActiveBackgroundColor: primaryColor,
        tabBarInactiveBackgroundColor: secondaryColor,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        unmountOnBlur:true,
      }}
      screenListeners={{
        blur: (e) => setBlurScreen(e.target),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: styles.invisible,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="registerScreen"
        options={{
          tabBarStyle: styles.invisible,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="libraryScreen"
        options={{
          title: "Library",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={"book"}
              color={focused ? secondaryColor : primaryColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="uploadFileScreen"
        options={{
          title: "Add",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={"add"}
              color={focused ? secondaryColor : primaryColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statsScreen"
        options={{
          title: "Stats",
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={"stats-chart-outline"}
              color={focused ? secondaryColor : primaryColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settingsScreen"
        options={{
          title: "Settings",
          tabBarStyle: settingsCheck == false ? styles.invisible : styles.tabBarStyle,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={"settings"}
              color={focused ? secondaryColor : primaryColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="readingTestScreen"
        options={{
          title: "Reading Test",
          tabBarStyle: styles.invisible,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="menuScreen"
        options={{
          title: "Index",
          tabBarStyle: styles.invisible,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
