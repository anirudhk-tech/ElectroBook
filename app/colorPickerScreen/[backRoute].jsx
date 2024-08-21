// Node Modules
import ColorPicker, {
  Panel5,
  Preview,
} from "reanimated-color-picker";
import * as ScreenOrientation from "expo-screen-orientation";

// Backend
import { styles } from "../../constants/stylers";
import { update_color } from "../backend/controller";

// React
import { View } from "react-native";
import { useEffect, useState } from "react";

// Expo
import { Stack, useLocalSearchParams, router } from "expo-router";

// Components
import { ElectroButton } from "../../components/General/button";

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor, changeTheme } from "../../hooks/useTheme";
import { useMenuColor } from "../../hooks/useMenuColor";
import { useMenuType } from "../../hooks/useMenuType";
import { usePdf } from "../../hooks/usePdf";
import { useOrientation } from "../../hooks/useOrientation";

export default function colorPicker() {
  const { primaryColor, secondaryColor } = useColor();
  const {setPrimary, setSecondary} = changeTheme();
  const setColor = useFileFunctions("fileColor").setValue;
  const {setMenuColor} = useMenuColor();
  const { backRoute } = useLocalSearchParams();
  const menuType = useMenuType().type;
  const { setBgColor } = usePdf();
  const { orient } = useOrientation();

  const [hex, setHex] = useState("#ffffff");

  // Implement where inital color is already selected color - Get from Async Store

  const onCompleteColor = ({ hex }) => {
    setHex(hex);
    if (backRoute.includes("uploadFile")) {
      setColor(hex);
    };
  };

  const handlePress = async () => {
    if (backRoute.includes("Primary")) {
      if (hex != "") {
        hex == secondaryColor ? {} : setPrimary(hex);
      }
    } else if (backRoute.includes("Secondary")) {
      if (hex != "") {
        hex == primaryColor ? {} : setSecondary(hex);
      }
    } else if (backRoute.includes("of")) {
      if (hex != "") {
        const barInfo = backRoute.split("of");
        const name = barInfo[1];

        update_color(menuType, name, hex);
        setMenuColor(hex);
      };
    } else if (backRoute == "pdf-BG-COLOR") {
      setBgColor(hex);
      if (orient == "landscapeRight") {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      };
    };

    router.dismiss();
  };

  const setOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };

  useEffect(() => {
    setOrientation();
  }, []);

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
        onComplete={onCompleteColor}
      >
        <Preview hideInitialColor={true} />
        <Panel5 />
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
