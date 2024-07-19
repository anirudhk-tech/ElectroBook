// React
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_book } from "../../app/backend/controller";

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

    const handleUploadPress = () => {
        setRefresh(!refresh);
        setUploadPressed(true);
    };
    

    useEffect(() => {
        if (info.name != "" && info.library != "") {
            if (uploadPressed == true) {
                create_book(info);
                clearValues();
            };
        };
    }, [info]); 

    return (
        <TouchableOpacity
        style={[styles.uploadScreenButtonTouchable, {borderColor: secondaryColor}]}
        onPress={handleUploadPress}
        >
        <Text style={[styles.uploadScreenButtonText, {color: secondaryColor}]}>Upload</Text>
        </TouchableOpacity>
    );
};
