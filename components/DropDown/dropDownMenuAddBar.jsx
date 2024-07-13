// Backend
import { ThemeContext } from '../../constants/context';
import { styles } from '../../constants/stylers';

// Components
import { ElectroIcon } from '../icon';

// React
import { TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useContext, useState } from 'react';


export const ElectroAddMenuBar = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;
    const windowHeight = Dimensions.get('window').height;

    const [inputActive, setInputActive] = useState(false);
    const [value, setValue] = useState("");

    const handleAddPress = () => {
        setInputActive(true);
    };

    if (inputActive == false) {
        return (
            <TouchableOpacity style={[styles.dropDownAddBarTouchable, {borderColor: primaryColor, height: windowHeight/9}]} onPress={handleAddPress}>
                <ElectroIcon
                    name="add"
                    size={50}
                    color={primaryColor}
                    handlePress={handleAddPress}
                />
            </TouchableOpacity>
        );
    } else {
        return (
            <TextInput 
                style={[styles.dropDownAddBarTouchable, {borderColor: primaryColor, height: windowHeight/9, color: primaryColor}]}
                autoFocus={true}
                onBlur={value == "" ? () => {} : () => props.onSubmit(value)}
                onChangeText={(e) => setValue(e.trim())}/>
        )
    }
};
