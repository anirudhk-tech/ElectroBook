// React
import { TouchableOpacity, View, Text, Dimensions, Image } from "react-native";

// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";
import { useEffect, useState } from "react";


// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookCardPress } from "../../hooks/useLibraryCardPress";
import { useImageKey } from "../../hooks/useImageKey";


// Same styles as library card rows
export const ElectroBookRowCard = (props) => {
    const { primaryColor, secondaryColor } = useColor();
    const { imageKey } = useImageKey();
    const [bookInfo, setBookInfo] = useState([]);
    const windowHeight = Dimensions.get("window").height;
    const handleCardPress = useBookCardPress().press;

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setBookInfo(data));
    }, [imageKey]);

    return (
        <TouchableOpacity 
            style={[styles.libraryCardRowMainTouchable, {borderColor: primaryColor, backgroundColor: primaryColor, height: windowHeight/2}]}
            onPress={() => handleCardPress(props.bookName)}>
            <View style={[styles.bookCardRowHeaderView, {backgroundColor: secondaryColor}]}>
                <Text style={[styles.bookCardRowPageText, {color: primaryColor}]}>On Pg. {bookInfo.page}</Text>
                <ElectroIcon 
                    name="book"
                    color={props.bookColor == "" || props.bookColor == "undefined" ? secondaryColor : props.bookColor}
                    size={40}
                    handlePress={() => {}}
                />
            </View>
            <View style={{flex: 6}}>
                <Image 
                    key={imageKey}
                    style={{display: bookInfo.imageUri == "" || bookInfo.imageUri == undefined ? "none" : "flex"}} 
                    source={{uri: bookInfo.imageUri + '?' + Date.now(), height: '100%', width: '100%'}}
                    />
            </View>
            <Text style={[styles.bookCardRowText, {color: primaryColor, backgroundColor: secondaryColor}]} numberOfLines={3}>{props.bookName}</Text>
        </TouchableOpacity>
    );
};