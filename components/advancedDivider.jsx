// React
import { TouchableOpacity, View, Text } from "react-native";
import { useContext } from "react";

// Backend
import { styles } from "../constants/stylers";
import { ThemeContext } from "../constants/context";

export const ElectroAdvancedDivider = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;

    return (
        <TouchableOpacity style={styles.uploadScreenAdvancedTouchable} onPress={() => props.handlePress()}>
                <View style={styles.uploadScreenAdvancedDividerView}>
                    <View style={[styles.uploadScreenAdvancedDivider, {borderColor: primaryColor}]}></View>
                    <Text style={[styles.uploadScreenAdvancedText, {color: primaryColor}]}>Advanced</Text>
                    <View style={[styles.uploadScreenAdvancedDivider, {borderColor: primaryColor}]}></View>
                </View>
         </TouchableOpacity>
    )
}