// Node Modules
import ColorPicker, {
  Panel1,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

// Backend
import { styles } from "../../constants/stylers";
import { store_data } from "../backend/controller";

// React
import { View } from "react-native";
import { useState } from "react";

// Expo
import { Stack, useLocalSearchParams, router } from "expo-router";

// Components
import { ElectroButton } from "../../components/button";

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor, changeTheme } from "../../hooks/useTheme";

export default function colorPicker() {
  const [primaryColor, secondaryColor] = useColor();
  const [setPrimary, setSecondary] = changeTheme();
  const [color, setColor] = useFileFunctions("color");
  const [hex, setHex] = useState("");
  const { backRoute } = useLocalSearchParams();

  // Implement where inital color is already selected color - Get from Async Store
  // Fix moving back to library screen by implementing Async Store check if color was changed

  const onCompleteColor = ({ hex }) => {
    setHex(hex);
    if (backRoute.includes("uploadFile")) {
      setColor(hex);
    }
  };

  const handlePress = () => {
    if (backRoute.includes("Primary")) {
      if (hex != "") {
        setPrimary(hex);
        store_data("primaryColor", hex);
      }
    } else if (backRoute.includes("Secondary")) {
      if (hex != "") {
        setSecondary(hex);
        store_data("secondaryColor", hex);
      }
    }
    router.dismiss();
  };

  return (
    <View
      style={[
        styles.colorPickerScreenMainView,
        { backgroundColor: secondaryColor },
      ]}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTitleStyle: [
            styles.headerTitleStyle,
            { color: secondaryColor },
          ],
          headerTitleAlign: "center",
          headerTitle: "Color",
          headerShown: true,
          headerTintColor: secondaryColor,
        }}
      />

      <ColorPicker
        style={styles.colorPicker}
        value="red"
        onComplete={onCompleteColor}
      >
        <Preview hideInitialColor={true} />
        <Panel1 />
        <HueSlider />
        <OpacitySlider />
      </ColorPicker>

      <ElectroButton
        text="Pick Color"
        touchableStyles={[
          styles.colorPickerTouchable,
          { borderColor: primaryColor },
        ]}
        textStyles={[styles.buttonText, { color: primaryColor }]}
        action={handlePress}
      />
    </View>
  );
}
