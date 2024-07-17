// Backend
import { styles } from "../../constants/stylers";
import { get_library_name, establish_userDb } from "../backend/controller";

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
    router.push("./menuScreen");
  }, []);

  const handleLibraryPress = useCallback(() => {
    router.push("../dropDownScreen/library");
  }, []);

  useEffect(() => {
    const fetchLibName = async () => {
      const asyncLibName = await get_library_name();
      setLibName(asyncLibName);
    };

    fetchLibName();
    establish_userDb();
  }, []);

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
              editPress={handleMenuPress}
            />
          ),
          headerShown: true,
        }}
      />
    </View>
  );
}
