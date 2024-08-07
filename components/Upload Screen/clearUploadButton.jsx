// Backend
import { styles } from "../../constants/stylers";

// React
import { TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useInfo } from "../../hooks/useInfoFunctions";
import { useColor } from "../../hooks/useTheme";


export const ElectroClearUploadButton = () => {
    const { clearValues } = useInfo("clearInfo");
    const {secondaryColor} = useColor();
    const [pressed, setPressed] = useState(false);

    const handlePress = useCallback(() => {
        clearValues();
        setPressed(true);

        setTimeout(() => {
            setPressed(false);
        }, 2000);
    }, []);

    // Styles the same as upload button

    return (
        <TouchableOpacity
        style={[styles.uploadScreenButtonTouchable, {borderColor: secondaryColor}]}
        onPress={handlePress}
        >
            <Animatable.Text 
            animation={ pressed ? "swing" : "bounceIn" }
            useNativeDriver={true}
            style={[styles.uploadScreenButtonText, {color: secondaryColor, fontSize: pressed ? 30 : 20}]}>Clear</Animatable.Text>
        </TouchableOpacity>
    )

};