// React
import { Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";
import { update_bookFile } from "../../app/backend/controller";
import * as FileSystem from "expo-file-system";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useEditRefresh } from "../../hooks/useEdit";
import { useColor } from "../../hooks/useTheme";
import { useBookName } from "../../hooks/useBookName";
import { useBookUpdate } from "../../hooks/useBookUpdate";
import { useImageKey } from "../../hooks/useImageKey";
import { useDelete } from "../../hooks/useDelete";

export const ElectroSeriesImageHeader = () => {
    const [series, setSeries] = useState([]);
    const [imageUri, setImageUri] = useState(null);
    const [bookInfo, setBookInfo] = useState([]);
    const { editRefreshSeries, setEditRefreshSeries } = useEditRefresh();
    const { imageKey, setImageKey } = useImageKey();
    const { primaryColor } = useColor();
    const { bookName } = useBookName();

    const handleImageUpdate = () => {
        useBookUpdate("image", bookName, `${FileSystem.documentDirectory}Images/${bookName}`);
        setImageKey();
    };

    const handleImagePress = () => {
        update_bookFile(bookName, handleImageUpdate);
    };

    const handleImageClear = () => {
        useBookUpdate("image", bookName, "");
        useDelete("image", bookName);
        setImageKey();
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefreshSeries, imageKey]);

    useEffect(() => {
        if (bookInfo != null) {
            if (bookInfo != null && bookInfo.series != undefined) {
                setSeries(bookInfo.series);
                setImageUri(bookInfo.imageUri);
            };
        } else {
            setEditRefreshSeries();
        }
    }, [bookInfo]);

    return (
        <View style={{flexDirection: 'row', gap: 20}}>
            <Text 
                style={[styles.booksScreenSeriesHeaderText, {color: primaryColor}]}
                numberOfLines={2}
            >{series == "" ? "Stand-Alone" : series}</Text>
            <ElectroIcon
                name="image"
                size={40}
                color={ primaryColor }
                handlePress={handleImagePress}
                style={{display: imageUri == undefined ? "none" : imageUri == "" ? "flex" : "none"}}
            />
            <TouchableOpacity 
            style={[styles.booksScreenSeriesHeaderImageTouchable, {display: imageUri == undefined ? "none" : imageUri == "" ? "none" : "flex"}]}
            onPress={handleImageClear}    
            >
                <Text style={[styles.booksScreenSeriesHeaderImageText, {color: primaryColor, borderColor: primaryColor}]}>Clear Image</Text>
            </TouchableOpacity>
        </View>
    )
};