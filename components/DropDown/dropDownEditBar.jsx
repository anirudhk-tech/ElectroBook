// React
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditData } from "../../hooks/useEdit";

export const ElectroEditDropBar = (props) => {
  const {primaryColor} = useColor();
  const {data, setData} = useEditData();

  const windowHeight = Dimensions.get("window").height;
  
  const handlePress = () => {
    if (data.includes(props.option)) {
      setData(data.filter(x => x != props.option));
    } else {
      setData([...data, props.option]);
    };
  };

  return (
    <TouchableOpacity
      style={[styles.dropDownBarMainView, { height: windowHeight / 10 }]}
      onPress={() => {
        handlePress();
      }}
    >
      <View
        style={[
          styles.dropDownBarSelectedCircle,
          {
            borderColor: primaryColor,
            display: data.includes(props.option) ? "flex" : "none",
            backgroundColor: primaryColor,
          },
        ]}
      ></View>
      <Animatable.View 
        animation={"bounceIn"}
        useNativeDriver={true}
        style={[styles.dropDownBarView, { borderColor: primaryColor }]}>
        <Text style={[styles.dropDownBarText, { color: primaryColor }]}>
          {props.option}
        </Text>
        <View
          style={[styles.dropDownBarColorCode, { backgroundColor: props.color, borderColor: primaryColor, display: props.color != undefined ? "flex" : "none" }]}
        ></View>
      </Animatable.View>
    </TouchableOpacity>
  );
};
