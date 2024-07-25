// React
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Expo
import { router } from "expo-router";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditData, useEditRefresh, useEditType } from "../../hooks/useEdit";
import { useBookUpdate } from "../../hooks/useBookUpdate";

export const ElectroEditDropBar = (props) => {
  const {primaryColor} = useColor();
  const {data, setData} = useEditData();
  const {setEditRefresh} = useEditRefresh();
  const {type, setType} = useEditType();

  const windowHeight = Dimensions.get("window").height;
  const multi = ["genre", "trope"];
  
  const handlePress = () => {
    if (multi.includes(type)) {
      if (data.includes(props.option)) {
        setData(data.filter(x => x != props.option));
      } else {
        setData([...data, props.option]);
      };
    } else {
      useBookUpdate(type, props.bookName, props.option)
      setEditRefresh();
      setType(null);
      router.dismiss();
    };
  };

  return (
    <TouchableOpacity
      style={[styles.dropDownBarMainView, { height: windowHeight / 10 }]}
      onPress={() => {
        handlePress();
      }}
    >
      <View
        style={[
          styles.dropDownBarSelectedCircle,
          {
            borderColor: primaryColor,
            display: data.includes(props.option) ? multi.includes(type) ? "flex" : "none" : "none",
            backgroundColor: primaryColor,
          },
        ]}
      ></View>
      <Animatable.View 
        animation={"bounceIn"}
        useNativeDriver={true}
        style={[styles.dropDownBarView, { borderColor: primaryColor }]}>
        <Text style={[styles.dropDownBarText, { color: primaryColor }]}>
          {props.option}
        </Text>
        <View
          style={[styles.dropDownBarColorCode, { backgroundColor: props.color, borderColor: primaryColor, display: props.color != undefined ? "flex" : "none" }]}
        ></View>
      </Animatable.View>
    </TouchableOpacity>
  );
};
