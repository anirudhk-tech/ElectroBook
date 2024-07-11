// React
import { View } from "react-native"
import { useContext } from "react";

// Expo
import { Stack } from 'expo-router';

// Backend
import { ThemeContext } from "../../constants/context";
import { styles } from "../../constants/stylers";


export default function notesDropDown () {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];

    return (
        <View style={[styles. notesScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleAlign: 'center',
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: "Notes",
                    headerShown: true}}/>
        </View>
    );
};