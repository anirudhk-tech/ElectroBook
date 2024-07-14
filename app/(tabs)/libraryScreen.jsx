// Backend
import { styles } from "../../constants/stylers";
import { get_library_name } from "../backend/controller";

// React
import { View } from "react-native";
import { useState, useEffect, useCallback } from "react";

// Expo
import { Stack, router } from "expo-router";

// Components
import { ElectroLibraryHeader } from "../../components/libraryHeader";

// Hooks
import { useColor } from "../../hooks/useTheme";

export default function libraryScreen() {
  const [libName, setLibName] = useState("");
  const [primaryColor, secondaryColor] = useColor();

  const handleMenuPress = useCallback(() => {
    router.navigate("./menuScreen");
  }, []);

  const handleLibraryPress = useCallback(() => {
    router.navigate("../dropDownScreen/library");
  }, []);

  useEffect(() => {
    const fetchLibName = async () => {
      const asyncLibName = await get_library_name();
      setLibName(asyncLibName);
    };

    fetchLibName();
  });
  // BACK BUTTON COLOR
  return (
    <View
      style={[
        styles.libraryScreenMainView,
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
          headerTitle: libName,
          headerRight: () => (
            <ElectroLibraryHeader
              folderPress={handleLibraryPress}
              albumPress={handleMenuPress}
            />
          ),
          headerShown: true,
        }}
      />
    </View>
  );
}
