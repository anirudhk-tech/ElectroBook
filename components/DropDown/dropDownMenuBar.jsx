// React
import { View, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroMenuText } from "./dropDownMenuBarText";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroMenuBar = (props) => {
  const { primaryColor, secondaryColor } = useColor();
  const windowHeight = Dimensions.get("window").height;

  const handleColorPress = () => {
    props.handleColorPress(props.option);
  };

  const handleDeletePress = () => {
    props.handleDeletePress(props.option);
  };

  return (
    <View style={[styles.dropDownBarMainView, { height: windowHeight / 10, marginLeft: '3%' }]}>
      <Animatable.View
        animation={"bounceIn"}
        useNativeDriver={true}
        style={[styles.dropDownBarView, { borderColor: primaryColor, paddingHorizontal: 0.30 }]}
      >
        <TouchableOpacity
          style={[
            styles.dropDownMenuBarColorCode,
            { backgroundColor: props.color == "" ? undefined : props.color, borderColor: primaryColor},
          ]}
          onPress={handleColorPress}
        ></TouchableOpacity>
        <ElectroMenuText
          handleTextPress={props.handleTextPress} 
          option={props.option} 
          type={props.type}/>
        <TouchableOpacity
          style={[
            styles.dropDownMenuBarDeleteTouchable,
            { backgroundColor: primaryColor, borderColor: primaryColor },
          ]}
          onPress={handleDeletePress}
        >
          <ElectroIcon
            name="close"
            size={20}
            color={secondaryColor}
            handlePress={handleDeletePress}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};
