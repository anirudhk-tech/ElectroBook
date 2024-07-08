import { Text, TextInput, View } from 'react-native';

export const PromptInput = (props) => {
    return(
        <View style={props.viewStyles}>
            <Text style={props.textStyles}>{props.prompt}</Text>
            <TextInput style={props.inputStyles} placeholder={props.placeholder ? props.placeholder : null}/>
        </View>
    )
}