// React
import { TouchableOpacity, View, Text } from "react-native";
import { useCallback } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroAdvancedDivider = (props) => {
  const {primaryColor} = useColor();

  const handlePress = () => {
    props.handlePress();
  };

  return (
    <TouchableOpacity
      style={styles.uploadScreenAdvancedTouchable}
      onPress={handlePress}
    >
      <View style={styles.uploadScreenAdvancedDividerView}>
        <View
          style={[
            styles.uploadScreenAdvancedDivider,
            { borderColor: primaryColor },
          ]}
        ></View>
        <Text
          style={[styles.uploadScreenAdvancedText, { color: primaryColor }]}
        >
          Advanced
        </Text>
        <View
          style={[
            styles.uploadScreenAdvancedDivider,
            { borderColor: primaryColor },
          ]}
        ></View>
      </View>
    </TouchableOpacity>
  );
};
