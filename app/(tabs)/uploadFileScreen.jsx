// React
import { View, ScrollView, Dimensions } from "react-native";
import { useCallback, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor } from "../../hooks/useTheme";

// Expo
import { Stack, router } from "expo-router";

// Components
import { ElectroPromptDropdown } from "../../components/promptDropdown";
import { ElectroAdvancedDivider } from "../../components/advancedDivider";
import { ElectroTitleInput } from "../../components/titleInput";
import { ElectroNotesBar } from "../../components/notesBar";
import { ElectroColorCodeBar } from "../../components/colorCodeBar";

export default function uploadFileScreen() {
  const [primaryColor, secondaryColor] = useColor();
  const windowHeight = Dimensions.get("window").height;

  const [advancedVisible, setAdvancedVisible] = useState("none");
  const [title, setTitle] = useFileFunctions("title");

  const handleAdvancedPress = () => {
    if (advancedVisible == "flex") {
      setAdvancedVisible("none");
    } else {
      setAdvancedVisible("flex");
    }
  };

  const handleNotesPress = useCallback(() => {
    router.navigate("../notesScreen/notesDropDown");
  }, []);

  const handleColorBarPress = useCallback(() => {
    router.navigate("../colorPickerScreen/uploadFile");
  }, []);

  const handleSubmit = (value) => {
    setTitle(value);
  };

  // Implement SQL where you get data about libs, genres, tropes, etc

  return (
    <ScrollView
      contentContainerStyle={[
        styles.uploadScreenMainView,
        { backgroundColor: secondaryColor, height: windowHeight },
      ]}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTitleStyle: [
            styles.headerTitleStyle,
            { color: secondaryColor },
          ],
          headerTitle: "Add",
          headerShown: true,
        }}
      />
      <View
        style={[
          styles.uploadScreenGeneralView,
          { display: advancedVisible == "none" ? "flex" : "none" },
        ]}
      >
        <ElectroTitleInput
          prompt="Title"
          icon="text"
          iconSize={40}
          placeholder="File name if blank..."
          onSubmit={handleSubmit}
        />
        <ElectroPromptDropdown icon="library-outline" options={"library"} />
        <ElectroPromptDropdown icon="person" options={"author"} />
      </View>
      <ElectroAdvancedDivider handlePress={handleAdvancedPress} />
      <View
        style={[styles.uploadScreenAdvancedView, { display: advancedVisible }]}
      >
        <ElectroPromptDropdown icon="bonfire" options={"genre"} />
        <ElectroPromptDropdown icon="boat" options={"trope"} />
        <ElectroPromptDropdown icon="layers-outline" options={"series"} />
        <ElectroColorCodeBar handlePress={handleColorBarPress} />
        <ElectroNotesBar handlePress={handleNotesPress} />
      </View>
    </ScrollView>
  );
}
