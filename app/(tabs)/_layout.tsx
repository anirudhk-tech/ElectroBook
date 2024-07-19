// Expo
import { Tabs } from "expo-router";

// React
import React, { useState } from "react";

// Backend
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { styles } from "@/constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useChecks } from "../../hooks/useCheckUser";

export default function TabLayout() {
  const [firstTime, setFirstTime] = useState(true);
  const {primaryColor, secondaryColor} = useColor();
  const {settingsCheck} = useChecks();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: primaryColor,
        tabBarActiveBackgroundColor: primaryColor,
        tabBarInactiveBackgroundColor: secondaryColor,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        unmountOnBlur: true
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
