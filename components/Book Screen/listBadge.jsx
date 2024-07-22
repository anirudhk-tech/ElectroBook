// Backend
import { styles } from '../../constants/stylers';

//React
import { View, Text } from "react-native";

// Hooks
import { useColor } from '../../hooks/useTheme';


export const ElectroListBadge = (props) => {
    const {primaryColor, secondaryColor} = useColor();
    return (
        <View style={styles.booksScreenListBadgeMainView}>
            <View style={[styles.booksScreenListBadgeLine, {borderColor: primaryColor}]}></View>
            <Text 
            style={[styles.booksScreenListBadgeText, 
            {backgroundColor: primaryColor, color: secondaryColor, display: props.text == "" ? "none" : "flex"}]}
            >{props.text}</Text>
            <View style={[styles.booksScreenListBadgeLine, {borderColor: primaryColor}]}></View>
        </View>
    )
};