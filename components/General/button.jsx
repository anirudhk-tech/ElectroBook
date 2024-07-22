import { TouchableOpacity, Text } from "react-native";
import { useCallback } from "react";

export const ElectroButton = (props) => {
  const handleAction = useCallback(() => {
    props.action();
  }, [props.action]);

  return (
    <TouchableOpacity
      style={props.touchableStyles}
      onPress={handleAction}
    >
      <Text style={props.textStyles}>{props.text}</Text>
    </TouchableOpacity>
  );
};
