// React
import { View, FlatList, Dimensions } from "react-native";

// Components
import { ElectroMenuBar } from "../../components/DropDown/dropDownMenuBar";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";
import { ElectroIcon } from "../../components/icon";

// Backend
import { useCallback, useEffect, useState } from "react";
import { styles } from "../../constants/stylers";

// Expo
import { router, Stack, useLocalSearchParams } from "expo-router";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useAdd } from "../../hooks/useAdd";
import { useHeader } from "../../hooks/useHeader";
import { useData } from '../../hooks/useData';
import { useDelete } from '../../hooks/useDelete';
import { useMenuColor } from "../../hooks/useMenuColor";
import { useRefreshOptions } from "../../hooks/useRefreshOptions";

export default function menuDropDownScreen() {
  const { menuType } = useLocalSearchParams();
  const headerTitle = useHeader(menuType);
  const [primaryColor, secondaryColor] = useColor();
  const [rawData, setRawData] = useState([]);
  const [flatListData, setFlatListData] = useState([]);
  const [menuColor] = useMenuColor();
  const [refresh, setRefresh] = useRefreshOptions();
  const windowHeight = Dimensions.get("window").height;

  const handleBackPress = () => {
    setRefresh(!refresh);
    router.dismiss();
  };

  const handleLibraryPress = useCallback(() => {
    router.dismiss();
    router.navigate("../../(tabs)/libraryScreen");
  }, []);

  const handleDeletePress = (option) => {
    // FileSystem (Image AND Book)
    useDelete(menuType, option);
    setRawData(rawData.filter((x) => x.option != option));
  };

  const handleColorPress = (name) => {
    router.push(`../colorPickerScreen/${menuType}and${name}`);
  };

  const handleAddPress = (value) => {
    useAdd(menuType, value, secondaryColor);
    setRawData([...rawData, {option: value}]);
  };

  const backIcon = useCallback(() => {
    return (
      <ElectroIcon 
        name="arrow-back"
        color={secondaryColor}
        size={30}
        handlePress={handleBackPress}
      />
    )
  });

  const multiIcons = useCallback(() => {
    return (
      <ElectroMultiIcons
        icons={[
          { name: "library-outline", handlePress: handleLibraryPress },
        ]}
      />
    );
  }, []);

  const dataCreation = useCallback(
    (data) => {
      const dataOrganize = [];
      for (let x = 0; x < data.length; x++) {
        dataOrganize.push({
          item: (
            <ElectroMenuBar
              option={data[x].option}
              color={data[x].color}
              handleDeletePress={handleDeletePress}
              handleColorPress={handleColorPress}
            />
          ),
          key: x,
        });
      }
      if (menuType != "book") {
        if (menuType != "completed") {
          dataOrganize.push({
            item: <ElectroAddMenuBar onSubmit={handleAddPress} />,
            key: dataOrganize.length + 1,
          });
        }
      }
      setFlatListData(dataOrganize);
    },
    [rawData]
  );

  useEffect(() => {
    useData(menuType).then(rawData => setRawData(rawData));
  }, [menuColor]);
 
  useEffect(() => {
    dataCreation(rawData);
  }, [rawData]);

  // Implement SQL Data transfer

  return (
    <View
      style={[
        styles.dropDownScreenMainView,
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
          headerTitle: headerTitle,
          headerBackVisible: false,
          headerLeft: backIcon,
          headerRight: multiIcons,
          headerShown: true,
          headerTintColor: secondaryColor,
          headerTitleAlign: 'center'
        }}
      />
      <FlatList
        data={flatListData}
        style={{ height: windowHeight }}
        renderItem={({ item }) => item.item}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
