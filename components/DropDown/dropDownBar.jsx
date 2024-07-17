// React
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useFileFunctions } from "../../hooks/useFileFunctions";
import { useDropDownType } from "../../hooks/useDropDownType";
import { useColor } from "../../hooks/useTheme";

export const ElectroDropBar = (props) => {
  const [primaryColor, secondaryColor] = useColor();
  const windowHeight = Dimensions.get("window").height;
  const [value] = useFileFunctions(props.optionType);
  const multiType = useDropDownType(props.optionType);

  return (
    <TouchableOpacity
      style={[styles.dropDownBarMainView, { height: windowHeight / 10 }]}
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
      <View style={[styles.dropDownBarView, { borderColor: primaryColor }]}>
        <Text style={[styles.dropDownBarText, { color: primaryColor }]}>
          {props.option}
        </Text>
        <View
          style={[styles.dropDownBarColorCode, { backgroundColor: props.colorCode, borderColor: primaryColor, display: props.colorCode != undefined ? "flex" : "none" }]}
        ></View>
      </View>
    </TouchableOpacity>
  );
};
