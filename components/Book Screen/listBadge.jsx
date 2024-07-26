// Backend
import { styles } from '../../constants/stylers';

//React
import { View, Text } from "react-native";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from '../../hooks/useTheme';


export const ElectroListBadge = (props) => {
    const {primaryColor, secondaryColor} = useColor();
    return (
        <Animatable.View
        animation={"fadeIn"} 
        useNativeDriver={true}
        delay={300}
        style={styles.booksScreenListBadgeMainView}>
            <View style={[styles.booksScreenListBadgeLine, {borderColor: primaryColor}]}></View>
            <Text 
            style={[styles.booksScreenListBadgeText, 
            {backgroundColor: primaryColor, color: secondaryColor, display: props.text == "" ? "none" : "flex"}]}
            >{props.text}</Text>
            <View style={[styles.booksScreenListBadgeLine, {borderColor: primaryColor}]}></View>
        </Animatable.View>
    )
};