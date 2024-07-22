// React
import { Text, TouchableOpacity } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroReadButton = (props) => {
    const {secondaryColor} = useColor();

    return (
        <TouchableOpacity onPress={props.handlePress}>
            <Text style={[styles.booksScreenReadButton, {color: secondaryColor, borderColor: secondaryColor}]}>Read</Text>
        </TouchableOpacity>
    )
};