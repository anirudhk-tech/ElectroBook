// React
import { View, Text, TouchableOpacity } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useFileFunctions } from "../../hooks/useFileFunctions";

export const ElectroColorCodeBar = (props) => {
  const {primaryColor} = useColor();
  const color = useFileFunctions("fileColor").value;
  const colorCircleFill = color == "" ? primaryColor : color;

  return (
    <TouchableOpacity
      style={styles.colorCodeBarSubView}
      onPress={() => props.handlePress()}
    >
      <View style={styles.colorCodeBarTextCircleView}>
        <ElectroIcon
          name="color-palette-outline"
          size={40}
          color={primaryColor}
        />
        <Text style={[styles.uploadScreenTitle, { color: primaryColor }]}>
          Color Code
        </Text>
        <View
          style={[
            styles.colorCodeBarCircleView,
            { borderColor: colorCircleFill, backgroundColor: colorCircleFill },
          ]}
        ></View>
      </View>
    </TouchableOpacity>
  );
};
