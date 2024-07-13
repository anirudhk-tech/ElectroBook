// React
import { View, TextInput, Text} from 'react-native';
import { useState } from 'react';

// Backend
import { styles } from '../constants/stylers';

// Components
import { ElectroIcon } from './icon';

// Hooks
import { useColor } from '../hooks/useTheme';

export const ElectroTitleInput = (props) => {
    const [primaryColor] = useColor()

    const [value, setValue] = useState("");

    return (
        <View style={styles.uploadScreenSubView}>
            <View style={{flexDirection: 'row', marginLeft: '5%'}}>
                <ElectroIcon
                    name={props.icon}
                    size={props.iconSize}
                    color={primaryColor}
                    handlePress={() => {}}
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