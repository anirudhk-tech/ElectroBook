// React
import { TouchableOpacity, Text } from "react-native";
import { useCallback } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useMenuType } from "../../hooks/useMenuType";

export const ElectroNotesBar = (props) => {
  const { primaryColor } = useColor();
  const { setType } = useMenuType();

  const handleNotesPress = () => {
    props.handlePress();
    setType("notes");
  };

  return (
    <TouchableOpacity
      style={[styles.notesBarTouchable, { borderColor: primaryColor }]}
      onPress={handleNotesPress}
    >
      <ElectroIcon
        name="bookmarks-outline"
        size={40}
        color={ primaryColor }
        handlePress={handleNotesPress}
        style={styles.notesIcon}
      />
      <Text style={[styles.notesBarText, { color: primaryColor }]}>Notes</Text>
    </TouchableOpacity>
  );
};
