// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";

// React
import { FlatList, View, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useCallback, useEffect, useMemo } from "react";

// Components
import { ElectroDropBar } from "../../components/DropDown/dropDownBar";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";
import { ElectroIcon } from "../../components/General/icon";
import { ElectroDropDownEmptyText } from "../../components/DropDown/dropDownEmpty";

// Hooks
import { useData } from "../../hooks/useData";
import { useHeader } from "../../hooks/useHeader";
import { useDropDownType } from "../../hooks/useDropDownType";
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor } from "../../hooks/useTheme";
import { useRefreshOptions } from "../../hooks/useRefreshOptions";

// Backend
import { styles } from "../../constants/stylers";


export default function dropDownScreen() {
  const { options } = useLocalSearchParams();
  const windowHeight = Dimensions.get("window").height;
  const { primaryColor, secondaryColor } = useColor();
  const headerTitle = useHeader(options);
  const multiType = useDropDownType(options);
  const { value, setValue, removeValue, clearValue } = useFileFunctions(options);
  const { refresh } = useRefreshOptions(); 

  const [rawData, setRawData] = useState([]);
  const [flatListData, setFlatListData] = useState([]);
  
  const handleAddPress = () => {
    router.navigate(`../menuDropScreen/${options}`);
  };

  const handleCheckPress = useCallback(() => {
    router.dismiss();
  }, []);

  // For Single Dropdown - Remove
  const handleRemovePress = useCallback(() => {
    setValue("");
    router.dismiss();
  }, []);

  // For Multi DropDown - Remove
  const handleCancelPress = useCallback(() => {
    clearValue();
    router.dismiss();
  }, []);

  const handleBarPress = (option) => {
    if (multiType == false) {
      setValue(option);
      router.dismiss();
    } else {
      if (value.includes(option)) {
        removeValue(option);
      } else {
        setValue(option);
      }
    }
  };

  const multiCloseandAddIcons = useCallback(() => {
    return(
      <ElectroMultiIcons
        icons={[
          { name: "close-circle", handlePress: handleRemovePress },
          { name: "add", handlePress: handleAddPress },
        ]}
      />
    );
  }, [options]);

  const addIcon = useCallback(() => {
    return (
      <ElectroIcon 
      name="add"
      size={30}
      color={secondaryColor}
      handlePress={handleAddPress}/>
    );
  });

  const multiDeleteAndCheckIcons = useCallback(() => {
    return (
      <ElectroMultiIcons
        icons={[
          { name: "close-circle", handlePress: handleCancelPress },
          { name: "checkmark", handlePress: handleCheckPress },
        ]}
      />
    );
  }, []);

  const dataCreation = (data) => {
    const dataOrganize = []
    for (let x = 0; x < data.length; x++) {
      dataOrganize.push({
        item: (
          <ElectroDropBar
            option={data[x].option}
            colorCode={data[x].color}
            optionType={options}
            multi={multiType}
            handlePress={handleBarPress}
          />
        ),
        key: x,
      });
    };

    return dataOrganize;
  };

  const dataOrganize = useMemo(
    () => dataCreation(rawData),
    [rawData, value]
  );

  useEffect(() => {
    useData(options).then(data => {
      setRawData(data);
  });
  }, [refresh]);

  useEffect(() => {
    if (rawData != undefined)
    setFlatListData(dataOrganize);
  }, [value, rawData]);
  

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
            headerTitle: headerTitle,
            headerTitleAlign: "center",
            headerBackVisible: multiType ? false : true,
            headerLeft: multiType ? multiDeleteAndCheckIcons : () => <></>,
            headerRight: multiType ? addIcon : multiCloseandAddIcons,
            headerShown: true,
            headerTintColor: secondaryColor,
          }}
        />
        <ElectroDropDownEmptyText 
          visible={flatListData == undefined || flatListData == null ? "none" : flatListData.length == 0 ? "flex" : "none"}
        />
        <FlatList
          contentContainerStyle={[
            styles.dropDownScreenFlatList,
          ]}
          getItemLayout={(data, index) => (
            {length: windowHeight/6, offset: windowHeight/6 * index, index}
          )}
          data={flatListData}
          renderItem={({ item }) => item.item}
          keyExtractor={(item) => item.key}
          removeClippedSubviews={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
