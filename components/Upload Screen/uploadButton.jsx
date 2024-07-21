// React
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_book, check_duplicate } from "../../app/backend/controller";

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

    const checkDuplicate = async () => {
        const check = await check_duplicate(info.name);
        return check;
    };

    const createBook = (check) => {
        if (check == "duplicate") {
            setUploadAlertText("That file already exists!");
            setTimeout(() => setUploadAlertText(""), 2000);
            setUploadPressed(false);
        } else if (check == "safe") {
            create_book(info).then(creation => {
                if (creation != "canceled") {
                    setClear(true);
                };
            });
            setUploadPressed(false);
            setClear(false); 
        };        
    };
    
    useEffect(() => {
        if (uploadPressed == true) {
            if (info.library != "" && info.library != undefined) {
                let check = ""
                checkDuplicate().then(data => check = data);
                setTimeout(() => createBook(check), 1000);
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
            <Text style={[styles.uploadScreenButtonText, {color: secondaryColor}]}>Upload</Text>
        </TouchableOpacity>
    );
};
