// React
import { TouchableOpacity, Text } from "react-native";
import { useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { create_book } from "../../app/backend/controller";

// Hooks
import { useRefreshInfo } from "../../hooks/useRefreshInfo";
import { useColor } from "../../hooks/useTheme";
import { useInfo } from "../../hooks/useInfoFunctions";

export const ElectroUploadButton = () => {
    const {refreshKey, setRefreshKey} = useRefreshInfo();
    const {secondaryColor} = useColor();
    const info = useInfo("info");
    const clearValues = useInfo("infoClear");

    useEffect(() => {
        if (info.name != "") {
            if (info.length != 0) {
                create_book(info);  // Book creating when logging out -> Clear Values at log out.
                clearValues();
            }
        }
    }, [info]); 

    return (
        <TouchableOpacity
        style={[styles.uploadScreenButtonTouchable, {borderColor: secondaryColor}]}
        onPress={() => {
            setRefreshKey(!refreshKey);
        }}
        >
        <Text style={[styles.uploadScreenButtonText, {color: secondaryColor}]}>Upload</Text>
        </TouchableOpacity>
    );
};
