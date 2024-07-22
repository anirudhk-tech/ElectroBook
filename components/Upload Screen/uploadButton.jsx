// React
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_book } from "../../app/backend/controller";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useRefreshInfo } from "../../hooks/useRefreshInfo";
import { useColor } from "../../hooks/useTheme";
import { useInfo } from "../../hooks/useInfoFunctions";
import { useUploadAlert } from "../../hooks/useUploadAlert";

export const ElectroUploadButton = () => {
    const {refresh, setRefresh} = useRefreshInfo();
    const {secondaryColor} = useColor();
    const {setUploadAlertText} = useUploadAlert();
    const info = useInfo("info");
    const clearValues = useInfo("infoClear");
    const [uploadPressed, setUploadPressed] = useState(false);
    const [clear, setClear] = useState(false);
        
    const handleUploadPress = () => {
        setRefresh(!refresh);
        setUploadPressed(true);
    };
    
    useEffect(() => {
        if (uploadPressed == true) {
            if (info.library != "" && info.library != undefined) {
                let duplicateStatus = "";
                create_book(info).then(data => duplicateStatus = data);
                setTimeout(() => {
                    if (duplicateStatus == "duplicate") {
                        setUploadAlertText("A file with that name already exists!");
                        setTimeout(() => setUploadAlertText(""), 2000);
                        setUploadPressed(false);
                    } else {
                        setClear(true);
                        setUploadPressed(false);
                        setTimeout(() => setClear(false), 200);
                    };
                }, 2000);
            } else {
                setUploadAlertText("A library is required!");
                setTimeout(() => setUploadAlertText(""), 2000);
                setUploadPressed(false);
            };
        };
    }, [info]);

    useEffect(() => {
        if (clear == true) {
            clearValues();
        };
    }, [clear]);

    return (
        <TouchableOpacity
        style={[styles.uploadScreenButtonTouchable, {borderColor: secondaryColor}]}
        onPress={handleUploadPress}
        >
            <Animatable.Text 
            animation={"bounceIn"}
            useNativeDriver={true}
            style={[styles.uploadScreenButtonText, {color: secondaryColor}]}>Upload</Animatable.Text>
        </TouchableOpacity>
    );
};
