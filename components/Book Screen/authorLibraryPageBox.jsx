// React
import { View, Text, Dimensions, LogBox, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroSeriesHeader } from "../../components/Book Screen/seriesHeader";

// Expo
import { router } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useEditRefresh, useEditType } from "../../hooks/useEdit";

export const ElectroAuthorLibraryPageBox = (props) => {
    const [bookInfo, setBookInfo] = useState([]);
    const [author, setAuthor] = useState("");
    const [page, setPage] = useState(0);
    const [library, setLibrary] = useState("");
    const {primaryColor, secondaryColor} = useColor();
    const {setType} = useEditType();
    const {editRefresh} = useEditRefresh();
    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;
    const bookName = props.bookName;

    const handleAuthorPress = () => {
        setType("author");
        router.push(`../bookEditDropScreen/${bookName}`);
    };

    const handleLibraryPress = () => {
        setType("library");
        router.push(`../bookEditDropScreen/${bookName}`);
    };

    const handleSeriesPress = () => {
        setType("series");
        router.push(`../bookEditDropScreen/${bookName}`);
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefresh]);

    useEffect(() => {
        if (bookInfo.author != undefined && bookInfo.author != null) {
            setAuthor(bookInfo.author);
        };

        if (bookInfo.library != undefined && bookInfo.library != null) {
            setLibrary(bookInfo.library)
        };

        if (bookInfo.page != undefined && bookInfo.page != null) {
            setPage(bookInfo.page);
        };

    }, [bookInfo]);

    return (
        <Animatable.View 
        animation={"fadeIn"}
        useNativeDriver={true}
        style={[styles.authorLibraryPageBoxMainView, {height: windowHeight / 3}]}>
            <TouchableOpacity onPress={handleSeriesPress}>
                <ElectroSeriesHeader bookName={bookName}/>
            </TouchableOpacity>
            <View style={styles.authorLibraryPageBoxSubView}>
                <TouchableOpacity style={styles.libraryBooksScreenTouchable} onPress={handleLibraryPress}>
                    <ElectroIcon
                    name="library"
                    size={20}
                    color={primaryColor}
                    />
                    <View style={styles.authorLibraryPageBoxDetailsView}>
                        <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>Library |</Text>
                        <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: library == "" ? undefined : primaryColor, maxWidth: windowWidth / 2.8}]} numberOfLines={1}>{library}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.authorLibraryPageBoxSubView}>
                <TouchableOpacity style={styles.libraryBooksScreenTouchable} onPress={handleAuthorPress}>
                    <ElectroIcon
                    name="person"
                    size={20}
                    color={primaryColor}
                    />
                    <View style={styles.authorLibraryPageBoxDetailsView}>
                        <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>Author |</Text>
                        <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: author == "" ? null : primaryColor, maxWidth: windowWidth / 2.8}]} numberOfLines={1}>{author}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.authorLibraryPageBoxSubView}>
                <ElectroIcon
                name="bookmark"
                size={20}
                color={primaryColor}
                />
                <View style={styles.authorLibraryPageBoxDetailsView}>
                    <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>On Page |</Text>
                    <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: primaryColor, maxWidth: windowWidth / 2.8}]} numberOfLines={1}>{page}</Text>
                </View>
            </View>
        </Animatable.View>
    );
};