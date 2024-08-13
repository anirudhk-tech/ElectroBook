// Expo
import { Stack, router } from "expo-router";

// React
import { View } from "react-native";
import { useState } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_user, establish_userDb } from "../backend/controller";

// Components
import { ElectroLogo } from "../../components/General/logo";
import { ElectroPromptInput } from "../../components/Register Screen/promptInput";
import { ElectroButton } from "../../components/General/button";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useCheckSetters } from "../../hooks/useCheckUser";

export default function registerScreen() {
  const { primaryColor, secondaryColor } = useColor();
  const { setCheck } = useCheckSetters();
  const [lib, setLib] = useState("");

  const changeLibName = async (libName) => {
    setLib(libName);
    setCheck(true);    
  };

  const handlePress = async () => {
    await create_user(lib);
    router.navigate("./settingsScreen");
  };

  return (
    <View
      style={[
        styles.registerScreenMainView,
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
          headerTitle: "Open Library",
          headerShown: true,
        }}
      />
      <ElectroLogo styles={[styles.registerScreenLogo, {tintColor: primaryColor}]} />
      <ElectroPromptInput
        viewStyles={styles.registerScreenInputView}
        textStyles={[styles.registerScreenInputPrompt, { color: primaryColor }]}
        inputStyles={[
          styles.registerScreenInput,
          { borderColor: primaryColor, color: primaryColor },
        ]}
        prompt="Library Name"
        onSubmit={changeLibName}
      />
      <View style={styles.registerScreenButtonContainer}>
        <ElectroButton
          text="Open"
          touchableStyles={[
            styles.registerScreenTouchable,
            { borderColor: primaryColor },
          ]}
          textStyles={[styles.buttonText, { color: primaryColor }]}
          action={() => {
            handlePress();
            establish_userDb();
          }}
        />
      </View>
    </View>
  );
}
