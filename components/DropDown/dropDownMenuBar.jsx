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
import { useMenuColorPress, useMenuDelete, useMenuBack } from "../../hooks/useMenuBarActions";

export const ElectroMenuBar = (props) => {
  const { primaryColor, secondaryColor } = useColor();
  const handleColorPress = useMenuColorPress().action;
  const handleDeletePress = useMenuDelete().action;
  const windowHeight = Dimensions.get("window").height;

  const handleDelete = () => {
    handleDeletePress(props.option);
  };

  return (
    <View style={[styles.dropDownBarMainView, { height: windowHeight / 6, marginLeft: '3%' }]}>
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
          option={props.option} 
          type={props.type}
          tab={props.tab}/>
        <TouchableOpacity
          style={[
            styles.dropDownMenuBarDeleteTouchable,
            { backgroundColor: primaryColor, borderColor: primaryColor },
          ]}
          onPress={handleDelete}
        >
          <ElectroIcon
            name="close"
            size={20}
            color={secondaryColor}
            handlePress={handleDelete}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};
