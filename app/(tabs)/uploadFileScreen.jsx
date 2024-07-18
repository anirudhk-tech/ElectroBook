// React
import { View, ScrollView, Dimensions } from "react-native";
import { useCallback, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_image } from "../backend/controller"

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor } from "../../hooks/useTheme";

// Expo
import { Stack, router } from "expo-router";

// Components
import { ElectroPromptDropdown } from "../../components/Upload Screen/promptDropdown";
import { ElectroAdvancedDivider } from "../../components/Upload Screen/advancedDivider";
import { ElectroTitleInput } from "../../components/Upload Screen/titleInput";
import { ElectroNotesBar } from "../../components/Upload Screen/notesBar";
import { ElectroColorCodeBar } from "../../components/Upload Screen/colorCodeBar";
import { ElectroImageBar } from "../../components/Upload Screen/imageBar";
import { ElectroUploadButton } from "../../components/Upload Screen/uploadButton";

export default function uploadFileScreen() {
  const [primaryColor, secondaryColor] = useColor();
  const windowHeight = Dimensions.get("window").height;
  const [advancedVisible, setAdvancedVisible] = useState("none");
  const [title, setTitle] = useFileFunctions("title");
  const [imageUri, setImageUri] = useFileFunctions("image");

  const handleImagePress = useCallback(() => {
    create_image(setImageUri);
  }, []);

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

  const uploadIcons = useCallback(() => {
    return(
      <ElectroUploadButton/>
    )
  }, []);

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
          headerRight: uploadIcons,
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
        <ElectroImageBar handlePress={handleImagePress} />
      </View>

    </ScrollView>
  );
}
