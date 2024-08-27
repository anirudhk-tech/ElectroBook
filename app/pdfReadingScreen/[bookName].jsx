// Components
import { ElectroPdf } from "../../components/Reading Screen/pdf"

// React
import { View, Text, BackHandler } from "react-native";
import { useState, useCallback, useRef, useEffect } from "react";

// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';

// Backend
import { styles } from "../../constants/stylers";
import { fetch_recents } from "../backend/controller";

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
import { usePdf } from "../../hooks/usePdf";
import { useOrientation, useOrientationSignal } from "../../hooks/useOrientation";
import { useRecents } from "../../hooks/useRecents";


export default function pdfScreen () {
    const { bookName } = useLocalSearchParams();
    const { setBookName } = useBookName();
    const { setHeadToPage } = usePdf();
    const { primaryColor, secondaryColor } = useColor();
    const { setEditRefreshPage } = useEditRefresh();
    const { orient, setOrient } = useOrientation();
    const { setOrientSignal } = useOrientationSignal();
    const { setRecentsRefresh } = useRecents();
    const [headerVisible, setHeaderVisible] = useState(true);
    const [notesVisible, setNotesVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [pdfPg, setPdfPg] = useState(0);
    const page = useRef();

    const handleSinglePress = () => {
        if (notesVisible || settingsVisible) {
            setNotesVisible(false);
            setSettingsVisible(false);
        } else {
            setHeaderVisible(!headerVisible);
        };
    };

    const handleNotesPress = () => {
        if (notesVisible == false && settingsVisible == true) {
            setSettingsVisible(!settingsVisible);
            setNotesVisible(!notesVisible);
        } else {
            setNotesVisible(!notesVisible);
        };
    };

    const handleSettingsPress = () => {
        if (notesVisible == true && settingsVisible == false) {
            setSettingsVisible(!settingsVisible);
            setNotesVisible(!notesVisible);
        } else {
            setSettingsVisible(!settingsVisible);
        };
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

    const handleRotatePress = () => {
        if (orient == "potraitUp") {
            setOrient("landscapeRight");
            setOrientSignal();
        } else {
            setOrient("potraitUp");
            setOrientSignal();
        };

        if (notesVisible) {
            setNotesVisible(false);
            setTimeout(() => {
                setNotesVisible(true);
            }, 250);
        };

        if (settingsVisible) {
            setSettingsVisible(false);
            setTimeout(() => {
                setSettingsVisible(true);
            }, 250);
        };
    };

    const updatePage = () => {
        useBookUpdate("page", bookName, page.current);
        setEditRefreshPage();
        router.dismiss();
        setHeadToPage(null);
    };

    const backAction = async () => {
        setOrientSignal();
        updatePage();
        return true 
    };

    const backIcon = () => {
        return (
            <ElectroIcon 
            name="arrow-back"
            size={30}
            color={secondaryColor}
            handlePress={backAction}
            />
        );
    };

    const headerRightIcons = () => {
        return (
            <View style={{flexDirection: 'row', gap: 10, width: '40%'}}>
                <ElectroIcon
                name="git-compare"
                size={30}
                color={secondaryColor}
                handlePress={handleRotatePress}
                />
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
    };

    const setOrientation = async () => {
        if (orient == "potraitUp") {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        };
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => {
            setPdfPg(data.page);
        });
        setBookName(bookName);
        fetch_recents(bookName);
        setTimeout(() => {
            setRecentsRefresh();
        }, 2000);
    }, []);

    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => handler.remove();
    }, []);

    useEffect(() => {
        setOrientation();
    }, [orient]); 

    return (
        <View style={{flex: 1}}>
            <Stack.Screen
                    options={{
                        headerTitleAlign: 'left',
                        headerStyle: [styles.headerStyle, {backgroundColor: primaryColor}],
                        headerTitle: () => (
                            <Text 
                            style={{
                                color: secondaryColor,
                                fontSize: 20,
                                fontWeight: 'bold',
                                width: '70%',
                                marginLeft: '7%'
                                }}
                            numberOfLines={1}
                            >{bookName}</Text>
                        ),                        
                        headerShown: headerVisible,
                        headerRight: headerRightIcons,
                        headerLeft: backIcon,
                        headerBackVisible: false,
                    }}
                />
            <ElectroPdf 
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