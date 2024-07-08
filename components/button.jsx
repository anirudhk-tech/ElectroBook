import { TouchableOpacity, Text } from "react-native"

export const ElectroButton = (props) => {
    return (
        <TouchableOpacity style={props.touchableStyles} onPress={() => props.action()}>
            <Text style={props.textStyles}>{props.text}</Text>
        </TouchableOpacity>
    )
}