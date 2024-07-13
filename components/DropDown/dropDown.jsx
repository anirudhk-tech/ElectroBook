// React
import { TouchableOpacity } from 'react-native';
import { useContext, useState, useEffect, useCallback } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

// Expo
import { router } from 'expo-router';

// Expo
import { useFileFunctions } from '../../hooks/useFileFunctions';

// Components
import { ElectroSelectedBadge } from '../selectedBadge';


export const ElectroDrop = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;
    const options = props.options;
    let [value] = useFileFunctions(options);
    
    if (Array.isArray(value) == false) {
        value = [value];
    };

    const handlePress = () => {
        router.navigate(`../../dropDownScreen/${options}`);
    };

    return (
        <TouchableOpacity 
            style={[styles.dropDownMainView, {borderColor: primaryColor}]}
            onPress={handlePress}>
        {
            value.map((text) => {
                return(
                    <ElectroSelectedBadge text={text}/>
                )
            })
        }
        </TouchableOpacity>
    );
};