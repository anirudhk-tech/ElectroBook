// Expo
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";

// React
import { TouchableOpacity } from "react-native";

export const ElectroIcon = (props) => {

  const handlePress = useCallback(() => {
    if (props.handlePress != undefined) {
      props.handlePress();
    };
  }, [props.handlePress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons
        name={props.name}
        color={props.color}
        size={props.size}
        style={props.style == undefined ? {} : props.style}
      />
    </TouchableOpacity>
  );
};
