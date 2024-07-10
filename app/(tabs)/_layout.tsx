// Expo
import { Tabs } from 'expo-router';

// React
import React, { useContext, useState } from 'react';

// Backend
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemeContext } from '@/constants/context';
import { styles } from '@/constants/stylers';
import { get_data } from '../backend/controller';


export default function TabLayout() {
  const context: any = useContext(ThemeContext);
  const [firstTime, setFirstTime] = useState(true);
  const primaryColor = context.primaryColor;
  const secondaryColor = context.secondaryColor;

  get_data("settings completed").then(data => {
    if (data) {
      setFirstTime(false)
    } else {
      setFirstTime(true)
    }
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: primaryColor,
        tabBarActiveBackgroundColor: primaryColor,
        tabBarInactiveBackgroundColor: secondaryColor,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false, 
      }}> 
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
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={'book'} color={focused ? secondaryColor : primaryColor}/>
          ),
        }}
      />
      <Tabs.Screen
        name="uploadFileScreen"
        options={{
          title: "Upload",
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={'add'} color={focused ? secondaryColor : primaryColor}/>
          ),
        }}
      />
      <Tabs.Screen
        name="statsScreen"
        options={{
          title: "Stats",
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={'stats-chart-outline'} color={focused ? secondaryColor : primaryColor}/>
          ),
        }}
      />
      <Tabs.Screen
        name="settingsScreen"
        options={{
          title: "Settings",
          tabBarStyle: firstTime ? styles.invisible : styles.tabBarStyle,
          tabBarIcon: ({focused}) => (
            <TabBarIcon name={'settings'} color={focused ? secondaryColor : primaryColor}/>
          ),
        }}
      />
      <Tabs.Screen
        name="readingTestScreen"
        options={{
          title: "Reading Test",
          tabBarStyle: styles.invisible,
          tabBarButton: () => null
        }}
      />
      <Tabs.Screen
        name="menuScreen"
        options={{
          title: "Index",
          tabBarStyle: styles.invisible,
          tabBarButton: () => null
        }}
      />
    </Tabs>
  );
}
