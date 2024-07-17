// React
import { View } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { check_user } from "../backend/controller";

// Expo
import { router } from "expo-router";

// Components
import { ElectroLogo } from "../../components/logo";

// Hooks
import { useColor } from "@/hooks/useTheme";
import { useChecks } from "@/hooks/useCheckUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function startingScreen() {
  const [checkRegister] = useChecks();
  const [primaryColor, secondaryColor] = useColor();

  useEffect(() => {
    const startingRouter = () => {
      if (checkRegister == true) {
        setTimeout(() => router.push("./libraryScreen"), 5000);
      } else {
        setTimeout(() => router.push("../(tabs)/registerScreen"), 5000);
      };
    };

    startingRouter();
  }, []);


  return (
    <View
      style={[
        styles.startingScreenMainView,
        { backgroundColor: secondaryColor },
      ]}
    >
      <ElectroLogo styles={[styles.startingScreenLogo, {tintColor: primaryColor}]} />
    </View>
  );
};
