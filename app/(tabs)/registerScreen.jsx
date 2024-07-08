// Expo
import { Stack, router } from 'expo-router';

// React
import { View } from 'react-native';
import { useCallback, useContext } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';
import { set_library_name } from '../backend/controller';

// Components
import { ElectroLogo } from '../../components/logo';
import { ElectroPromptInput } from '../../components/promptInput';
import { ElectroButton } from '../../components/button';

export default function registerScreen () {
    const context = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [context.primaryColor, context.secondaryColor];

    const changeLibName = (libName) => {
        set_library_name(libName);
    };

    const handlePress = useCallback(() => {
        router.push('./settingsScreen');
    }, []);
    

    return (
        <View style={[styles.registerScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: primaryColor},
                headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                headerTitle: "Open Library",
                headerShown: true,
            }}/>
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
