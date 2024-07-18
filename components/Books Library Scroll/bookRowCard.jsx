// React
import { TouchableOpacity, View, Text, Dimensions } from "react-native";

// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";
import { useEffect, useState } from "react";


// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookCardPress } from "../../hooks/useLibraryCardPress";


// Same styles as library card rows

// INSERT IMAGE ONCE FILESYSTEM COMPLETE

export const ElectroBookRowCard = (props) => {
    const [primaryColor, secondaryColor] = useColor();
    const [page, setPage] = useState([]);
    const windowHeight = Dimensions.get("window").height;
    const [handleCardPress] = useBookCardPress();

    useEffect(() => {
        useBookInfo("page", props.bookName).then(number => setPage(number));
    }, []);


    return (
        <TouchableOpacity 
            style={[styles.libraryCardRowMainTouchable, {borderColor: primaryColor, backgroundColor: primaryColor, height: windowHeight/2}]}
            onPress={() => handleCardPress(props.bookName)}>
            <View style={[styles.bookCardRowHeaderView, {backgroundColor: secondaryColor}]}>
                <Text style={[styles.bookCardRowPageText, {color: primaryColor}]}>On Pg {page}</Text>
                <ElectroIcon 
                    name="book"
                    color={props.bookColor == "" ? secondaryColor : props.bookColor}
                    size={40}
                    handlePress={() => {}}
                />
            </View>
            <View style={{flex: 6}}>
                {
                /*/Add Image Here /*/
                }
            </View>
            <Text style={[styles.bookCardRowText, {color: primaryColor, backgroundColor: secondaryColor}]} numberOfLines={3}>{props.bookName}</Text>
        </TouchableOpacity>
    );
};