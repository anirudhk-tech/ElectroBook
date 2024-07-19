// Node Modules
import ColorPicker, {
  Panel1,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

// Backend
import { styles } from "../../constants/stylers";
import { update_color } from "../backend/controller";

// React
import { View } from "react-native";
import { useState } from "react";

// Expo
import { Stack, useLocalSearchParams, router } from "expo-router";

// Components
import { ElectroButton } from "../../components/General/button";

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor, changeTheme } from "../../hooks/useTheme";
import { useMenuColor } from "../../hooks/useMenuColor";
import { useMenuType } from "../../hooks/useMenuType";

export default function colorPicker() {
  const {primaryColor, secondaryColor} = useColor();
  const {setPrimary, setSecondary} = changeTheme();
  const setColor = useFileFunctions("fileColor").setValue;
  const {setMenuColor} = useMenuColor();
  const [hex, setHex] = useState("");
  const { backRoute } = useLocalSearchParams();
  const menuType = useMenuType().type;

  // Implement where inital color is already selected color - Get from Async Store
  // Fix moving back to library screen by implementing Async Store check if color was changed

  const onCompleteColor = ({ hex }) => {
    setHex(hex);
    if (backRoute.includes("uploadFile")) {
      setColor(hex);
    };
  };

  const handlePress = () => {
    if (backRoute.includes("Primary")) {
      if (hex != "") {
        setPrimary(hex);
      }
    } else if (backRoute.includes("Secondary")) {
      if (hex != "") {
        setSecondary(hex);
      }
    } else if (backRoute.includes("of")) {
      if (hex != "") {
        const barInfo = backRoute.split("of");
        const name = barInfo[1];

        update_color(menuType, name, hex);
        setMenuColor(hex);
      };
    };

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
