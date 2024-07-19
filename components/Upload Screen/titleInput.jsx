// React
import { View, TextInput, Text } from "react-native";
import { useState, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useInfo } from "../../hooks/useInfoFunctions";
import { useUploadPressed } from "../../hooks/useUploadStatus";
import { useFileFunctions } from "../../hooks/useFileFunctions";

export const ElectroTitleInput = (props) => {
  const {primaryColor} = useColor();
  const { uploadPressed, setUploadPressed } = useUploadPressed();
  const { value, setValue} = useFileFunctions("title");
  const info = useInfo("info");

  useEffect(() => {
      if (info.name != "" && info.library != "") {
        if (uploadPressed == true) {
            textInputField.clear();
            setUploadPressed(false);
        };
      };
  }, [info]);

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
        onChangeText={(e) => setValue(e)}
        defaultValue={value}
        ref={input => {textInputField = input}}
      />
    </View>
  );
};
