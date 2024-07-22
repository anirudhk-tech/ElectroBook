// React
import { View, ScrollView, Dimensions } from "react-native";
import { useCallback, useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_image } from "../backend/controller"

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

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor } from "../../hooks/useTheme";
import { useUploadAlert } from "../../hooks/useUploadAlert";
import { ElectroUploadAlert } from "../../components/Upload Screen/uploadAlert";
import { ElectroClearUploadButton } from "../../components/Upload Screen/clearUploadButton";


export default function uploadFileScreen() {
  const setImageUri = useFileFunctions("image").setValue;
  const {primaryColor, secondaryColor} = useColor();
  const {uploadAlertText} = useUploadAlert();
  const [advancedVisible, setAdvancedVisible] = useState("none");
  const [uploadAlertDisplay, setUploadAlertDisplay] = useState("none");
  const screenHeight = Dimensions.get("screen").height;

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

  const uploadIcons = useCallback(() => {
    return(
      <View style={styles.uploadScreenButtonView}>
        <ElectroClearUploadButton/>
        <ElectroUploadButton/>
      </View>
    )
  }, []);

  useEffect(() => {
    if (uploadAlertText != "") {
      setUploadAlertDisplay("flex");
    } else {
      setUploadAlertDisplay("none");
    };
  }, [uploadAlertText]);

  return (
      <ScrollView
        contentContainerStyle={[
          styles.uploadScreenMainView,
          { backgroundColor: secondaryColor, height: screenHeight },
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
            <ElectroUploadAlert display={uploadAlertDisplay} alert={uploadAlertText}/>
            <ElectroTitleInput
              prompt="Title"
              icon="text"
              iconSize={40}
              placeholder="File name if blank..."
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
