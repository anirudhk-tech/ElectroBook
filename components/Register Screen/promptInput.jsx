// React
import { Text, TextInput, View, Keyboard } from "react-native";

export const ElectroPromptInput = (props) => {

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
    <View style={props.viewStyles}>
      <Text style={props.textStyles}>{props.prompt}</Text>
      <TextInput
        style={props.inputStyles}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChangeText={(e) => props.onChange(e)}
        ref={input => {textInputField = input}}
      />
    </View>
  );
};
