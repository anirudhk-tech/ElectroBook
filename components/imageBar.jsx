// React
import { TouchableOpacity, Text } from "react-native";
import { useCallback } from "react";

// Backend
import { styles } from "../constants/stylers";

// Components
import { ElectroIcon } from "../components/icon";

// Hooks
import { useColor } from "../hooks/useTheme";
import { useFileFunctions } from "../hooks/useFileFunctions";

// Styles are the same as notes bar

export const ElectroImageBar = (props) => {
  const [primaryColor] = useColor();
  const [imageUrl] = useFileFunctions("image");

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
        <ElectroIcon 
          name="checkmark-done-circle"
          size={30}
          color={primaryColor}
          handlePress={() => {}}
          style={[styles.notesIcon, {display: imageUrl == "" ? "none" : "flex", marginLeft: "45%"}]}
        />
    </TouchableOpacity>
  );
};
