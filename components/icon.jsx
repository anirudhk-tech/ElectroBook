// Expo
import { Ionicons } from "@expo/vector-icons";

// React
import { TouchableOpacity } from "react-native";

export const ElectroIcon = (props) => {
    return (
        <TouchableOpacity onPress={() => props.handlePress()}>
            <Ionicons name={props.name} color={props.color} size={props.size} style={props.style == undefined ? {} : props.style}/>
        </TouchableOpacity>
    )
};