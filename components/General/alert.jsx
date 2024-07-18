// React
import { View, Text, Image } from "react-native";

// Backend
import { styles } from "../../constants/stylers";
import { ElectroButton } from "./button";

// Hooks
import { useColor } from "../../hooks/useTheme";

// Expo
import { Octicons } from "@expo/vector-icons";

export const ElectroAlert = (props) => {
  const [primaryColor, secondaryColor] = useColor();

  if (props.message) {
    return (
      <View
        style={[
          styles.alertView,
          {
            height: "60%",
            backgroundColor: secondaryColor,
            justifyContent: "flex-start",
            display: props.display == undefined ? "flex" : props.display,
            borderColor: primaryColor,
          },
        ]}
      >
        <View style={styles.alertTitleImageView}>
          <Text style={[styles.alertTitleText, { color: primaryColor }]}>
            {props.title ? props.title : null}
          </Text>
          <Octicons
            name="zap"
            color={primaryColor}
            size={40}
            style={styles.alertIcon}/>
        </View>
        {props.message.map((msg) => {
          return (
            <Text
              style={[styles.alertMessageText, { color: primaryColor }]}
              key={props.message.indexOf(msg)}
            >
              {msg}
            </Text>
          );
        })}
        <View style={[styles.alertButtonView]}>
          <ElectroButton
            text={props.negativeButton}
            touchableStyles={[
              styles.alertScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={props.negativePress}
          />
          <ElectroButton
            text={props.positiveButton}
            touchableStyles={[
              styles.alertScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={props.positivePress}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.alertView,
          {
            height: "30%",
            backgroundColor: secondaryColor,
            justifyContent: "center",
            display: props.display == undefined ? "flex" : props.display,
            borderColor: primaryColor,
          },
        ]}
      >
        <Text style={[styles.alertTitleTextNoMessage, { color: primaryColor }]}>
          {props.title ? props.title : null}
        </Text>
        <View style={styles.alertScreenSingleButtonView}>
          <ElectroButton
            text={props.positiveButton}
            touchableStyles={[
              styles.alertScreenTouchable,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={props.positivePress}
          />
        </View>
      </View>
    );
  }
};
