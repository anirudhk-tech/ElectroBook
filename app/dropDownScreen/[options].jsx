// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";

// React
import { FlatList, View, Dimensions } from "react-native";
import { useState, useCallback, useEffect } from "react";

// Components
import { ElectroDropBar } from "../../components/DropDown/dropDownBar";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";
import { ElectroIcon } from "../../components/General/icon";

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
  const {primaryColor, secondaryColor} = useColor();
  const headerTitle = useHeader(options);
  const multiType = useDropDownType(options);
  const {value, setValue, removeValue, clearValue} = useFileFunctions(options);
  const {refresh} = useRefreshOptions(); 

  const [data, setData] = useState([]);

  const flatListBars = []; 

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

  // For Multi DropDown - Cancel
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
          { name: "construct", handlePress: handleAddPress },
        ]}
      />
    );
  }, [options]);

  const addIcon = useCallback(() => {
    return (
      <ElectroIcon 
      name="construct"
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

  const createFlatList = () => {
    for (let x = 0; x < data.length; x++) {
      flatListBars.push({
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
    }
  };

  useEffect(() => {
    useData(options).then(rawData => setData(rawData));
  }, [refresh])

  useEffect(() => {
    createFlatList();
  }, [value, data]);
  

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
          headerTitleAlign: "center",
          headerBackVisible: multiType ? false : true,
          headerLeft: multiType ? multiDeleteAndCheckIcons : () => <></>,
          headerRight: multiType ? addIcon : multiCloseandAddIcons,
          headerShown: true,
          headerTintColor: secondaryColor,
        }}
      />
      <FlatList
        contentContainerStyle={[
          styles.dropDownScreenFlatList,
          { height: windowHeight },
        ]}
        data={flatListBars}
        renderItem={({ item }) => item.item}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
