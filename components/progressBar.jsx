// React
import { View } from 'react-native';
import { useContext } from 'react';

// Backend
import { ThemeContext } from '../constants/context';
import { styles } from '../constants/stylers';


export const ElectroBar = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;
    const barPercentage = props.bookRatio * 100;

    return (
        <View style={[styles.progressBarMainView, {borderColor: primaryColor}]}>
            <View style={[styles.progressBarView, {width: `${barPercentage}%`, backgroundColor: primaryColor}]}></View>
        </View>
    )
};