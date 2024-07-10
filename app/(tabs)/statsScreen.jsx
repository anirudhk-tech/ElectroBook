// React
import { View, Text } from 'react-native';
import { useContext } from 'react';

// Expo
import { Stack } from 'expo-router';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

// Components
import { ElectroBar } from '../../components/progressBar';


export default function statsScreen () {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];

    return (
        <View style={[styles.statsScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: "Stats",
                    headerShown: true
                }}/>
            <View style={styles.statsScreenSubView}>
                <View style={styles.statsScreenTitleContainer}>
                    <Text style={[styles.statsScreenTitle, {color: primaryColor}]}>Completed</Text>
                    <View style={[styles.statsScreenDivider, {borderColor: primaryColor}]}></View>
                </View>
                <Text style={[styles.statsScreenText, {color: primaryColor}]}>10 Books</Text>
                <View style={styles.statsScreenProgressBarView}>
                    <ElectroBar bookRatio={1/2}/>
                </View>
            </View>
            <View style={styles.statsScreenSubView}>
                <View style={styles.statsScreenTitleContainer}>
                    <Text style={[styles.statsScreenTitle, {color: primaryColor}]}>Books</Text>
                    <View style={[styles.statsScreenDivider, {borderColor: primaryColor}]}></View>
                </View>
                <Text style={[styles.statsScreenText, {color: primaryColor}]}>25 Books</Text>
            </View>
            <View style={styles.statsScreenSubView}>
                <View style={styles.statsScreenTitleContainer}>
                    <Text style={[styles.statsScreenTitle, {color: primaryColor}]}>Speed</Text>
                    <View style={[styles.statsScreenDivider, {borderColor: primaryColor}]}></View>
                </View>
                <Text style={[styles.statsScreenText, {color: primaryColor}]}>25 WPM</Text>
            </View>
        </View>
    );
};