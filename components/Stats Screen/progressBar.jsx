// React
import { View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroBar = (props) => {
  const [primaryColor] = useColor();
  const barPercentage = props.bookRatio * 100;

  return (
    <View style={[styles.progressBarMainView, { borderColor: primaryColor }]}>
      <View
        style={[
          styles.progressBarView,
          { width: `${barPercentage}%`, backgroundColor: primaryColor },
        ]}
      ></View>
    </View>
  );
};
