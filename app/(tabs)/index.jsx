// React
import { useCallback } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { establish_userDb } from "../backend/controller";

// Expo
import { router } from "expo-router";

// Components
import { ElectroLogo } from "../../components/General/logo";

// Node Modules
import * as Animatable from 'react-native-animatable';

// Hooks
import { useColor } from "@/hooks/useTheme";
import { useChecks } from "@/hooks/useCheckUser";

export default function startingScreen() {
  const { check } = useChecks();
  const { primaryColor, secondaryColor } = useColor();
  const startingRouter = useCallback(() => {
    if (check == true) {
      router.push("./libraryScreen");
    } else {
      router.push("../(tabs)/registerScreen");
    };
  }, [check]);

  return (
    <Animatable.View
      animation={"flipOutY"}
      delay={1000}
      useNativeDriver={true}
      onAnimationBegin={establish_userDb}
      onAnimationEnd={startingRouter}
      easing={'ease-in'}
      style={[
        styles.startingScreenMainView,
        { backgroundColor: secondaryColor },
      ]}
    >
      <ElectroLogo styles={[styles.startingScreenLogo, {tintColor: primaryColor}]} />
    </Animatable.View>
  );
};
