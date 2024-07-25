// React
import { TouchableOpacity, View, Text, Dimensions } from "react-native";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBooksInLibrary } from "../../hooks/useBookInLibrary";
import { useLibraryCardPress } from "../../hooks/useLibraryCardPress";

// Backend
import { styles } from "../../constants/stylers";
import { useEffect, useState } from "react";



export const ElectroLibraryRowCard = (props) => {
    const {primaryColor, secondaryColor} = useColor();
    const [bookCount, setBookCount] = useState(0);
    const cardPress = useLibraryCardPress().press;
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useBooksInLibrary(props.libraryName).then(data => setBookCount(data.length));
    }, []);

   

    return (
            <TouchableOpacity 
                style={[styles.libraryCardRowMainTouchable, {borderColor: primaryColor, backgroundColor: primaryColor, height: windowHeight/2}]}
                onPress={() => cardPress(props.libraryName)}>
                <View style={[styles.libraryCardRowHeaderView, {backgroundColor: secondaryColor}]}>
                    <Text style={[styles.libraryCardBookCountText, {color: primaryColor}]}>{bookCount}</Text>
                    <ElectroIcon 
                        name="folder"
                        color={props.libraryColor == "" ? secondaryColor : props.libraryColor}
                        size={40}
                        handlePress={() => {}}
                    />
                </View>
                <Text style={[styles.libraryCardRowText, {color: secondaryColor, paddingBottom: windowHeight/10}]}>{props.libraryName}</Text>
            </TouchableOpacity>
    );
};