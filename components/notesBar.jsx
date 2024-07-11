// React
import { TouchableOpacity, Text } from 'react-native';
import { useCallback, useContext } from 'react';

// Expo
import { router } from 'expo-router';

// Backend
import { ThemeContext } from '../constants/context';
import { styles } from '../constants/stylers';

// Components
import { ElectroIcon } from '../components/icon';

export const ElectroNotesBar = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;

    const handleNotesPress = useCallback(() => {props.handlePress()}, []);

    return (
        <TouchableOpacity style={styles.notesBarTouchable} onPress={handleNotesPress}>
            <ElectroIcon 
                name="bookmarks-outline" 
                size={40} 
                color={primaryColor} 
                handlePress={handleNotesPress}
                style={styles.notesIcon}/>
            <Text style={[styles.notesBarText, {color: primaryColor}]}>Notes</Text>
        </TouchableOpacity>
    );
};