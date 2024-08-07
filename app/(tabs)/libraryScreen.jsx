// Backend
import { styles } from "../../constants/stylers";
import { get_library_name } from "../backend/controller";

// React
import { View } from "react-native";
import { useState, useEffect, useCallback } from "react";

// Expo
import { Stack, router, useRouter } from "expo-router";

// Components
import { ElectroLibraryHeader } from "../../components/Main Library Screen/libraryHeader";
import { ElectroLibraryScroll } from "../../components/Library Scroll/libraryScroll";
import { ElectroSearchFilterBar } from "../../components/Main Library Screen/searchFilterBar";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useLibraryCardPress, useLibraryIconPress, useSearchBarPress } from "../../hooks/useLibraryCardPress";

export default function libraryScreen() {
  const [libName, setLibName] = useState("");
  const { primaryColor, secondaryColor } = useColor();
  const setSearchBarPress = useSearchBarPress().setPress;
  const setLibraryCardPress = useLibraryCardPress().setPress;
  const setLibraryIconPress = useLibraryIconPress().setPress;

  const router = useRouter();

  const handleMenuPress = useCallback(() => {
    router.push("./menuScreen");
  }, []);

  const handleLibraryCardPress = (libraryName) => {
    router.navigate(`./${libraryName}`);
  };

  const handleLibraryIconPress = useCallback(() => {
    router.navigate(`./libraryScreen`);
  }, []);

  const handleSearchBarPress = (name, library) => {
      if (library) {
        router.push(`./${name}`)
      } else {
        router.push(`../bookScreen/${name}`);
      };
  };

  const handleLibraryActions = () => {
    setLibraryCardPress(handleLibraryCardPress);
    setLibraryIconPress(handleLibraryIconPress);
    setSearchBarPress(handleSearchBarPress);
  };

  useEffect(() => {
    const fetchLibName = async () => {
      const asyncLibName = await get_library_name();
      setLibName(asyncLibName);
    };

    fetchLibName();
    handleLibraryActions();
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
        <ElectroSearchFilterBar/>
        <ElectroLibraryScroll/>
    </View>
  );
}
