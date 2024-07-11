// React
import { View } from 'react-native';
import { useContext, useCallback, useState } from 'react';

// Expo
import { Stack, router } from 'expo-router';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';
import { store_data } from '../backend/controller';

// Components
import { ElectroButton } from '../../components/button';
import { ElectroAlert } from '../../components/alert';

export default function settingsScreen () {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];
    const [displayAlert, setDisplayAlert] = useState('none');

    const handlePrimaryColorPress = useCallback(() => {
        router.push('../colorPickerScreen/settingsPrimary');
    }, []);

    const handleSecondaryColorPress = useCallback(() => {
        router.push(`../colorPickerScreen/settingsSecondary`)
    }, []);

    const handleReadingTestPress = useCallback(() => {
        setDisplayAlert(undefined)
    }, []);

    const handleOkayPress = useCallback(() => {
        router.push('./readingTestScreen');
        setDisplayAlert('none');
        store_data("settings completed", "true");
    }, []);

    const handleSkipPress = useCallback(() => {
        router.push('./libraryScreen');
        setDisplayAlert('none');
        store_data("settings completed", "true")
    }, []);

    return (
        <View style={[styles.settingsScreenMainView, {backgroundColor: secondaryColor}]}>
            <View style={[styles.settingsScreenMainView, {opacity: displayAlert == 'none' ? 100 : 0}]}>
                <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: "Configure",
                    headerShown: true}}/>
                <View style={[styles.settingsScreenButtonContainer]}>
                    <ElectroButton 
                        text="Pick Primary Color"
                        touchableStyles={[styles.settingsScreenTouchable, {borderColor: primaryColor}]}
                        textStyles={[styles.buttonText, {color: primaryColor}]}
                        action={handlePrimaryColorPress}/>
                </View>
                <View style={styles.settingsScreenButtonContainer}>
                    <ElectroButton 
                        text="Pick Secondary Color"
                        touchableStyles={[styles.settingsScreenTouchable, {borderColor: primaryColor}]}
                        textStyles={[styles.buttonText, {color: primaryColor}]}
                        action={handleSecondaryColorPress}/>
                </View>
                <View style={styles.settingsScreenButtonContainer}>
                    <ElectroButton 
                        text="Take Reading Test"
                        touchableStyles={[styles.settingsScreenTouchable, {borderColor: primaryColor}]}
                        textStyles={[styles.buttonText, {color: primaryColor}]}
                        action={handleReadingTestPress}/>
                </View>
            </View>
            <ElectroAlert
                display={displayAlert}
                title="Reading Test"
                message={["Read a short pdf to gauge how fast you read!", "Your result will be used to calculate read times."]}
                negativeButton="Skip"
                positiveButton="Okay"
                negativePress={handleSkipPress}
                positivePress={handleOkayPress}/>
        </View>
    );
};