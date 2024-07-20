// React
import { View, FlatList, Dimensions } from "react-native";

// Components
import { ElectroMenuBar } from "../../components/DropDown/dropDownMenuBar";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";
import { ElectroIcon } from "../../components/General/icon";

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
import { useMenuType } from "../../hooks/useMenuType";

export default function menuDropDownScreen() {
  const { menuType } = useLocalSearchParams();
  const headerTitle = useHeader(menuType);
  const {primaryColor, secondaryColor} = useColor();
  const {menuColor} = useMenuColor();
  const {refresh, setRefresh} = useRefreshOptions();
  const windowHeight = Dimensions.get("window").height;
  const setMenuType = useMenuType().setType;

  const [rawData, setRawData] = useState([]);
  const [flatListData, setFlatListData] = useState([]);

  const handleBackPress = () => {
    setRefresh(!refresh);
    router.dismiss();
  };

  const handleDeletePress = (option) => {
    // FileSystem (Image AND Book)
    useDelete(menuType, option);
    setRawData(rawData.filter((x) => x.option != option));
  };

  const handleColorPress = (name) => {
    router.push(`../colorPickerScreen/changeColorof${name}`);
  };

  const handleAddPress = async (value) => {
    const result = await useAdd(menuType, value, secondaryColor);
    if (result == "duplicate") {
      return
    } else {
      setRawData([...rawData, {option: value}]);
    };
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

  const dataCreation = useCallback(
    (data) => {
      const dataOrganize = [];
      for (let x = 0; x < data.length; x++) {
        dataOrganize.push({
          item: (
            <ElectroMenuBar
              option={data[x].option}
              color={data[x].color}
              type={menuType}
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

  useEffect(() => {
    setMenuType(menuType);
  }, []);

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
