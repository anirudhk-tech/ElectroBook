// Expo
import { Stack, router } from "expo-router";

// React
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
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

  const handlePress = async () => {
    if (lib.trim() == "") {
      return
    };

    await create_user(lib);
    setCheck(true);
    setTimeout(establish_userDb, 1000);    
    router.navigate("./settingsScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          onChange={setLib}
        />
        <View style={styles.registerScreenButtonContainer}>
          <ElectroButton
            text="Open"
            touchableStyles={[
              styles.registerScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handlePress}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
