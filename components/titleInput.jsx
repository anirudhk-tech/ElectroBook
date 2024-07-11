// React
import { View, TextInput, Text} from 'react-native';
import { useContext, useState } from 'react';

// Backend
import { styles } from '../constants/stylers';
import { ThemeContext } from '../constants/context';

// Components
import { ElectroIcon } from './icon';

export const ElectroTitleInput = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;

    const [value, setValue] = useState("");

    return (
        <View style={styles.uploadScreenSubView}>
            <View style={{flexDirection: 'row', marginLeft: '5%'}}>
                <ElectroIcon
                    name={props.icon}
                    size={props.iconSize}
                    color={primaryColor}
                />
                <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>{props.prompt}</Text>
            </View>
            <TextInput 
                style={[styles.titleInputInput, {borderColor: primaryColor, color: primaryColor}]} 
                placeholder={props.placeholder ? props.placeholder : ""}
                placeholderTextColor={primaryColor}
                onBlur={value.trim() == "" ? () => {} : () => props.onSubmit(value.trim())}
                onChangeText={(e) => setValue(e)}
            />
        </View>
    )
}