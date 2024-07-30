// Backend
import { styles } from "../../constants/stylers";

// React
import { TouchableOpacity, Text, Dimensions } from "react-native";
import { useCallback } from "react";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroMenuTab = (props) => {
  const { primaryColor } = useColor();
  const windowWidth = Dimensions.get("window").width;

  const handlePress = () => {
    props.handlePress(props.type);
  };

  return (
    <Animatable.View 
    animation={"flipInX"}
    useNativeDriver={true}
    style={{height: 90, width: windowWidth - 40}}>
    <TouchableOpacity
      style={[
        styles.menuTabTouchable,
        { borderColor: primaryColor, width: windowWidth - 40 },
      ]}
      onPress={handlePress}
    >
      <Text 
      style={[styles.menuTabText, { color: primaryColor }]}>
        {props.text}
      </Text>
    </TouchableOpacity>
    </Animatable.View>
  );
};
