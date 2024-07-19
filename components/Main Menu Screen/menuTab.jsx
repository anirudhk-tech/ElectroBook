// Backend
import { styles } from "../../constants/stylers";

// React
import { TouchableOpacity, Text, Dimensions } from "react-native";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroMenuTab = (props) => {
  const {primaryColor} = useColor();
  const windowWidth = Dimensions.get("window").width;

  return (
    <TouchableOpacity
      style={[
        styles.menuTabTouchable,
        { borderColor: primaryColor, width: windowWidth - 40 },
      ]}
      onPress={() => props.handlePress(props.type)}
    >
      <Text style={[styles.menuTabText, { color: primaryColor }]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
