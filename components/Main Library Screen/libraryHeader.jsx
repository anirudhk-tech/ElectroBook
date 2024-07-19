// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";

// React
import { View } from "react-native";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroLibraryHeader = (props) => {
  const {secondaryColor} = useColor();

  return (
    <View style={styles.libraryHeaderMainView}>
      <ElectroIcon
        name="construct"
        size={30}
        style={styles.libraryMenuIcon}
        color={secondaryColor}
        handlePress={props.editPress}
      />
    </View>
  );
};
