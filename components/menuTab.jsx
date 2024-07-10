// Backend
import { ThemeContext } from "../constants/context";
import { styles } from "../constants/stylers";

// React
import { useContext, useCallback } from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";

export const ElectroMenuTab = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;
    const windowWidth = Dimensions.get("window").width;

    return (
        <TouchableOpacity style={[styles.menuTabTouchable, {borderColor: primaryColor, width: windowWidth - 40}]} onPress={() => props.handlePress(props.text)}>
            <Text style={[styles.menuTabText, {color: primaryColor}]}>{props.text}</Text>
        </TouchableOpacity>
    );
};