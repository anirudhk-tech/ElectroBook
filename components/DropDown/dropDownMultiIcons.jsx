// React
import { View } from "react-native";

// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
export const ElectroMultiIcons = (props) => {
  const {secondaryColor} = useColor();

  return (
    <View style={styles.dropDownMultiIconsMainView}>
      {props.icons.map((icon) => {
        return (
          <ElectroIcon
            key={props.icons.indexOf(icon)}
            name={icon.name}
            size={30}
            color={secondaryColor}
            handlePress={() => icon.handlePress()}
          />
        );
      })}
    </View>
  );
};
