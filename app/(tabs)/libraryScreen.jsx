// Backend
import { styles } from "../../constants/stylers";
import { get_library_name } from "../backend/controller";

// React
import { View } from "react-native";
import { useState, useEffect, useCallback } from "react";

// Expo
import { Stack, router } from "expo-router";

// Components
import { ElectroLibraryHeader } from "../../components/Main Library Screen/libraryHeader";
import { ElectroLibraryScroll } from "../../components/Library Scroll/libraryScroll";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useLibraryCardPress, useLibraryIconPress } from "../../hooks/useLibraryCardPress";

export default function libraryScreen() {
  const [libName, setLibName] = useState("");
  const [primaryColor, secondaryColor] = useColor();
  const [libraryCardPress, setLibraryCardPress] = useLibraryCardPress();
  const [libraryIconPress, setLibraryIconPress] = useLibraryIconPress();

  const handleMenuPress = useCallback(() => {
    router.push("./menuScreen");
  }, []);

  const handleLibraryCardPress = (libraryName) => {
    router.navigate(`./${libraryName}`);
  };

  const handleLibraryIconPress = useCallback(() => {
    router.navigate(`./libraryScreen`);
  }, []);

  const handleLibraryCardActions = useCallback(() => {
    setLibraryCardPress(handleLibraryCardPress);
    setLibraryIconPress(handleLibraryIconPress);
  });

  useEffect(() => {
    const fetchLibName = async () => {
      const asyncLibName = await get_library_name();
      setLibName(asyncLibName);
    };

    fetchLibName();
    handleLibraryCardActions();
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
      <ElectroLibraryScroll/>
    </View>
  );
}
