// Expo
import { Stack } from 'expo-router';

// React
import { View } from 'react-native';
import { useContext } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

// Components
import { Logo } from '../../components/logo';
import { PromptInput } from '../../components/promptInput';


export default function registerScreen () {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;
    const secondaryColor = colorContext.secondaryColor;

    return (
        <View style={[styles.registerScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: primaryColor},
                headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                headerTitle: "Open Library",
                headerShown: true,
            }}/>
            <Logo styles={styles.registerScreenLogo}/>
            <PromptInput viewStyles={styles.registerScreenInputView} textStyles={styles.registerScreenInputPrompt} inputStyles={styles.registerScreenInput}/>
        </View>
    )
};
