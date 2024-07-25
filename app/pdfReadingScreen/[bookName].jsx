// Components
import { ElectroPdf } from "../../components/Reading Screen/pdf"

// React
import { View } from "react-native";
import { useState, useCallback } from "react";

// Expo
import { useLocalSearchParams, Stack } from "expo-router";

// Node Modules
import * as FileSystem from "expo-file-system";
import * as Animatable from "react-native-animatable";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../../components/General/icon";
import { NotesSideBar } from "../../components/Reading Screen/notesSideBar";

// Hooks
import { useColor } from "../../hooks/useTheme";


export default function pdfScreen () {
    const { bookName } = useLocalSearchParams();
    const {primaryColor, secondaryColor} = useColor();
    const [headerVisible, setHeaderVisible] = useState(true);
    const [notesVisible, setNotesVisible] = useState(false);

    const generatePdf = (fileName) => {
        const source = `${FileSystem.documentDirectory}All/${fileName}`;

        return {source: source, name: fileName}
    };

    const handleSinglePress = () => {
        setHeaderVisible(!headerVisible);
    };

    const handleNotesPress = () => {
        setNotesVisible(!notesVisible);
    };

    const handleNotesClose = useCallback(() => {
        setNotesVisible(false);
    }, []);

    const notesIcon = useCallback(() => {
        return (
            <ElectroIcon 
            name="bookmarks"
            size={30}
            color={secondaryColor}
            handlePress={handleNotesPress}
            />
        )
    });
  
    const {source, name} = generatePdf(bookName);

    return (
        <View style={styles.readingScreenMainView}>
            <Stack.Screen
                    options={{
                        //header: header
                        headerTitleAlign: 'center',
                        headerStyle: [styles.headerStyle, {backgroundColor: primaryColor}],
                        headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                        headerTitle: name,
                        headerShown: headerVisible,
                        headerRight: notesIcon,
                    }}
                />
            <ElectroPdf source={source} onSingleTap={handleSinglePress}/>
            <NotesSideBar visible={notesVisible} handleNotesClose={handleNotesClose} bookName={name}/>
        </View>
    );
};