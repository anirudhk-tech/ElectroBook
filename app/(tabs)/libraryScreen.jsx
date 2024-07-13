// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';
import { get_library_name } from '../backend/controller';

// React
import { View } from 'react-native';
import { useContext, useState, useEffect } from 'react';

// Expo
import { Stack, router } from 'expo-router';

// Components
import { ElectroIcon } from '../../components/icon'; 

// Hooks
import { useColor } from '../../hooks/useTheme'; 

export default function libraryScreen () {
    const [libName, setLibName] = useState("");
    const [primaryColor, secondaryColor] = useColor();

    const handleMenuPress = () => {
        router.push('./menuScreen');
    };

    useEffect(() => {
        const fetchLibName = async () => {
            const asyncLibName = await get_library_name();
            setLibName(asyncLibName);
        };

        fetchLibName();
    });

    return (
        <View style={[styles.libraryScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: libName,
                    headerRight: (() => <ElectroIcon 
                                            name="albums-outline" 
                                            size={30} 
                                            style={styles.libraryMenuIcon}
                                            color={secondaryColor} 
                                            handlePress={handleMenuPress}/>),
                    headerShown: true}}/>
        </View>
    );
};

