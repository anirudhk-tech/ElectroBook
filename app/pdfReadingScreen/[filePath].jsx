// Components
import { ElectroPdf } from "../../components/Reading Screen/pdf"

// React
import { View } from "react-native";
import { useState, useCallback } from "react";

// Expo
import { useLocalSearchParams, Stack } from "expo-router";

// Node Modules
import * as FileSystem from "expo-file-system";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../../components/General/icon";
import { NotesSideBar } from "../../components/Reading Screen/notesSideBar";

// Hooks
import { useColor } from "../../hooks/useTheme";


export default function pdfScreen () {
    const {filePath} = useLocalSearchParams();
    const {primaryColor, secondaryColor} = useColor();
    const [headerVisible, setHeaderVisible] = useState(true);
    const [notesVisible, setNotesVisible] = useState(false);

    const generatePdf = (filePath) => {
        const filePathSplit = filePath.split("+");
        const library = filePathSplit[0];
        const name = filePathSplit[1];
        const source = `${FileSystem.documentDirectory}All/${library}/${name}`;

        return {source: source, name: name}
    };

    const handleSinglePress = () => {
        setHeaderVisible(!headerVisible);
    };

    const handleNotesPress = () => {
        setNotesVisible(!notesVisible);
    };

    const notesIcon = useCallback(() => {
        return (
            <ElectroIcon 
            name="bookmarks"
            size={30}
            color={secondaryColor}
            onPress={handleNotesPress}
            />
        )
    }, [])

    const {source, name} = generatePdf(filePath);

    setTimeout(() => {
        if (headerVisible == true) {
            setHeaderVisible(false);
        };
    }, 5000);   

    return (
        <View style={styles.readingScreenMainView}>
            <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: primaryColor },
                        headerShown: headerVisible,
                        headerTitleAlign: 'center',
                        headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                        headerTitle: name,
                        headerRight: notesIcon,
                    }}
                />
            <ElectroPdf source={source} onSingleTap={handleSinglePress}/>
            <NotesSideBar visible={notesVisible} />
        </View>
    );
};