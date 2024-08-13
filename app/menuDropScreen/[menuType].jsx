// React
import { View, FlatList, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";

// Components
import { ElectroMenuBar } from "../../components/DropDown/dropDownMenuBar";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";
import { ElectroIcon } from "../../components/General/icon";
import { ElectroDropDownEmptyText } from "../../components/DropDown/dropDownEmpty";

// Backend
import { useEffect, useMemo, useState } from "react";
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
import { useInfo } from "../../hooks/useInfoFunctions";
import { useMenuColorPress, useMenuDelete, useMenuBack, useMenuText } from "../../hooks/useMenuBarActions";

export default function menuDropDownScreen() {
  const { menuType } = useLocalSearchParams();
  const { primaryColor, secondaryColor } = useColor();
  const { menuColor } = useMenuColor();
  const { data, setData } = useEditData();
  const deleteInfo = useInfo("clearValues");
  const {refresh, setRefresh} = useRefreshOptions();
  const setMenuType = useMenuType().setType;
  const setDelete = useMenuDelete().setAction;
  const setColor = useMenuColorPress().setAction;
  const setText = useMenuText().setAction;
  const setBack = useMenuBack().setAction;

  const [rawData, setRawData] = useState([]);
  const [flatListData, setFlatListData] = useState([]);

  const split = menuType.split("+");
  const secondArg = split[1];
  const type = split[0];
  const headerTitle = useHeader(type);
  const windowHeight = Dimensions.get("window").height;

  const clearInfo = (type, option) => {
    if (type == "author") {
      deleteInfo.clearAuthor(option);
    };

    if (type == "library") {
      deleteInfo.clearLibrary(option);
    };

    if (type == "genre") {
      deleteInfo.removeGenre(option);
    };

    if (type == "trope") {
      deleteInfo.removeTrope(option);
    };

    if (type == "series") {
      deleteInfo.clearSeries(option);
    };
  };

  const handleBackPress = () => {
    setRefresh(!refresh);
    router.dismiss();
  };

  const handleDeletePress = (option) => {
    useDelete(type, option);
    setRawData(prev => prev.filter(x => x.option != option));
    setData(data.filter(x => x != option));
    clearInfo(type, option);
  };

  const handleTextPress = (option) => {
    if (type == "book") {
      router.dismiss();
      router.push(`../bookScreen/${option}`);
    };
  };

  const handleColorPress = (name) => {
    router.push(`../colorPickerScreen/changeColorof${name}`);
  };

  const handleAddPress = async (value) => {
    const editedValue = value.replaceAll('"', "'").replaceAll(",", ";")
    const result = await useAdd(type, editedValue, secondaryColor);

    if (result != "duplicate") {
      setRawData([...rawData, {option: editedValue}]);
    };
    if (secondArg == undefined) {
      handleBackPress();
    }
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
              type={type}
              tab={secondArg}
            />
          ),
          key: x,
        });
      };

      return dataOrganize
    };

  const dataOrganize = useMemo(
    () => dataCreation(rawData), 
    [rawData, menuColor]
  );

  const fetchRawData = async () => {
    if (type.includes("booksInLibrary")) {
      await useBooksInLibrary(secondArg).then(rawData => setRawData(rawData));
    } else {
      await useData(type).then(rawData => setRawData(rawData));
    };
  };

  useEffect(() => {
    fetchRawData();
  }, [menuColor]);
 
  useEffect(() => {
    if (rawData != undefined) {
      setFlatListData(dataOrganize);
    };
  }, [rawData]);

  useEffect(() => {
    setMenuType(type);
    setDelete(handleDeletePress);
    setColor(handleColorPress);
    setText(handleTextPress);
    setBack(handleBackPress);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            headerTitle: type.includes("booksInLibrary") ? secondArg : headerTitle,
            headerBackVisible: false,
            headerLeft: backIcon,
            headerShown: true,
            headerTintColor: secondaryColor,
            headerTitleAlign: 'center'
          }}
        />
        <ElectroDropDownEmptyText 
          visible={type.includes("booksIn") || type == "book" || type == "completed" ? flatListData == undefined || flatListData == null ? "none" : flatListData.length == 0 ? "flex" : "none" : "none"}
        />
        <FlatList
          data={flatListData}
          contentContainerStyle={[
            styles.dropDownScreenFlatList,
            {paddingBottom: 20}
          ]}
          renderItem={({ item }) => item.item}
          getItemLayout={(data, index) => (
            {length: windowHeight/6, offset: windowHeight/6 * index, index}
          )}
          keyExtractor={(item) => item.key}
          removeClippedSubviews={false}
          ListFooterComponent={type == "book" || type.includes("booksIn") || type == "completed" ? <View></View> : <ElectroAddMenuBar onSubmit={handleAddPress} tab={secondArg}/>}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
