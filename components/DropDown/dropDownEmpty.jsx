// Node Modules
import * as Animatable from "react-native-animatable";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";


export const ElectroDropDownEmptyText = (props) => {
    const { primaryColor } = useColor();
    return (
        <Animatable.Text
            animation="bounceIn"
            delay={800}
            useNativeDriver={true}
            style={[styles.dropDownScreenNoOptionsText, { 
            color: primaryColor, 
            display: props.visible,
            }]}
        >{props.search ? "No Results!" : "Empty!"}</Animatable.Text>
    )
};