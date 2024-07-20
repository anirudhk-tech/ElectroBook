// React
import { useState } from "react";
import { TouchableOpacity, Text, TextInput, View } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useUpdate } from "../../hooks/useUpdate";


export const ElectroMenuText = (props) => {
    const [editing, setEditing] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    const [inputOption, setInputOption] = useState(null);
    const [oldInputOption, setOldInputOption] = useState("");
    const {primaryColor, secondaryColor} = useColor();

    const handleSubmit = async () => {
        if (inputOption == "") {
            setInputOption(null);
            setEditing(false);
            return
        };
        if (oldInputOption == "") { 
            const result = await useUpdate(props.type, props.option, inputOption);
            if (result == "duplicate") {
                setInputOption(props.option);
                setOldInputOption(props.option);
                setEditing(false);
            } else {
                setOldInputOption(inputOption);
                setEditing(false);
            };
        } else {
            const result = await useUpdate(props.type, oldInputOption, inputOption);
            if (result == "duplicate") {
                setInputOption(oldInputOption);
                setEditing(false);
            } else {
                setOldInputOption(inputOption);
                setEditing(false);
            }
        };
    };

    if (!editing) {
        return (
        <View style={styles.dropDownBarMenuTextTouchable}>
            <Text
                style={[styles.dropDownBarText, { color: primaryColor }]}
                numberOfLines={1}
            >
                {inputOption == null ? props.option : inputOption}
            </Text>
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
        return (
        <View style={styles.dropDownBarMenuTextTouchable}>
          <TextInput 
            style={[styles.dropDownBarText, { color: primaryColor, flex: 10 }]}
            autoFocus={true}
            defaultValue={inputOption == null ? props.option : inputOption}
            onChangeText={(e) => setInputOption(e)}
            onBlur={handleSubmit}
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