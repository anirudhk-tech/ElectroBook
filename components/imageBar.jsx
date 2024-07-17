// React
import { TouchableOpacity, Text } from "react-native";
import { useCallback } from "react";

// Backend
import { styles } from "../constants/stylers";

// Components
import { ElectroIcon } from "../components/icon";

// Hooks
import { useColor } from "../hooks/useTheme";

// Styles are the same as notes bar

export const ElectroImageBar = (props) => {
  const [primaryColor] = useColor();

  const handleNotesPress = useCallback(() => {
    props.handlePress();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.notesBarTouchable, { borderColor: primaryColor }]}
      onPress={handleNotesPress}
    >
      <ElectroIcon
        name="image"
        size={40}
        color={primaryColor}
        handlePress={handleNotesPress}
        style={styles.notesIcon}
      />
      <Text style={[styles.imageBarText, { color: primaryColor }]} numberOfLines={1}>Cover Image</Text>
    </TouchableOpacity>
  );
};
