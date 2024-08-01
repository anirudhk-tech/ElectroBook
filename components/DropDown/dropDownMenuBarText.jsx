// React
import { useState } from "react";
import { TouchableOpacity, Text, TextInput, View, Keyboard } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useUpdate } from "../../hooks/useUpdate";
import { useEditData } from "../../hooks/useEdit";


export const ElectroMenuText = (props) => {
    const [editing, setEditing] = useState(false);
    const [inputOption, setInputOption] = useState(null);
    const [oldInputOption, setOldInputOption] = useState("");
    const { data, setData } = useEditData();
    const { primaryColor, secondaryColor } = useColor();

    const replaceEditText = (editedInputOption) => {
        const editableData = data;
        const index = editableData.indexOf(props.option);
        editableData[index] = editedInputOption;
        setData(editableData);
    };

    const handleTextPress = () => {
        props.handleTextPress(props.option);
    };

    const handleSubmit = async () => {
        if (inputOption == "" || inputOption == null) {
            setInputOption(null);
            setEditing(false);
            return
        };
        
        if (oldInputOption == "") { 
            const editedInputOption = inputOption.replaceAll('"', "'").replaceAll(",", ";");
            const result = await useUpdate(props.type, props.option, editedInputOption);

            replaceEditText(editedInputOption);

            if (result == "duplicate") {
                setInputOption(props.option);
                setOldInputOption(props.option);
                setEditing(false);
            } else {
                setOldInputOption(editedInputOption);
                setEditing(false);
            };
        } else {
            const editedInputOption = inputOption.replaceAll('"', "'").replaceAll(",", ";");
            const editedOldInputOption = oldInputOption.replaceAll('"', "'").replaceAll(",", ";");

            const result = await useUpdate(props.type, editedOldInputOption, editedInputOption);

            if (result == "duplicate") {
                setInputOption(editedOldInputOption);
                setEditing(false);
            } else {
                setOldInputOption(editedInputOption);
                setEditing(false);
            };
        };
    };

    const handleBlur = () => {
        try {
          textInputField.blur()
        } catch {
            return
        };
      };

    if (!editing) {
        return (
        <View style={styles.dropDownBarMenuTextTouchable}>
            <TouchableOpacity 
                style={{flex: 9}}
                onPress={handleTextPress}>
                <Text
                    style={[styles.dropDownBarText, { color: primaryColor, paddingLeft: 60 }]}
                    numberOfLines={1}
                >
                    {inputOption == null ? props.option : inputOption}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[
                styles.dropDownMenuTextEditIconTouchable,
                { backgroundColor: primaryColor, borderRightColor: secondaryColor, borderLeftColor: primaryColor, borderTopColor: primaryColor, borderBottomColor: primaryColor },
            ]}
            onPress={() => setEditing(true)}
            >
            <ElectroIcon
                name="create"
                size={20}
                color={secondaryColor}
                handlePress={() => setEditing(true)}
            />
            </TouchableOpacity>
        </View>
        );
      } else {
            Keyboard.addListener(
                'keyboardDidHide', 
                handleBlur
            );

            return (
                <View style={styles.dropDownBarMenuTextTouchable}>
                <TextInput 
                    style={[styles.dropDownBarText, { color: primaryColor, flex: 10 }]}
                    autoFocus={true}
                    defaultValue={inputOption == null ? props.option : inputOption}
                    onChangeText={(e) => setInputOption(e)}
                    onBlur={handleSubmit}
                    ref={input => {textInputField = input}}
                />
                    <TouchableOpacity
                    style={[
                        styles.dropDownMenuTextEditIconTouchable,
                        { backgroundColor: primaryColor, borderRightColor: secondaryColor, borderLeftColor: primaryColor, borderTopColor: primaryColor, borderBottomColor: primaryColor },
                    ]}
                    onPress={() => setEditing(!editing)}
                    >
                    <ElectroIcon
                        name="create"
                        size={20}
                        color={secondaryColor}
                        handlePress={() => setEditing(!editing)}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }