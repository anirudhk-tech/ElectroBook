// Backend
import { styles } from "../../constants/stylers";
import { ThemeContext } from "../../constants/context";

// React
import { View, Text } from "react-native";
import { useContext } from "react";

// Components
import { ElectroDrop } from "../DropDown/dropDown";
import { ElectroIcon } from "../General/icon";

// Expo
import { router } from "expo-router";

// Hooks
import { useHeader } from "../../hooks/useHeader";
import { useColor } from "../../hooks/useTheme";

export const ElectroPromptDropdown = (props) => {
  const {primaryColor} = useColor();
  const prompt = useHeader(props.options);

  const handlePress = () => {
    router.navigate(`../../dropDownScreen/${props.options}`);
  };

  return (
    <View style={styles.uploadScreenSubView}>
      <View style={styles.promptDropDownTextIconView}>
        <ElectroIcon
          name={props.icon}
          size={40}
          color={primaryColor}
          handlePress={handlePress}
        />
        <Text style={[styles.uploadScreenTitle, { color: primaryColor }]}>
          {prompt}
        </Text>
      </View>
      <ElectroDrop options={props.options} />
    </View>
  );
};
