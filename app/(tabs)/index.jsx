// React
import { View } from "react-native";
import { useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { establish_userDb } from "../backend/controller";

// Expo
import { router } from "expo-router";

// Components
import { ElectroLogo } from "../../components/General/logo";

// Hooks
import { useColor } from "@/hooks/useTheme";
import { useChecks } from "@/hooks/useCheckUser";

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

    establish_userDb();
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
