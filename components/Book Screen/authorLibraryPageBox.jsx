// React
import { View, Text, Dimensions } from "react-native";
import { useState, useEffect, useCallback, memo } from "react";

// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";

export const ElectroAuthorLibraryPageBox = memo((props) => {
    const [bookInfo, setBookInfo] = useState([]);
    const [author, setAuthor] = useState("");
    const [page, setPage] = useState(0);
    const [library, setLibrary] = useState("");
    const {primaryColor, secondaryColor} = useColor();
    const windowHeight = Dimensions.get("window").height;
    const windowWidth = Dimensions.get("window").width;

    const shortenAuthor = useCallback(() => {
        if (author == "" || author == undefined) {
            return
        };
        const authorList = bookInfo.author.split(" ");
        const authorInitial = " "+authorList[1][0]+".";
        const author = authorList[0]+authorInitial;
        setAuthor(author);
    }, [author]);

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setBookInfo(data));
    }, []);

    useEffect(() => {
        if (bookInfo.author != undefined && bookInfo.author != null) {
            shortenAuthor(bookInfo.author);
        };

        if (bookInfo.library != undefined && bookInfo.library != null) {
            setLibrary(bookInfo.library)
        };

        if (bookInfo.page != undefined && bookInfo.page != null) {
            setPage(bookInfo.page);
        };

    }, [bookInfo])

    return (
        <View style={[styles.authorLibraryPageBoxMainView, {height: windowHeight / 3}]}>
            <View style={styles.authorLibraryPageBoxSubView}>
                <ElectroIcon
                name="library"
                size={20}
                color={primaryColor}
                />
                <View style={styles.authorLibraryPageBoxDetailsView}>
                    <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>Library |</Text>
                    <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: primaryColor, maxWidth: windowWidth / 2.8}]} numberOfLines={1}>{library}</Text>
                </View>
            </View>
            <View style={styles.authorLibraryPageBoxSubView}>
                <ElectroIcon
                name="person"
                size={20}
                color={primaryColor}
                />
                <View style={styles.authorLibraryPageBoxDetailsView}>
                    <Text style={[styles.authorLibraryPageBoxPrompt, {color: primaryColor}]}>Author |</Text>
                    <Text style={[styles.authorLibraryPageBoxText, {color: secondaryColor, backgroundColor: author == "" ? null : primaryColor, maxWidth: windowWidth / 2.8}]} numberOfLines={1}>{author}</Text>
                </View>
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
        </View>
    );
});