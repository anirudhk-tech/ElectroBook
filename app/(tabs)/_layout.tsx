// Expo
import { Tabs } from "expo-router";

// React
import React, { useState, useEffect } from "react";
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
  const [ focusScreen, setFocusScreen ] = useState(anyType);

  useEffect(() => {
    const checkBack = () => {
      if (blurScreen == focusScreen) {
        return false;
      } else {
        return true;
      };
    };
    
    const handler = BackHandler.addEventListener('hardwareBackPress', checkBack);

    return () => handler.remove();
  }, [blurScreen, focusScreen]);

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
        focus: (e) => setFocusScreen(e.target)
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
      name="[libraryName]"
      options={{
        title: "Library Books",
        tabBarButton: () => null,
      }}
      />
      <Tabs.Screen
        name="uploadFileScreen"
        options={{
          title: "Upload",
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
