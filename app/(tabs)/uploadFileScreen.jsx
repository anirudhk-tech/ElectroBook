// React
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useCallback, useContext, useState } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

// Expo
import { Stack, router } from 'expo-router';

// Components
import { ElectroPromptDropdown } from '../../components/promptDropdown';
import { ElectroAdvancedDivider } from '../../components/advancedDivider';
import { ElectroTitleInput } from '../../components/titleInput';
import { ElectroNotesBar } from '../../components/notesBar';
import { ElectroColorCodeBar } from '../../components/colorCodeBar';


export default function uploadFileScreen () {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];
    const windowHeight = Dimensions.get("window").height;
    const [advancedVisible, setAdvancedVisible] = useState('none');

    const handleAdvancedPress = () => {
        if (advancedVisible == 'flex') {
            setAdvancedVisible('none');
        } else {
            setAdvancedVisible('flex');
        };
    };

    const handleNotesPress = useCallback(() => {
        router.push('../notesScreen/notesDropDown')
    }, []);

    const handleColorBarPress = useCallback(() => {
        router.push('../colorPickerScreen/uploadFile')
    }, []);

    const handleSubmit = (value) => {
        // Implement setting of title
        console.log(value);
    };

    // Implement SQL where you get data about libs, genres, tropes, etc

    return (
        <ScrollView contentContainerStyle={[styles.uploadScreenMainView, {backgroundColor: secondaryColor, height: windowHeight}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: "Add",
                    headerShown: true}}/>
            <View style={[styles.uploadScreenGeneralView, {display: advancedVisible == 'none' ? 'flex' : 'none'}]}>
                <ElectroTitleInput 
                    prompt="Title" 
                    icon="text"
                    iconSize={40}
                    placeholder="File name if blank..."
                    onSubmit={handleSubmit}/>
                <ElectroPromptDropdown icon="library-outline" options={["Library", "multiFalse", "Action", "Romance"]}/>
                <ElectroPromptDropdown icon="person" options={["Author", "multiFalse", "Sara", "Anirudh"]}/>
            </View>
            <ElectroAdvancedDivider handlePress={handleAdvancedPress}/>
            <View style={[styles.uploadScreenAdvancedView, {display: advancedVisible}]}>
                <ElectroPromptDropdown icon="bonfire" options={["Genres", "multiTrue", "Action", "Romance"]}/>
                <ElectroPromptDropdown icon="boat" options={["Tropes", "multiTrue", "Action", "Romance"]}/>
                <ElectroPromptDropdown icon="layers-outline" options={["Series", "multiFalse", "Action", "Romance"]}/>
                <ElectroColorCodeBar handlePress={handleColorBarPress}/>
                <ElectroNotesBar handlePress={handleNotesPress}/>
            </View>
        </ScrollView>
    );
};