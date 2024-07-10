// React
import { TouchableOpacity } from 'react-native';
import { useCallback, useContext } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

// Expo
import { router } from 'expo-router';


export const ElectroDrop = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;
    const options = props.options;

    // Implement Async where you put already selected items into the dropdown

    const handlePress = () => {
        router.navigate(`../../dropDownScreen/${options}`)
    };

    return (
        <TouchableOpacity 
            style={[styles.dropDownMainView, {borderColor: primaryColor}]}
            onPress={handlePress}>
        </TouchableOpacity>
    );
};