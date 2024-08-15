// Backend
import { styles } from "../../constants/stylers";
import { get_library_name } from "../backend/controller";

// React
import { View, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { useState, useEffect, useCallback } from "react";

// Expo
import { Stack, router } from "expo-router";

// Components
import { ElectroLibraryHeader } from "../../components/Main Library Screen/libraryHeader";
import { ElectroLibraryScroll } from "../../components/Library Scroll/libraryScroll";
import { ElectroSearchFilterBar } from "../../components/Main Library Screen/searchFilterBar";
import { ElectroIcon } from "../../components/General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useLibraryCardPress, useLibraryIconPress, useSearchBarPress, useSelectedLibrary } from "../../hooks/useLibraryCardPress";
import { useSearchActive, useSearchValue } from "../../hooks/useSearch";

export default function libraryScreen() {
  const [libName, setLibName] = useState("");
  const { primaryColor, secondaryColor } = useColor();
  const setSearchBarPress = useSearchBarPress().setPress;
  const setLibraryCardPress = useLibraryCardPress().setPress;
  const setLibraryIconPress = useLibraryIconPress().setPress;
  const { searchActive, setSearchActive } = useSearchActive();
  const { setSearchValue } = useSearchValue();
  const { setSelectedLibrary } = useSelectedLibrary();
  const windowHeight = Dimensions.get("window").height;

  const handleMenuPress = useCallback(() => {
    router.navigate("./menuScreen");
  }, []);

  const handleLibraryCardPress = (libraryName) => {
    router.navigate(`../namedLibraryScreen/${libraryName}`);
  };

  const handleLibraryIconPress = useCallback(() => {
    router.navigate(`./libraryScreen`);
  }, []);

  const handleSearchBarPress = (name, library) => {
      if (library) {
        router.push(`../namedLibraryScreen/${name}`) 
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

  const handleSearchCancel = () => {
    setSearchActive(false);
    setSearchValue("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <View style={[styles.libraryScreenSearchScrollView, { height: windowHeight / 10, display: searchActive ? "flex" : "none"}]}>
            <ElectroSearchFilterBar/>
            <ElectroIcon 
            size={40}
            color={primaryColor}
            name={"close-circle"}
            style={{
              flex: 1, 
              justifyContent: 'center', 
              padding: '4%'
            }}
            handlePress={handleSearchCancel}
            />
          </View>
          <ElectroLibraryScroll/>
      </View>
    </TouchableWithoutFeedback>
  );
}
