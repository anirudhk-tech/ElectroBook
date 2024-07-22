// React
import { Text, TextInput, View } from "react-native";
import { useState } from "react";

export const ElectroPromptInput = (props) => {
  const [value, setValue] = useState("");

  const onSubmit = () => {
    if (value.trim() != "") {
      props.onSubmit(value.trim());
    };
  };

  return (
    <View style={props.viewStyles}>
      <Text style={props.textStyles}>{props.prompt}</Text>
      <TextInput
        style={props.inputStyles}
        placeholder={props.placeholder ? props.placeholder : ""}
        onBlur={onSubmit}
        onChangeText={(e) => setValue(e)}
      />
    </View>
  );
};
