// React
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useDropDownType } from "../../hooks/useDropDownType";
import { useColor } from "../../hooks/useTheme";

export const ElectroDropBar = (props) => {
  const { primaryColor } = useColor();
  const windowHeight = Dimensions.get("window").height;
  const {value} = useFileFunctions(props.optionType);
  const multiType = useDropDownType(props.optionType);

  return (
      <TouchableOpacity
        style={[styles.dropDownBarMainView, { height: windowHeight / 6 }]}
        onPress={() => {
          props.handlePress(props.option);
        }}
      >
        <View
          style={[
            styles.dropDownBarSelectedCircle,
            {
              borderColor: primaryColor,
              display: multiType ? value.includes(props.option) ? "flex" : "none" : "none",
              backgroundColor: primaryColor,
            },
          ]}
        ></View>
        <Animatable.View 
           animation={"bounceIn"}
           useNativeDriver={true}
            style={[styles.dropDownBarView, { borderColor: primaryColor }]}>
          <Text 
          style={[styles.dropDownBarText, { color: primaryColor, textAlign: 'center', paddingLeft: props.colorCode != undefined && props.colorCode != "" ? 30 : 0 }]}
          numberOfLines={1}
          >
            {props.option}
          </Text>
          <View
            style={[styles.dropDownBarColorCode, { backgroundColor: props.colorCode, borderColor: primaryColor, display: props.colorCode != undefined && props.colorCode != "" ? "flex" : "none" }]}
          ></View>
        </Animatable.View>
      </TouchableOpacity>
  );
};
