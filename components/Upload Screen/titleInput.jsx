// React
import { View, TextInput, Text } from "react-native";
import { useState, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useRefreshInfo } from "../../hooks/useRefreshInfo";

export const ElectroTitleInput = (props) => {
  const {primaryColor} = useColor();
  const refreshKey = useRefreshInfo().refresh;
  const [value, setValue] = useState("");

  useEffect(() => {
    textInputField.clear();
  }, [refreshKey]);

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
        onBlur={
          value.trim() == "" ? () => {} : () => props.onSubmit(value.trim())
        }
        onChangeText={(e) => setValue(e)}
        ref={input => {textInputField = input}}
      />
    </View>
  );
};
