// React
import { TouchableOpacity, TextInput, Text, Keyboard } from "react-native";
import { useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { usePdf } from "../../hooks/usePdf";


export const ElectroPageInputButton = (props) => {
    const { primaryColor } = useColor();
    const { setHeadToPage } = usePdf();
    const [inputActive, setInputActive] = useState(false);
    const [pageNumber, setPageNumber] = useState(null);

    const handleSubmit = () => {
        setInputActive(false);
        props.handleHeadToPage();
        if (typeof parseInt(pageNumber) == 'number') {
            setHeadToPage(parseInt(pageNumber));
        };
    };

    const handlePress = () => {
        setInputActive(true);
    };

    const handleChangeText = (e) => {
        setPageNumber(e);
    };

    const handleBlur = () => {
        try {
          textInputField.blur()
        } catch {
            return
        };
      };


    if (!inputActive) {
        return (
            <TouchableOpacity 
                style={[styles.settingsSideBarButton, { borderColor: primaryColor }]}
                onPress={handlePress}
            >
                <Text style={[styles.settingsSideBarInputText, { color: primaryColor }]}>To Page...</Text>
            </TouchableOpacity>
        );
    } else {        
        Keyboard.addListener(
            'keyboardDidHide', 
            handleBlur
          );

        return (
            <TextInput 
            style={[styles.settingsSideBarButton, { borderColor: primaryColor, color: primaryColor }]}
            autoFocus={true}
            onChangeText={(e) => handleChangeText(e)}
            onBlur={handleSubmit}
            keyboardType="numeric"
            ref={input => textInputField = input}
            />
        );
    };
};