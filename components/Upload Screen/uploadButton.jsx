// React
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState, useRef } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_book, check_duplicate } from "../../app/backend/controller";

// Hooks
import { useRefreshInfo } from "../../hooks/useRefreshInfo";
import { useColor } from "../../hooks/useTheme";
import { useInfo } from "../../hooks/useInfoFunctions";
import { useUploadPressed } from "../../hooks/useUploadStatus";

export const ElectroUploadButton = () => {
    const {refresh, setRefresh} = useRefreshInfo();
    const {secondaryColor} = useColor();
    const info = useInfo("info");
    const clearValues = useInfo("infoClear");
    const {uploadPressed, setUploadPressed} = useUploadPressed();

    const [clear, setClear] = useState(false);
    const check = useRef();
        
    const handleUploadPress = () => {
        setRefresh(!refresh);
    };

    const checkDuplicate = () => {
        check_duplicate(info.name).then(data => check.current = data);
    };

    const createBook = () => {
        create_book(info).then(creation => {
            if (creation != "canceled") {
                setClear(true);
            };
        });
        setUploadPressed(false);         
    };
    

    useEffect(() => {
        if (info.library != "") {
            checkDuplicate();
            setUploadPressed(true);
        }; 
    }, [info]); 

    useEffect(() => {
        if (uploadPressed == true) {
            if (check.current != "duplicate") {
                createBook();         
            } else {
                setUploadPressed(false);
            };
        };
    }, [uploadPressed]);

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
        <Text style={[styles.uploadScreenButtonText, {color: secondaryColor}]}>Upload</Text>
        </TouchableOpacity>
    );
};
