// React
import { View, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSearchBarPress } from "../../hooks/useLibraryCardPress";
import { ElectroIcon } from "../General/icon";
import { useSearchActive } from "../../hooks/useSearch";

export const ElectroSearchLibraryBar = (props) => {
    const { primaryColor } = useColor();
    const { searchActive } = useSearchActive(); 
    const searchBarPress = useSearchBarPress().press;
    const [pressed, setPressed] = useState(false);
    
    const windowHeight = Dimensions.get("window").height;


    return (
        <TouchableOpacity 
        disabled={pressed}
        style={[styles.searchBarMainView, { height: windowHeight / 10, borderColor: primaryColor, display: searchActive ? "flex" : "none" }]}
        onPress={() => {
            searchBarPress(props.option, props.library);
            setPressed(true);
            setTimeout(() => {
                setPressed(false);
            }, 1000);
        }}
        >
            <View style={[styles.searchBarColorCode, { backgroundColor: props.color == "" || props.color == undefined ? primaryColor : props.color }]}></View>
            <Animatable.Text 
            animation={"bounceIn"}
            useNativeDriver={true}
            style={[styles.searchBarText, { color: primaryColor }]}
            numberOfLines={1}
            >{props.option.length > 22 ? `${props.option.slice(0, 22)}...` : props.option}</Animatable.Text>
            <ElectroIcon 
            name={props.library ? "library" : "book"}
            size={30}
            color={primaryColor}
            />
        </TouchableOpacity>
    )
};