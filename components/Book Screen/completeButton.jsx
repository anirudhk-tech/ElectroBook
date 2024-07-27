// React
import { Text } from "react-native"
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useBookName } from "../../hooks/useBookName";
import { useEditRefresh } from "../../hooks/useEdit";
import { useProgressBarAnimation } from "../../hooks/useAnimation";


export const ElectroCompleteButton = () => {
    const [completed, setCompleted] = useState(false);
    const [info, setInfo] = useState("");
    const { primaryColor, secondaryColor } = useColor();
    const { bookName } = useBookName();
    const { editRefreshCompleted, editRefreshPage } = useEditRefresh();

    const handleCompletedTrue = () => {
        setCompleted(true);
    };

    const handleCompletedFalse = () => {
        setCompleted(false);
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setInfo(data));
    }, [editRefreshCompleted, editRefreshPage]);

    useEffect(() => {
        if (info != null) {
            if (info.completed != undefined && info.completed != "") {
                if (info.completed != "false") {
                    setTimeout(handleCompletedTrue, 1000)
                } else {
                    setTimeout(handleCompletedFalse, 1000)
                };
            }
        };
    }, [info]);

    return (
        <Animatable.View
        animation={completed ? "bounceIn" : "pulse"}
        useNativeDriver={true}
        style={[styles.booksScreenCompleteTouchable, {backgroundColor: completed ? primaryColor : undefined, borderColor: primaryColor}]}
        >
            <Text style={[styles.booksScreenCompleteText, {color: primaryColor, display: completed ? "none" : "flex"}]}>Not Complete</Text>
            <ElectroIcon 
            name="checkmark-done"
            size={30}
            color={secondaryColor}
            style={{display: completed ? "flex" : "none"}}
            />
        </Animatable.View>
  );
};

