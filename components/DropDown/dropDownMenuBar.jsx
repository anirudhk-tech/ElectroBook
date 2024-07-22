// React
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { useCallback } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroMenuText } from "./dropDownMenuBarText";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroMenuBar = (props) => {
  const {primaryColor, secondaryColor} = useColor();
  const windowHeight = Dimensions.get("window").height;

  const handleColorPress = useCallback(() => {
    props.handleColorPress(props.option);
  }, [props.option]);

  const handleDeletePress = useCallback(() => {
    props.handleDeletePress(props.option);
  }, [props.option]);

  return (
    <View style={[styles.dropDownBarMainView, { height: windowHeight / 10, marginLeft: '3%' }]}>
      <View
        style={[styles.dropDownBarView, { borderColor: primaryColor, paddingHorizontal: 0.30 }]}
      >
        <TouchableOpacity
          style={[
            styles.dropDownMenuBarColorCode,
            { backgroundColor: props.color, borderColor: primaryColor },
          ]}
          onPress={handleColorPress}
        ></TouchableOpacity>
        <ElectroMenuText option={props.option} type={props.type}/>
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
      </View>
    </View>
  );
};
