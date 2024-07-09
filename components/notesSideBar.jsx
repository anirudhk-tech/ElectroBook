// React
import { View, Text } from 'react-native';
import { useContext } from 'react';

// Node Modules
import MultiTap from 'react-native-multitap';

// Backend
import { ThemeContext } from '../constants/context';
import { styles } from '../constants/stylers';


export const NotesSideBar = (props) => {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];
    if (props.visible == true) {
        return (
            <MultiTap
                onDoubleTap={() => {props.doubleTap()}}
                onSingleTap={() => {props.singleTap()}}
                delay={650}
                style={styles.notesSideBarMainViewMultiTap}>
                <View style={[styles.notesSideBarView, {backgroundColor: secondaryColor}]}>
                    <Text style={[styles.notesSideBarTitleText, {color: primaryColor}]}>Notes</Text>
                </View>
            </MultiTap>
        );
    };
}; 