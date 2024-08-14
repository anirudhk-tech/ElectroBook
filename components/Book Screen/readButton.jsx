// React
import { Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroReadButton = (props) => {
    const {secondaryColor} = useColor();
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableOpacity 
        disabled={pressed}
        onPress={() => {
            props.handlePress();
            setPressed(true);
            setTimeout(() => {
                setPressed(false);
            }, 1000);
        }}>
            <Text style={[styles.booksScreenReadButton, {color: secondaryColor, borderColor: secondaryColor}]}>Read</Text>
        </TouchableOpacity>
    )
};