// Node Modules
import * as Animatable from "react-native-animatable";

// React
import { useState } from "react";
import { TextInput, Keyboard } from "react-native";

// Backend
import { styles } from "../../constants/stylers";
import { update_mainLibraryName} from "../../app/backend/controller";

// Components
import { ElectroButton } from "../General/button";

// Hooks
import { useColor } from "../../hooks/useTheme";


export const ElectroChangeLibraryNameButton = () => {
    const { primaryColor } = useColor();
    const [inputActive, setInputActive] = useState(false);
    const [inputText, setInputText] = useState("");

    const handlePress = () => {
        setInputActive(true);
    };

    const handleBlur = () => {
        try {
          textInputField.blur()
        } catch {
          return
        }
      };

    const handleSubmit = () => {
        update_mainLibraryName(inputText);
        setInputActive(false);
    };

    if (!inputActive) {
        return (
            <Animatable.View 
            animation={"bounceIn"}
            useNativeDriver={true}
            style={styles.settingsScreenButtonContainer}>
            <ElectroButton
                text="Change Library Name"
                touchableStyles={[
                styles.settingsScreenTouchable,
                { borderColor: primaryColor },
                ]}
                textStyles={[styles.buttonText, { color: primaryColor }]}
                action={handlePress}
            />
            </Animatable.View>
        );
    } else {

        Keyboard.addListener(
            'keyboardDidHide', 
            handleBlur
          );

        return (
            <Animatable.View 
            animation={"bounceIn"}
            useNativeDriver={true}
            style={styles.settingsScreenButtonContainer}>
                <TextInput 
                style={ [styles.settingsLibraryNameInput, { borderColor: primaryColor, color: primaryColor }]}
                autoFocus={true}
                onChangeText={(e) => setInputText(e)}
                onBlur={handleSubmit}
                ref={input => {textInputField = input}}
                />
            </Animatable.View>
        )
    }
};