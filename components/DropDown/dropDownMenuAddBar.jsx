// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// React
import { TouchableOpacity, Dimensions, TextInput } from "react-native";
import { useState } from "react";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroAddMenuBar = (props) => {
  const {primaryColor} = useColor();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");

  const handleAddPress = () => {
    setInputActive(true);
  };

  const handleNoSubmit = () => {
    setInputActive(false);
  };

  const handleSubmit = () => {
    props.onSubmit(value);
    setInputActive(false);
  };

  if (inputActive == false) {
    return (
      <TouchableOpacity
        style={[
          styles.dropDownAddBarTouchable,
          {
            borderColor: primaryColor,
            height: windowHeight / 9,
            width: windowWidth - 48,
          },
        ]}
        onPress={handleAddPress}
      >
        <ElectroIcon
          name="add"
          size={50}
          color={primaryColor}
          handlePress={handleAddPress}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TextInput
        style={[
          styles.dropDownAddBarTouchable,
          {
            borderColor: primaryColor,
            height: windowHeight / 9,
            width: windowWidth - 40,
            color: primaryColor,
            flexShrink: 1,
          },
        ]}
        autoFocus={true}
        onBlur={value == "" ? handleNoSubmit : handleSubmit}
        onChangeText={(e) => setValue(e.trim())}
        multiline={true}
      />
    );
  }
};
