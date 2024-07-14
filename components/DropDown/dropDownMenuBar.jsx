// React
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';

// Backend
import { styles } from '../../constants/stylers';

// Components
import { ElectroIcon } from '../icon';

// Hooks
import { useColor } from '../../hooks/useTheme';

export const ElectroMenuBar = (props) => {
    const [primaryColor, secondaryColor] = useColor()
    const windowHeight = Dimensions.get('window').height;


    return (
        <View style={[styles.dropDownBarMainView, {height: windowHeight/10}]}>
            <View style={[styles.dropDownBarView, {borderColor: primaryColor, gap: 5}]}>
                <TouchableOpacity style={[styles.dropDownMenuBarColorCode, {backgroundColor: 'green'}]} onPress={() => props.handleColorPress()}></TouchableOpacity>
                <Text style={[styles.dropDownBarText, {color: primaryColor}]} numberOfLines={1}>{props.option}</Text>
                <TouchableOpacity style={[styles.dropDownMenuBarDeleteTouchable, {backgroundColor: primaryColor}]} onPress={() => props.handleDeletePress(props.option)}>
                    <ElectroIcon 
                        name="close" 
                        size={20} 
                        color={secondaryColor} 
                        handlePress={() => props.handleDeletePress(props.option)}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};
