// React
import { View, TouchableOpacity, Text } from "react-native"
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroIcon } from "../General/icon";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useBookUpdate } from "../../hooks/useBookUpdate";


export const ElectroCompleteButton = (props) => {
    const [completed, setCompleted] = useState(false);
    const [info, setInfo] = useState("");
    const {primaryColor, secondaryColor} = useColor();

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setInfo(data));
    }, []);

    useEffect(() => {
        if (info.completed != undefined && info.completed != "") {
            if (info.completed != "false") {
                setCompleted(true);
            } else {
                setCompleted(false);
            };
        };
    }, [info]);

    const handlePress = () => {
        if (completed == true) {
            useBookUpdate("completed", props.bookName, "false");
            setCompleted(false);
        } else {
            useBookUpdate("completed", props.bookName, "true");
            setCompleted(true);
        };
    };

    return (
        <TouchableOpacity
        style={[styles.booksScreenCompleteTouchable, {backgroundColor: completed ? primaryColor : secondaryColor, borderColor: primaryColor}]}
        onPress={handlePress}
        >
            <Text style={[styles.booksScreenCompleteText, {color: primaryColor, display: completed ? "none" : "flex"}]}>Not Complete</Text>
            <ElectroIcon 
            name="checkmark-done"
            size={30}
            color={secondaryColor}
            handlePress={handlePress}
            style={{display: completed ? "flex" : "none"}}
            />
        </TouchableOpacity>
  );
};

