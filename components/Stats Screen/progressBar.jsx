// React
import { View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";
// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroProgressBar = (props) => {
  const { primaryColor } = useColor();
  const barPercentage = props.bookRatio * 100;

  const slideIntoFill = {
      from: {
        width: "0%"
      }, 
      to: {
        width: `${barPercentage}%`
      },
  };

  return (
    <View 
      style={[styles.progressBarMainView, { borderColor: primaryColor }]}>
      <Animatable.View
        animation={slideIntoFill}
        easing={"ease-in"}
        delay={500}
        style={[
          styles.progressBarView,
          { width: `${barPercentage}%`, backgroundColor: primaryColor },
        ]}
      ></Animatable.View>
    </View>
  );
};
