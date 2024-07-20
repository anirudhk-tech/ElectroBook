// React
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditData, useEditType, useEditBookName } from "../../hooks/useEdit";
import { useBookUpdate } from "../../hooks/useBookUpdate";

export const ElectroEditDropBar = (props) => {
  const {primaryColor} = useColor();
  const {type} = useEditType();
  const {data, setData} = useEditData();
  const {editBookName} = useEditBookName();

  const windowHeight = Dimensions.get("window").height;
  
  const handlePress = () => {
    if (data.includes(props.option)) {
      setData(data.filter(x => x != props.option));
    } else {
      setData([...data, props.option]);
    };
  };

  useEffect(() => {
    useBookUpdate(type, editBookName, data);
  }, [data]);

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
            display: data.includes(props.option) ? "flex" : "none",
            backgroundColor: primaryColor,
          },
        ]}
      ></View>
      <View style={[styles.dropDownBarView, { borderColor: primaryColor }]}>
        <Text style={[styles.dropDownBarText, { color: primaryColor }]}>
          {props.option}
        </Text>
        <View
          style={[styles.dropDownBarColorCode, { backgroundColor: props.color, borderColor: primaryColor, display: props.color != undefined ? "flex" : "none" }]}
        ></View>
      </View>
    </TouchableOpacity>
  );
};
