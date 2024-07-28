// React
import { View, Text, Dimensions, TouchableOpacity } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSearchBarPress } from "../../hooks/useLibraryCardPress";

export const ElectroSearchLibraryBar = (props) => {
    const { primaryColor } = useColor();
    const searchBarPress = useSearchBarPress().press;
    
    const windowHeight = Dimensions.get("window").height;


    return (
        <TouchableOpacity 
        style={[styles.searchBarMainView, { height: windowHeight / 10, borderColor: primaryColor }]}
        onPress={() => searchBarPress(props.option)}
        >
            <View style={[styles.searchBarColorCode, { backgroundColor: props.color == "" || props.color == undefined ? primaryColor : props.color }]}></View>
            <Animatable.Text 
            animation={"bounceIn"}
            useNativeDriver={true}
            style={[styles.searchBarText, { color: primaryColor }]}
            numberOfLines={1}
            >{props.option.length > 25 ? `${props.option.slice(0, 25)}...` : props.option}</Animatable.Text>
        </TouchableOpacity>
    )
};