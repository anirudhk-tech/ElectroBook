// React
import { View, TextInput, Text, Keyboard } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useFileFunctions } from "../../hooks/useFileFunctions";

export const ElectroTitleInput = (props) => {
  const {primaryColor} = useColor();
  const { value, setValue } = useFileFunctions("title");

  const handleBlur = () => {
    try {
      textInputField.blur()
    } catch {
      return
    };
  };

  const keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide', 
    handleBlur
  );

  return (
    <View style={styles.uploadScreenSubView}>
      <View style={{ flexDirection: "row", marginLeft: "5%" }}>
        <ElectroIcon
          name={props.icon}
          size={props.iconSize}
          color={primaryColor}
          handlePress={() => {}}
        />
        <Text style={[styles.uploadScreenTitle, { color: primaryColor }]}>
          {props.prompt}
        </Text>
      </View>
      <TextInput
        style={[
          styles.titleInputInput,
          { borderColor: primaryColor, color: primaryColor },
        ]}
        placeholder={props.placeholder ? props.placeholder : ""}
        placeholderTextColor={primaryColor}
        onChangeText={(e) => setValue(e.trim())}
        defaultValue={value}
        ref={input => {textInputField = input}}
      />
    </View>
  );
};
