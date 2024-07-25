// Components
import { ElectroPdf } from "../../components/Reading Screen/pdf"

// React
import { View } from "react-native";
import { useState, useCallback, useRef, useEffect } from "react";

// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";

// Node Modules
import * as FileSystem from "expo-file-system";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../../components/General/icon";
import { ElectroNotesSideBar } from "../../components/Reading Screen/notesSideBar";
import { ElectroSettingsSideBar } from "../../components/Reading Screen/settingsSideBar";


// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookUpdate } from "../../hooks/useBookUpdate";
import { useEditRefresh } from "../../hooks/useEdit";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookName } from "../../hooks/useBookName";


export default function pdfScreen () {
    const { bookName } = useLocalSearchParams();
    const { setBookName } = useBookName();
    const {primaryColor, secondaryColor} = useColor();
    const {setEditRefresh} = useEditRefresh();
    const [headerVisible, setHeaderVisible] = useState(true);
    const [notesVisible, setNotesVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [pdfPg, setPdfPg] = useState(0);
    const page = useRef();

    const generatePdf = (fileName) => {
        const source = `${FileSystem.documentDirectory}All/${fileName}`;

        return {source: source, name: fileName}
    };

    const handleSinglePress = () => {
        if (notesVisible || settingsVisible) {
            setNotesVisible(false);
            setSettingsVisible(false);
        } else {
            setHeaderVisible(!headerVisible);
        };
    };

    const handleNotesPress = () => {
        setNotesVisible(!notesVisible);
    };

    const handleSettingsPress = () => {
        setSettingsVisible(!settingsVisible);
    };

    const handlePageChange = (pageNumber) => {
        page.current = pageNumber;
    };

    const handleColorPress = useCallback(() => {
        router.push("../colorPickerScreen/pdf-BG-COLOR");
    }, []);

    const handleSinglePage = useCallback(() => {
        setSettingsVisible(false);
    }, []);

    const updatePage = () => {
        useBookUpdate("page", bookName, page.current);
        setEditRefresh();
        router.dismiss();
    };

    const backIcon = () => {
        return (
            <ElectroIcon 
            name="arrow-back"
            size={30}
            color={secondaryColor}
            handlePress={updatePage}
            />
        );
    };

    const headerRightIcons = useCallback(() => {
        return (
            <View style={{flexDirection: 'row', gap: 10}}>
                <ElectroIcon 
                name="bookmarks"
                size={30}
                color={secondaryColor}
                handlePress={handleNotesPress}
                />
                <ElectroIcon 
                name="settings"
                size={30}
                color={secondaryColor}
                handlePress={handleSettingsPress}
                />
            </View>
        )
    });
  
    const {source, name} = generatePdf(bookName);

    useEffect(() => {
        useBookInfo(bookName).then(data => {
            setPdfPg(data.page);
        });
        setBookName(bookName);
    }, []);

    return (
        <View style={{flex: 1}}>
            <Stack.Screen
                    options={{
                        headerTitleAlign: 'center',
                        headerStyle: [styles.headerStyle, {backgroundColor: primaryColor}],
                        headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                        headerTitle: name,
                        headerShown: headerVisible,
                        headerRight: headerRightIcons,
                        headerLeft: backIcon,
                        headerBackVisible: false,
                    }}
                />
            <ElectroPdf 
                source={source} 
                onSingleTap={handleSinglePress} 
                onPageChange={handlePageChange}
                page={pdfPg}/>
            <ElectroNotesSideBar 
                visible={notesVisible} 
                handleNotesClose={handleNotesPress}
                settingsToggle={handleSettingsPress}/>
            <ElectroSettingsSideBar
                visible={settingsVisible}
                handleSettingsClose={handleSettingsPress}
                notesToggle={handleNotesPress}
                handleColorPress={handleColorPress}
                handleSinglePage={handleSinglePage}
            />
        </View>
    );
};