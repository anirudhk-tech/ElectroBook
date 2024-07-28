// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";

// React
import { View } from "react-native";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSearchActive } from "../../hooks/useSearch";

export const ElectroLibraryHeader = (props) => {
  const { secondaryColor } = useColor();
  const { setSearchActive } = useSearchActive();

  return (
    <View style={styles.libraryHeaderMainView}>
      <ElectroIcon 
      name="search"
      size={30}
      color={secondaryColor}
      style={styles.libraryMenuIcon}
      handlePress={setSearchActive}
      />
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
