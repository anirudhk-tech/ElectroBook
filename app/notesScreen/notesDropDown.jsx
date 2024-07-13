// React
import { View } from "react-native"

// Expo
import { Stack } from 'expo-router';

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";


export default function notesDropDown () {
    const [primaryColor, secondaryColor] = useColor();

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