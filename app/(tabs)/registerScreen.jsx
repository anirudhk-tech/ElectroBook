// Expo
import { Stack, router } from 'expo-router';

// React
import { View } from 'react-native';
import { useCallback, useContext, memo } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';
import { create_user, check_user, delete_user } from '../backend/controller';

// Components
import { ElectroLogo } from '../../components/logo';
import { ElectroPromptInput } from '../../components/promptInput';
import { ElectroButton } from '../../components/button';

// Hooks
import { useColor } from '../../hooks/useTheme';

export default function registerScreen () {
    
    const [primaryColor, secondaryColor] = useColor();

    const changeLibName = async (libName) => {
        const created = await check_user()
        if (created == false) {
            await create_user(libName);
        } else {
            await delete_user();
            await create_user(libName);
        }
    };

    const handlePress = useCallback(async () => {
        const created = await check_user();
        if (created == true) {
            router.push('./settingsScreen');
        };
    }, []);
    

    return (
        <View style={[styles.registerScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: primaryColor},
                headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                headerTitle: "Open Library",
                headerShown: true}}/>
            <ElectroLogo styles={styles.registerScreenLogo}/>
            <ElectroPromptInput 
                viewStyles={styles.registerScreenInputView} 
                textStyles={[styles.registerScreenInputPrompt, {color: primaryColor}]} 
                inputStyles={[styles.registerScreenInput, {borderColor: primaryColor, color: primaryColor}]}
                prompt="Library Name"
                onSubmit={changeLibName}/>
            <View style={styles.registerScreenButtonContainer}>
                <ElectroButton 
                    text="Open" 
                    touchableStyles={[styles.registerScreenTouchable, {borderColor: primaryColor}]} 
                    textStyles={[styles.buttonText, {color: primaryColor}]}
                    action={handlePress}
                    />
            </View>
           
        </View>
    )
};