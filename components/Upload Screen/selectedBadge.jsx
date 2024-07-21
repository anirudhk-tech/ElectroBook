// React
import { Text } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useUploadAlert } from "../../hooks/useUploadAlert";

export const ElectroSelectedBadge = (props) => {
  const {secondaryColor} = useColor();
  const {uploadAlertText} = useUploadAlert();
  const [display, setDisplay] = useState("flex");

  useEffect(() => {
    if (uploadAlertText != "") {
      setDisplay("none");
    } else {
      setDisplay("flex");
    };
  }, [uploadAlertText]);

  return (
    <Text
      style={[
        styles.selectedBadgeText,
        { backgroundColor: props.bgColor, color: secondaryColor, display: display },
      ]}
      numberOfLines={1}
    >
      {props.text}
    </Text>
  );
};
