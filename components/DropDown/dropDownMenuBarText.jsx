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
    const [inputOption, setInputOption] = useState(null);
    const [oldInputOption, setOldInputOption] = useState("");
    const [primaryColor, secondaryColor] = useColor();

    const handleSubmit = () => {
        if (inputOption == "") {
            setInputOption(null);
            setEditing(false);
            return
        };
        if (oldInputOption == "") { 
            useUpdate(props.type, props.option, inputOption);
        } else {
            useUpdate(props.type, oldInputOption, inputOption);
        };
        setEditing(false);
        setOldInputOption(inputOption);
    };

    if (!editing) {
        return (
        <View style={styles.dropDownBarTextTouchable}>
            <Text
                style={[styles.dropDownBarText, { color: primaryColor }]}
                numberOfLines={1}
            >
                {inputOption == null ? props.option : inputOption}
            </Text>
            <TouchableOpacity
            style={[
                styles.dropDownMenuBarActionsTouchable,
                { backgroundColor: primaryColor },
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
          <TextInput 
            style={[styles.dropDownBarText, { color: primaryColor, flex: 10 }]}
            autoFocus={true}
            defaultValue={inputOption == null ? props.option : inputOption}
            onChangeText={(e) => setInputOption(e)}
            onBlur={handleSubmit}
          />
        )
      }
}