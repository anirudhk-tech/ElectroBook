// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";

// React
import { FlatList, View, Dimensions } from "react-native";
import { useContext, useState, useCallback, useEffect, memo } from "react";

// Components
import { ElectroDropBar } from "../../components/DropDown/dropDownBar";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";

// Hooks
import { useData } from "../../hooks/useData";
import { useHeader } from "../../hooks/useHeader";
import { useDropDownType } from "../../hooks/useDropDownType";
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useColor } from "../../hooks/useTheme";

// Backend
import { styles } from "../../constants/stylers";

export default function dropDownScreen() {
  const { options } = useLocalSearchParams();
  const windowHeight = Dimensions.get("window").height;

  const [primaryColor, secondaryColor] = useColor();
  const data = useData(options);
  const headerTitle = useHeader(options);
  const multiType = useDropDownType(options);
  const [value, setValue, removeValue, clearValue] = useFileFunctions(options);

  const flatListBars = [];

  const handleCheckPress = useCallback(() => {
    router.dismiss();
  }, []);

  const handleCancelPress = useCallback(() => {
    clearValue();
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

  const multiOptions = useCallback(() => {
    return (
      <ElectroMultiIcons
        icons={[
          { name: "close-circle", handlePress: handleCancelPress },
          { name: "checkmark", handlePress: handleCheckPress },
        ]}
      />
    );
  }, []);

  for (let x = 0; x < data.length; x++) {
    flatListBars.push({
      item: (
        <ElectroDropBar
          option={data[x]}
          optionType={options}
          multi={multiType}
          handlePress={handleBarPress}
        />
      ),
      key: x,
    });
  }

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
          headerRight: multiType == true ? multiOptions : () => <></>,
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
