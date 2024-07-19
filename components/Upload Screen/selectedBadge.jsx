// React
import { Text } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroSelectedBadge = (props) => {
  const {secondaryColor} = useColor();

  return (
    <Text
      style={[
        styles.selectedBadgeText,
        { backgroundColor: props.bgColor, color: secondaryColor },
      ]}
      numberOfLines={1}
    >
      {props.text}
    </Text>
  );
};
