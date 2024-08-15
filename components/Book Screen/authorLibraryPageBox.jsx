// React
import { View, Text, Dimensions, LogBox, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroSeriesImageHeader } from "./seriesImageHeader";

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
import { useBookName } from "../../hooks/useBookName";

export const ElectroAuthorLibraryPageBox = () => {
    const [bookInfo, setBookInfo] = useState([]);
    const [pressed, setPressed] = useState(false);
    const [author, setAuthor] = useState("");
    const [page, setPage] = useState(0);
    const [library, setLibrary] = useState("");
    const { primaryColor, secondaryColor } = useColor();
    const { bookName } = useBookName();
    const { setType } = useEditType();
    const { 
        editRefreshAuthor, 
        setEditRefreshAuthor,
        editRefreshLibrary,
        setEditRefreshLibrary,
        editRefreshPage,
        setEditRefreshPage,
    } = useEditRefresh();

    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;

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

    const refresh = () => {
        setEditRefreshAuthor();
        setEditRefreshLibrary();
        setEditRefreshPage();
    };

    const fetchInfo = () => {
        if (bookInfo.author != undefined && bookInfo.author != null) {
            setAuthor(bookInfo.author);
        };

        if (bookInfo.library != undefined && bookInfo.library != null) {
            setLibrary(bookInfo.library)
        };

        if (bookInfo.page != undefined && bookInfo.page != null) {
            setPage(bookInfo.page);
        };
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefreshAuthor, editRefreshLibrary, editRefreshPage]);

    useEffect(() => {
        if (bookInfo != null) {
            if (bookInfo.length != 0) {
                fetchInfo();
            } else {
                refresh();
            };
        };
    }, [bookInfo]);

    return (
        <Animatable.View 
        animation={"fadeIn"}
        useNativeDriver={true}
        style={[styles.authorLibraryPageBoxMainView, {height: windowHeight / 6}]}>
            <TouchableOpacity onPress={() => {
                handleSeriesPress()
                setPressed(true);
                setTimeout(() => {
                    setPressed(false);
                }, 1000);
            }}>
                <ElectroSeriesImageHeader/>
            </TouchableOpacity>
            <View style={styles.authorLibraryPageBoxSubView}>
                <TouchableOpacity 
                    style={styles.libraryBooksScreenTouchable} 
                    onPress={() => {
                        handleLibraryPress();
                        setPressed(true);
                        setTimeout(() => {
                            setPressed(false);
                        }, 1000);    
                    }}
                    disabled={pressed}
                >
                    <ElectroIcon
                    name="library"
                    size={20}
                    color={ primaryColor }
                    />
                    <View style={styles.authorLibraryPageBoxDetailsView}>
                        <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>Library |</Text>
                        <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: library == "" ? undefined : primaryColor, maxWidth: windowWidth / 1.5}]} numberOfLines={1}>{library}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.authorLibraryPageBoxSubView}>
                <TouchableOpacity 
                    style={styles.libraryBooksScreenTouchable} 
                    onPress={() => {
                        handleAuthorPress()
                        setPressed(true);
                        setTimeout(() => {
                            setPressed(false);
                        }, 1000);  
                    }}
                    disabled={pressed}
                >
                    <ElectroIcon
                    name="person"
                    size={20}
                    color={ primaryColor }
                    />
                    <View style={styles.authorLibraryPageBoxDetailsView}>
                        <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>Author |</Text>
                        <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: author == "" ? null : primaryColor, maxWidth: windowWidth / 1.5}]} numberOfLines={1}>{author}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.authorLibraryPageBoxSubView}>
                <ElectroIcon
                name="bookmark"
                size={20}
                color={ primaryColor }
                />
                <View style={styles.authorLibraryPageBoxDetailsView}>
                    <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>On Page |</Text>
                    <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: primaryColor, maxWidth: windowWidth / 1.5}]} numberOfLines={1}>{page}</Text>
                </View>
            </View>
        </Animatable.View>
    );
};