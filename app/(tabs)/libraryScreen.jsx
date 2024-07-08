// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';
import { get_library_name } from '../backend/controller';

// React
import { View } from 'react-native';
import { useContext, useState, useEffect } from 'react';

// Expo
import { Stack } from 'expo-router';

export default function libraryScreen () {
    const context = useContext(ThemeContext);
    const [libName, setLibName] = useState("");
    const [primaryColor, secondaryColor] = [context.primaryColor, context.secondaryColor]

    useEffect(() => {
        const fetchLibName = async () => {
            const asyncLibName = await get_library_name();
            setLibName(asyncLibName);
        };

        fetchLibName()
    });

    return (
        <View style={[styles.libraryScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: libName,
                    headerShown: true
                }}/>
        </View>
    );
};
