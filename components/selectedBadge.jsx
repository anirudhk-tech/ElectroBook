// React
import { Text } from "react-native";

// Backend
import { styles } from "../constants/stylers";

// Hooks
import { useColor } from "../hooks/useTheme";

export const ElectroSelectedBadge = (props) => {
    const [primaryColor] = useColor();

    return (
        <Text style={[styles.selectedBadgeText, {backgroundColor: primaryColor}]}>{props.text}</Text>
    )
};
