// React
import { View } from "react-native";
import { useCallback, useState } from "react";

// Expo
import { Stack, router } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroButton } from "../../components/General/button";
import { ElectroAlert } from "../../components/General/alert";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useCheckSetters } from "../../hooks/useCheckUser";

export default function settingsScreen() {
  const [primaryColor, secondaryColor] = useColor();
  const [displayAlert, setDisplayAlert] = useState("none");
  const [setCheck, setSettingsCheck] = useCheckSetters();

  const handlePrimaryColorPress = useCallback(() => {
    router.navigate("../colorPickerScreen/settingsPrimary");
  }, []);

  const handleSecondaryColorPress = useCallback(() => {
    router.navigate(`../colorPickerScreen/settingsSecondary`);
  }, []);

  const handleReadingTestPress = useCallback(() => {
    setDisplayAlert(undefined);
  }, []);

  const handleOkayPress = useCallback(() => {
    router.navigate("./readingTestScreen");
    setDisplayAlert("none");
    setSettingsCheck(true);
  }, []);

  const handleSkipPress = useCallback(() => {
    router.navigate("./libraryScreen");
    setDisplayAlert("none");
    setSettingsCheck(true);
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
          { opacity: displayAlert == "none" ? 100 : 0 },
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
        <View style={[styles.settingsScreenButtonContainer]}>
          <ElectroButton
            text="Pick Primary Color"
            touchableStyles={[
              styles.settingsScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handlePrimaryColorPress}
          />
        </View>
        <View style={styles.settingsScreenButtonContainer}>
          <ElectroButton
            text="Pick Secondary Color"
            touchableStyles={[
              styles.settingsScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handleSecondaryColorPress}
          />
        </View>
        <View style={styles.settingsScreenButtonContainer}>
          <ElectroButton
            text="Take Reading Test"
            touchableStyles={[
              styles.settingsScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handleReadingTestPress}
          />
        </View>
      </View>
      <ElectroAlert
        display={displayAlert}
        title="Reading Test"
        message={[
          "Read a short pdf to gauge how fast you read!",
          "Your result will be used to calculate read times.",
        ]}
        negativeButton="Skip"
        positiveButton="Okay"
        negativePress={handleSkipPress}
        positivePress={handleOkayPress}
      />
    </View>
  );
}
