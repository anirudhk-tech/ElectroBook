// React
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useContext, useState } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

export const ElectroDropBar = (props) => {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];
    const windowHeight = Dimensions.get('window').height;
    const [selected, setSelected] = useState(false);

    // Implement Async Store where you check for already selected Items
    // Check for color of option
    return (
        <TouchableOpacity style={[styles.dropDownBarMainView, {height: windowHeight/10}]} onPress={() => {
            props.handlePress(props.option)
            setSelected(!selected)}}>
            <View style={[styles.dropDownBarSelectedCircle, {borderColor: primaryColor, display: props.multi == true ? 'flex' : 'none', backgroundColor: selected == true ? primaryColor : secondaryColor}]}></View>
            <View style={[styles.dropDownBarView, {borderColor: primaryColor}]}>
                <Text style={[styles.dropDownBarText, {color: primaryColor}]}>{props.option}</Text>
                <View style={[styles.dropDownBarColorCode, {backgroundColor: 'green'}]}></View>
            </View>
        </TouchableOpacity>
    );
};