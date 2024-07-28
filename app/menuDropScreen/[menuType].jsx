// React
import { View, FlatList, Dimensions } from "react-native";

// Components
import { ElectroMenuBar } from "../../components/DropDown/dropDownMenuBar";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";
import { ElectroIcon } from "../../components/General/icon";

// Backend
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useEditData } from "../../hooks/useEdit";
import { useBooksInLibrary} from "../../hooks/useBookInLibrary";

export default function menuDropDownScreen() {
  const { menuType } = useLocalSearchParams();
  const headerTitle = useHeader(menuType);
  const { primaryColor, secondaryColor } = useColor();
  const { menuColor } = useMenuColor();
  const { data, setData } = useEditData();
  const {refresh, setRefresh} = useRefreshOptions();
  const windowHeight = Dimensions.get("window").height;
  const setMenuType = useMenuType().setType;

  const [rawData, setRawData] = useState([]);
  const [flatListData, setFlatListData] = useState([]);

  const split = menuType.split("+");
  const library = split[1];

  const handleBackPress = () => {
    setRefresh(!refresh);
    router.dismiss();
  };

  const handleDeletePress = (option) => {
    useDelete(menuType, option);
    setRawData(rawData.filter((x) => x.option != option));
    setData(data.filter((x) => x != option));
  };

  const handleTextPress = (option) => {
    if (menuType == "book") {
      router.dismiss();
      router.push(`../bookScreen/${option}`);
    };
  };

  const handleColorPress = (name) => {
    router.push(`../colorPickerScreen/changeColorof${name}`);
  };

  const handleAddPress = async (value) => {
    const editedValue = value.replaceAll('"', "'").replaceAll(",", ";")
    const result = await useAdd(menuType, editedValue, secondaryColor);
    if (result == "duplicate") {
      return
    } else {
      setRawData([...rawData, {option: editedValue}]);
    };
  };

  const backIcon = () => {
    return (
      <ElectroIcon 
        name="arrow-back"
        color={secondaryColor}
        size={30}
        handlePress={handleBackPress}
      />
    )
  };

  const dataCreation = (data) => {
      const dataOrganize = [];
      for (let x = 0; x < data.length; x++) {
        dataOrganize.push({
          item: (
            <ElectroMenuBar
              option={data[x].option}
              color={data[x].color}
              type={menuType}
              handleTextPress={handleTextPress}
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

      return dataOrganize
    };

  const dataOrganize = useMemo(
    () => dataCreation(rawData), 
    [rawData]
  );

  useEffect(() => {
    if (menuType.includes("booksInLibrary")) {
      useBooksInLibrary(library).then(rawData => setRawData(rawData));
    } else {
      useData(menuType).then(rawData => setRawData(rawData));
    }
  }, [menuColor]);
 
  useEffect(() => {
    if (rawData != undefined) {
      setFlatListData(dataOrganize);
    };
  }, [rawData]
);

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
          headerTitle: menuType.includes("booksInLibrary") ? library : headerTitle,
          headerBackVisible: false,
          headerLeft: backIcon,
          headerShown: true,
          headerTintColor: secondaryColor,
          headerTitleAlign: 'center'
        }}
      />
      <FlatList
        data={flatListData}
        contentContainerStyle={[styles.dropDownScreenFlatList, { height: 50 + flatListData.length * 100 }]}
        style={{ height: windowHeight }}
        renderItem={({ item }) => item.item}
        getItemLayout={(data, index) => (
          {length: windowHeight/10, offset: windowHeight/10 * index, index}
        )}
        keyExtractor={(item) => item.key}
        removeClippedSubviews={false}
      />
    </View>
  );
}
