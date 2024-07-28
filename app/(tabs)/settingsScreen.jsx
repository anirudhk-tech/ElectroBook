// React
import { View } from "react-native";
import { useCallback } from "react";

// Expo
import { Stack, router } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroButton } from "../../components/General/button";
import { ElectroChangeLibraryNameButton } from "../../components/Settings Screen/settingsLibraryNameButton";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";

export default function settingsScreen() {
  const { primaryColor, secondaryColor } = useColor();

  const handlePrimaryColorPress = useCallback(() => {
    router.navigate("../colorPickerScreen/settingsPrimary");
  }, []);

  const handleSecondaryColorPress = useCallback(() => {
    router.navigate(`../colorPickerScreen/settingsSecondary`);
  }, []);

  const handleReadingTestPress = useCallback(() => {
    router.push("./readingTestScreen");
  }, []);


  return (
    <View
      style={[
        styles.settingsScreenMainView,
        { backgroundColor: secondaryColor },
      ]}
    >
      <View
        style={[
          styles.settingsScreenMainView,
        ]}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: primaryColor },
            headerTitleStyle: [
              styles.headerTitleStyle,
              { color: secondaryColor },
            ],
            headerTitle: "Configure",
            headerShown: true,
          }}
        />
        <Animatable.View 
        animation={"bounceIn"}
        useNativeDriver={true}
        style={[styles.settingsScreenButtonContainer]}>
          <ElectroButton
            text="Pick Primary Color"
            touchableStyles={[
              styles.settingsScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handlePrimaryColorPress}
          />
        </Animatable.View>
        <Animatable.View 
        animation={"bounceIn"}
        useNativeDriver={true}
        style={styles.settingsScreenButtonContainer}>
          <ElectroButton
            text="Pick Secondary Color"
            touchableStyles={[
              styles.settingsScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handleSecondaryColorPress}
          />
        </Animatable.View>
        <Animatable.View 
        animation={"bounceIn"}
        useNativeDriver={true}
        style={styles.settingsScreenButtonContainer}>
          <ElectroButton
            text="Take Reading Test"
            touchableStyles={[
              styles.settingsScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handleReadingTestPress}
          />
        </Animatable.View>
        <ElectroChangeLibraryNameButton/>
      </View>
    </View>
  );
}
