// React
import { TouchableOpacity, View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Expo
import { router } from "expo-router";

// Expo
import { useFileFunctions } from "../../hooks/useFileFunctions";

// Components
import { ElectroSelectedBadge } from "../Upload Screen/selectedBadge";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroDrop = (props) => {
  const [primaryColor, secondaryColor] = useColor();
  const options = props.options;
  let [value] = useFileFunctions(options);

  if (Array.isArray(value) == false) {
    value = [value];
  }

  const handlePress = () => {
    router.push(`../../dropDownScreen/${options}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.dropDownMainView,
        {
          borderColor:
            props.libraryHeader == undefined ? primaryColor : secondaryColor,
        },
      ]}
      onPress={handlePress}
    >
      {value.map((text) => {
        if (text == "") {
          return;
        } else {
          return (
            <ElectroSelectedBadge
              key={value.indexOf(text)}
              text={text}
              bgColor={primaryColor}
            />
          );
        }
      })}
      <View
        style={{
          backgroundColor: secondaryColor,
          width: 10,
          height: "100%",
          position: "absolute",
          marginLeft: "103%",
        }}
      ></View>
    </TouchableOpacity>
  );
};
