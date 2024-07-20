// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// React
import { useState, useEffect, useCallback } from "react";
import { FlatList, Dimensions, View } from "react-native";

// Components
import { ElectroIcon } from "../../components/General/icon";
import { ElectroEditDropBar } from "../../components/DropDown/dropDownEditBar";

// Hooks
import { useEditType, useEditData, useEditBookName } from "../../hooks/useEdit";
import { useData } from "../../hooks/useData";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useHeader } from "../../hooks/useHeader";



export default function bookEditScreen () {
    const { bookEdit } = useLocalSearchParams();
    const {type} = useEditType();
    const {data, setData} = useEditData();
    const {primaryColor, secondaryColor} = useColor();
    const headerTitle = "Edit "+useHeader(type);
    const {setEditBookName} = useEditBookName();
    const [rawData, setRawData] = useState([]);
    const [flatListData, setFlatListData] = useState([]);

    const windowHeight = Dimensions.get("window").height;

    const handleBackPress = useCallback(() => {
        router.dismiss();
    }, []);

    const backIcon = useCallback(() => {
        return(
            <ElectroIcon 
            name="arrow-back"
            color={secondaryColor}
            size={30}
            handlePress={handleBackPress}/>
        )
    }, []);

    const dataCreation = useCallback(
        (data) => {
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
          }
          setFlatListData(dataOrganize);
        },
        [rawData]
      );

    const listSplit = useCallback((list) => {
        if (list.includes(",")) {
            const newList = list.split(",")
            return newList;
        } else {
            const newList = [];
            newList.push(list);
            return newList;
        };

    }, [data]);
      
    useEffect(() => {
        useData(type).then(rawData => setRawData(rawData));
        if (type == "genre") {
            useBookInfo(bookEdit).then(bookData => setData(listSplit(bookData.genres)));
        } else if (type == "trope") {
            useBookInfo(bookEdit).then(bookData => setData(listSplit(bookData.tropes)));
        };
        setEditBookName(bookEdit);
    }, []);

    useEffect(() => {
        dataCreation(rawData);
    }, [rawData]);


    return (
        <View>
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
};