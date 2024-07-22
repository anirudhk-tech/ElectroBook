// Expo
import { Stack, router } from "expo-router";

// React
import { View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";
import { create_user, delete_user } from "../backend/controller";

// Components
import { ElectroLogo } from "../../components/General/logo";
import { ElectroPromptInput } from "../../components/Register Screen/promptInput";
import { ElectroButton } from "../../components/General/button";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useChecks, useCheckSetters } from "../../hooks/useCheckUser";

export default function registerScreen() {
  const {primaryColor, secondaryColor} = useColor();
  const {check} = useChecks();
  const {setCheck} = useCheckSetters();

  const changeLibName = async (libName) => {
    if (check == false) {
      await create_user(libName);
      setCheck(true);
    } else {
      await delete_user();
      await create_user(libName);
    };
  };

  const handlePress = () => {
    if (check == true) {
      router.navigate("./settingsScreen");
    }
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
