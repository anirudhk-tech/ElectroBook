// React
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useContext, useState } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

// Expo
import { Stack } from 'expo-router';


export default function uploadFileScreen () {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];
    
    const [advancedVisible, setAdvancedVisible] = useState('none');

    const handleAdvancedPress = () => {
        if (advancedVisible == 'flex') {
            setAdvancedVisible('none');
        } else {
            setAdvancedVisible('flex');
        };
    };

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={[styles.uploadScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: "Add",
                    headerShown: true
                }}/>
            <View style={[styles.uploadScreenGeneralView, {display: advancedVisible == 'none' ? 'flex' : 'none'}]}>
                <View style={[styles.uploadScreenSubView]}>
                    <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Title</Text>
                </View>
                <View style={styles.uploadScreenSubView}>
                    <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Library</Text>
                </View>
                <View style={styles.uploadScreenSubView}>
                    <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Author</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.uploadScreenAdvancedTouchable} onPress={handleAdvancedPress}>
                <View style={styles.uploadScreenAdvancedDividerView}>
                    <View style={[styles.uploadScreenAdvancedDivider, {borderColor: primaryColor}]}></View>
                    <Text style={[styles.uploadScreenAdvancedText, {color: primaryColor}]}>Advanced</Text>
                    <View style={[styles.uploadScreenAdvancedDivider, {borderColor: primaryColor}]}></View>
                </View>
            </TouchableOpacity>
            <View style={[styles.uploadScreenAdvancedView, {display: advancedVisible}]}>
                    <View style={styles.uploadScreenSubView}>
                        <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Genres</Text>
                    </View>
                    <View style={styles.uploadScreenSubView}>
                        <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Tropes</Text>
                    </View>
                    <View style={styles.uploadScreenSubView}>
                        <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Notes</Text>
                    </View>
                    <View style={styles.uploadScreenSubView}>
                        <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Series</Text>
                    </View>
                    <View style={styles.uploadScreenSubView}>
                        <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Color Code</Text>
                    </View>
                </View>
        </ScrollView>
    );
};