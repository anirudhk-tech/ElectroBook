// React
import { View } from "react-native";
import { useState, useContext, useCallback, memo } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from "../../constants/context";

// Components
import { ElectroAlert } from '../../components/alert';
import { ElectroPdf } from "../../components/pdf";
import { NotesSideBar } from "../../components/notesSideBar";

// Expo
import { router } from "expo-router";

// Hooks
import { useColor } from "../../hooks/useTheme";

export default function readingTestScreen () {
    const [testBegin, setTestBegin] = useState(false);
    const [notesVisible, setNotesVisible] = useState(false); 
    const [finishAlertVisible, setFinishAlertVisible] = useState('none');
    const [bgColor, setBgColor] = useState("white");
    const {secondaryColor} = useColor();
    const colors = ['black', secondaryColor, 'white'];

    const handleCancelPress = useCallback(() => {
        router.navigate("./libraryScreen")
    }, []);

    const handleOkayPress = useCallback(() => {
        setTestBegin(true);
    }, []);

    const handleSingleTap = useCallback(() => {
        setNotesVisible(false);
        setFinishAlertVisible('flex');
    }, []);

    const handleDoubleTap = () => {
        setNotesVisible(!notesVisible);
    };

    const handleTripleTap = () => {
        let newColorPos = colors.indexOf(bgColor)+1;
        if (newColorPos == 3) {
            newColorPos = 0;
        };
        const newColor = colors[newColorPos]
        if (newColor == bgColor) {
            setBgColor("white");
        } else {
            setBgColor(newColor);
        }};

    const handleEndPress = useCallback(() => {
        router.navigate('./libraryScreen');
        setFinishAlertVisible('none');
    }, []);

    if (testBegin == true) {
        return (
            <View>
                <View style={styles.readingScreenMainView}>
                    <ElectroPdf 
                        readingTest={true} 
                        tripleTap={handleTripleTap}
                        doubleTap={handleDoubleTap}
                        singleTap={handleSingleTap}
                        bgColor={bgColor}/>
                    <NotesSideBar 
                        visible={notesVisible}
                        tripleTap={handleTripleTap}
                        doubleTap={handleDoubleTap}
                        singleTap={handleSingleTap}/>
                </View>
            <ElectroAlert
                display={finishAlertVisible}
                title="Completed!"
                positiveButton="End"
                positivePress={handleEndPress}
            />
            </View>
        );
    } else {
        return (     
            <View style={[styles.readingScreenAlertView, {backgroundColor: secondaryColor}]}>     
                <ElectroAlert
                    title="Reading Test"
                    message={['The reading test will begin when you tap "Okay"', 'Simply tap the screen when you are finished reading.', 'Make sure to read at a comfortable pace!']}
                    negativeButton="Cancel"
                    positiveButton="Okay"
                    negativePress={handleCancelPress}
                    positivePress={handleOkayPress}
                /> 
            </View> 
        )};
};