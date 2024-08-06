// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// React
import { useState, useEffect, useMemo } from "react";
import { FlatList, Dimensions, View } from "react-native";

// Components
import { ElectroIcon } from "../../components/General/icon";
import { ElectroEditDropBar } from "../../components/DropDown/dropDownEditBar";
import { ElectroDropDownEmptyText } from "../../components/DropDown/dropDownEmpty";

// Hooks
import { useEditType, useEditData, useEditRefresh } from "../../hooks/useEdit";
import { useData } from "../../hooks/useData";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useHeader } from "../../hooks/useHeader";
import { useRefreshOptions } from "../../hooks/useRefreshOptions";
import { useBookUpdate } from "../../hooks/useBookUpdate";



export default function bookEditScreen () {
    const { bookEdit } = useLocalSearchParams();
    const {type, setType} = useEditType();
    const {data, setData} = useEditData();
    const {
      setEditRefreshAuthor,
      setEditRefreshGenres,
      setEditRefreshLibrary,
      setEditRefreshSeries,
      setEditRefreshTropes,
    } = useEditRefresh();
    const refreshOptions = useRefreshOptions().refresh; 
    const { primaryColor, secondaryColor } = useColor();
    const headerTitle = "Edit "+useHeader(type);
    const [rawData, setRawData] = useState([]);
    const [flatListData, setFlatListData] = useState([]);

    const windowHeight = Dimensions.get("window").height;

    const refresh = () => {
      if (type == "library") {
        setEditRefreshLibrary();
      } else if (type == "genre") {
        setEditRefreshGenres();
      } else if (type == "trope") {
        setEditRefreshTropes();
      } else if (type == "series") {
        setEditRefreshSeries();
      } else if (type == "author") {
        setEditRefreshAuthor();
      }
    };

    const handleBackIconPress = () => {
      if (type == "library") {
        if (data.includes(null) != true) {
          useBookUpdate(type, bookEdit, data);
        };
      } else {
        useBookUpdate(type, bookEdit, data);
      };

      refresh();
      setData([null]);
      setType(null);
      router.dismiss();
  };

    const backIcon = () => {
        return(
            <ElectroIcon 
            name="arrow-back"
            color={secondaryColor}
            size={30}
            handlePress={handleBackIconPress}/>
        )
    };

    const handleAddIconPress = () => {
      router.push(`../menuDropScreen/${type}`);
    };

    const addIcon = () => {
      return(
        <ElectroIcon 
          name="add"
          color={secondaryColor}
          size={30}
          handlePress={handleAddIconPress}
        />
      );
    };

    const dataOrganize = (data) => {
        if (data == undefined) {
          const emptyArray = []
          return emptyArray;
        };

        const dataOrganize = [];
        for (let x = 0; x < data.length; x++) {
          dataOrganize.push({
            item: (
              <ElectroEditDropBar
                option={data[x].option}
                color={data[x].color}
              />
            ),
            key: x,
          });
        };
        return dataOrganize;
      };

    const dataCreation = useMemo(
        () => dataOrganize(rawData),
        [rawData]
    );

    const listSplit = (list) => {
        if (list.includes(",")) {
            const newList = list.split(",")
            return newList;
        } else {
            const newList = [];
            newList.push(list);
            return newList;
        };
    };
      
    useEffect(() => {
        if (type == "genre") {
            useBookInfo(bookEdit).then(bookData => setData(listSplit(bookData.genres)));
        } else if (type == "trope") {
            useBookInfo(bookEdit).then(bookData => setData(listSplit(bookData.tropes)));
        };
    }, []);

    useEffect(() => {
        if (rawData != undefined) {
          setFlatListData(dataCreation);
        };
    }, [rawData]);

    useEffect(() => {
      useData(type).then(rawData => setRawData(rawData));
    }, [refreshOptions]);


    return (
        <View style={{backgroundColor: secondaryColor, flex: 1}}>
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
            headerRight: addIcon,
            headerShown: true,
            headerTintColor: secondaryColor,
            headerTitleAlign: 'center'
        }}
      />
        <ElectroDropDownEmptyText
          visible={flatListData == null || flatListData == undefined ? "none" : flatListData.length == 0 ? "flex" : "none"}
        />
        <FlatList
        data={flatListData}
        contentContainerStyle={[
          { paddingBottom: 20 },
        ]}
        getItemLayout={(data, index) => (
          {length: windowHeight/6, offset: windowHeight/6 * index, index}
        )}
        renderItem={({ item }) => item.item}
        keyExtractor={(item) => item.key}
      />

        </View>
    );
};