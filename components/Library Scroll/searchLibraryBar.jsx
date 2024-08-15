// React
import { View, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSearchBarPress, useSelectedLibrary } from "../../hooks/useLibraryCardPress";
import { ElectroIcon } from "../General/icon";
import { useSearchActive, useBookSearchActive } from "../../hooks/useSearch";

export const ElectroSearchLibraryBar = (props) => {
    const { primaryColor } = useColor();
    const searchBarPress = useSearchBarPress().press;
    const [pressed, setPressed] = useState(false);
    const { setSearchActive } = useSearchActive();
    const { setSelectedLibrary } = useSelectedLibrary();
    const setBookSearchActive = useBookSearchActive().setSearchActive;
    
    const windowHeight = Dimensions.get("window").height;


    return (
        <TouchableOpacity 
        disabled={pressed}
        style={[styles.searchBarMainView, { height: windowHeight / 10, borderColor: primaryColor }]}
        onPress={() => {
            setSearchActive(false);
            setBookSearchActive(false);
            if (props.library) {
                setSelectedLibrary(props.option);
            }; 
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