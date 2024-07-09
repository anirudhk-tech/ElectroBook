// React
import { View } from "react-native";
import { useState, useContext, useCallback } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from "../../constants/context";

// Components
import { ElectroAlert } from '../../components/alert';
import { ElectroPdf } from "../../components/pdf";
import { NotesSideBar } from "../../components/notesSideBar";

// Expo
import { router } from "expo-router";



export default function readingTestScreen () {
    const [testBegin, setTestBegin] = useState(false);
    const [notesVisible, setNotesVisible] = useState(false); 
    const [finishAlertVisible, setFinishAlertVisible] = useState('none');
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;
    const secondaryColor = colorContext.secondaryColor;

    const handleCancelPress = useCallback(() => {
        router.push("./libraryScreen")
    }, []);

    const handleOkayPress = useCallback(() => {
        setTestBegin(true);
    }, []);

    const handleSingleTap = useCallback(() => {
        setFinishAlertVisible('flex');
        console.log(finishAlertVisible)
    }, []);

    const handleDoubleTap = () => {
        setNotesVisible(!notesVisible);
    };

    const handleEndPress = useCallback(() => {
        router.push('./libraryScreen');
    }, []);

    if (testBegin == true) {
        return (
            <View>
                <View style={styles.readingScreenMainView}>
                    <ElectroPdf 
                        readingTest={true} 
                        doubleTap={handleDoubleTap}
                        singleTap={handleSingleTap}/>
                    <NotesSideBar 
                        visible={notesVisible}
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
                    message={['The reading test will begin when you tap "Okay"', 'Simply triple tap the screen when you are finished reading.', 'Make sure to read at a comfortable pace!']}
                    negativeButton="Cancel"
                    positiveButton="Okay"
                    negativePress={handleCancelPress}
                    positivePress={handleOkayPress}
                /> 
            </View> 
        );
    };
};