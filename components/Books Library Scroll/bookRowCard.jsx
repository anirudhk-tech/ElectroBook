// React
import { TouchableOpacity, View, Text, Dimensions, Image } from "react-native";

// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";
import { useEffect, useState } from "react";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookCardPress } from "../../hooks/useLibraryCardPress";
import { useImageKey } from "../../hooks/useImageKey";
import { useEditRefresh } from "../../hooks/useEdit";


// Same styles as library card rows
export const ElectroBookRowCard = (props) => {
    const { primaryColor, secondaryColor } = useColor();
    const { imageKey } = useImageKey();
    const { editRefreshPage } = useEditRefresh();
    const handleCardPress = useBookCardPress().press;
    const [pressed, setPressed] = useState(false);
    const [bookInfo, setBookInfo] = useState([]);
    const [recents, setRecents] = useState([]);
    
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setBookInfo(data));
    }, [imageKey, editRefreshPage]);

    return (
        <Animatable.View
        animation={"bounceIn"}
        useNativeDriver={true}
        >
            <TouchableOpacity 
                disabled={pressed}
                style={[styles.libraryCardRowMainTouchable, {borderColor: primaryColor, backgroundColor: primaryColor, height: windowHeight/2}]}
                onPress={() => {
                    handleCardPress(props.bookName);
                    setPressed(true);
                    setTimeout(() => {
                        setPressed(false);
                    }, 1000);
                }}>
                <View style={[styles.bookCardRowHeaderView, {backgroundColor: secondaryColor}]}>
                    <Text style={[styles.bookCardRowPageText, {color: primaryColor}]}>On Pg. {bookInfo.page}</Text>
                    <ElectroIcon 
                        name="book"
                        color={bookInfo.color == "" || bookInfo.color == undefined ? secondaryColor : bookInfo.color}
                        size={40}
                    />
                </View>
                <View style={{flex: 6}}>
                    {
                        !!bookInfo.imageUri && bookInfo.imageUri != "" ? (
                        <Image 
                            key={imageKey}
                            style={{display: bookInfo.imageUri == "" || bookInfo.imageUri == undefined ? "none" : "flex"}} 
                            source={{uri: bookInfo.imageUri + '?' + Date.now(), height: '100%', width: '100%'}}
                        />) : null
                    }
                </View>
                <Text style={[styles.bookCardRowText, {color: primaryColor, backgroundColor: secondaryColor}]} numberOfLines={3}>{props.bookName}</Text>
            </TouchableOpacity>
        </Animatable.View>
    );
};