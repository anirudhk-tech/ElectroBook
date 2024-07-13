// React
import { View, Text, TouchableOpacity } from "react-native";

// Backend
import { styles } from "../constants/stylers";

// Components
import { ElectroIcon } from "./icon";

// Hooks
import { useColor } from "../hooks/useTheme";

export const ElectroColorCodeBar = (props) => {
    const [primaryColor] = useColor();

    return (
        <TouchableOpacity style={styles.colorCodeBarSubView} onPress={() => props.handlePress()}>
            <View style={styles.colorCodeBarTextCircleView}>
                <ElectroIcon
                    name="color-palette-outline"
                    size={40}
                    color={primaryColor}
                />
                <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Color Code</Text>
                <View style={[styles.colorCodeBarCircleView, {borderColor: 'green', backgroundColor: 'green'}]}></View>
            </View>
        </TouchableOpacity>
    )
};