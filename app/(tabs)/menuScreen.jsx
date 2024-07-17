// React
import { View, ScrollView, Dimensions } from "react-native";
import { useContext, useCallback, memo } from "react";

// Backend
import { ThemeContext } from "../../constants/context";
import { styles } from "../../constants/stylers";

// Expo
import { Stack, router } from "expo-router";

// Components
import { ElectroIcon } from "../../components/icon";
import { ElectroMenuTab } from "../../components/menuTab";

// Hooks
import { useColor } from "../../hooks/useTheme";

export default function menuScreen() {
  const [primaryColor, secondaryColor] = useColor();
  const windowHeight = Dimensions.get("window").height;

  const handleLibraryPress = useCallback(() => {
    router.navigate("./libraryScreen");
  });

  const handleMenuTabPress = (screen) => {
    router.push(`../menuDropScreen/${screen}`);
  };

  return (
    <View
      style={[styles.menuScreenMainView, { backgroundColor: secondaryColor }]}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTitleStyle: [
            styles.headerTitleStyle,
            { color: secondaryColor },
          ],
          headerTitle: "Index",
          headerRight: () => (
            <ElectroIcon
              name="library-outline"
              size={30}
              style={styles.libraryMenuIcon}
              color={secondaryColor}
              handlePress={handleLibraryPress}
            />
          ),
          headerShown: true,
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.menuScreenTabView,
          { height: windowHeight },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ElectroMenuTab text="Books" type="book" handlePress={handleMenuTabPress} />
        <ElectroMenuTab text="Libraries" type="library" handlePress={handleMenuTabPress} />
        <ElectroMenuTab text="Authors" type="author" handlePress={handleMenuTabPress} />
        <ElectroMenuTab text="Genres" type="genre" handlePress={handleMenuTabPress} />
        <ElectroMenuTab text="Tropes" type="trope" handlePress={handleMenuTabPress} />
        <ElectroMenuTab text="Series" type="series" handlePress={handleMenuTabPress} />
        <ElectroMenuTab text="Completed" type="completed" handlePress={handleMenuTabPress} />
      </ScrollView>
    </View>
  );
}
