// React
import { Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export const ElectroPromptInput = (props) => {
    const [value, setValue] = useState("");

    return(
        <View style={props.viewStyles}>
            <Text style={props.textStyles}>{props.prompt}</Text>
            <TextInput 
                style={props.inputStyles} 
                placeholder={props.placeholder ? props.placeholder : null}
                onBlur={value == "" ? {} : props.onSubmit(value)}
                onChangeText={(e) => setValue(e)}
            />
        </View>
    );
};