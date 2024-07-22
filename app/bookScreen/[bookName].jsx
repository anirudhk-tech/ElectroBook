// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// React
import { Dimensions, ScrollView, View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroAuthorLibraryPageBox } from "../../components/Book Screen/authorLibraryPageBox";
import { ElectroGenresList } from "../../components/Book Screen/genresList";
import { ElectroTropesList } from "../../components/Book Screen/tropesList";
import { ElectroNotesList } from "../../components/Book Screen/notesList";
import { ElectroSeriesHeader } from "../../components/Book Screen/seriesHeader";
import { ElectroReadButton } from "../../components/Book Screen/readButton";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditType } from "../../hooks/useEdit";
import { useBookInfo } from "../../hooks/useBookInfo";

export default function bookScreen () {
    const { bookName } = useLocalSearchParams();
    const { setType } = useEditType();
    const {primaryColor, secondaryColor} = useColor();
    const windowHeight = Dimensions.get("window").height;
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;
    const [bookInfo, setBookInfo] = useState([]);
    const [library, setLibrary] = useState("");
    const [imageUri, setImageUri] = useState("");

    const handleIconPress = () => {
        router.push(`../bookEditDropScreen/${bookName}`)
    };

    const handleNotesPress = () => {
        router.push(`../bookEditNotesDropScreen/${bookName}`);
    };

    const handleReadPress = () => {
        router.push(`../pdfReadingScreen/${`${library}+${bookName}`}`);
    };

    const readButton = useCallback(() => {
        return (
            <ElectroReadButton handlePress={handleReadPress}/>
        );
    });

    
    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, []);

    useEffect(() => {
        if (bookInfo.library != undefined && bookInfo.library != null) {
            setLibrary(bookInfo.library)
        };

        if (bookInfo.imageUri != undefined && bookInfo.library != null) {
            setImageUri(bookInfo.imageUri);
        };
    }, [bookInfo]);

    return (
        <ScrollView 
            style={{backgroundColor: secondaryColor}}
            contentContainerStyle={styles.libraryBooksScreenMainScrollView}
            showsVerticalScrollIndicator={false}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: primaryColor },
                    headerTitleAlign: 'left',
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: bookName,
                    headerRight: readButton,
                    headerShown: true,
                }}
            />
            <ImageBackground 
                source={imageUri == "" ? "placeholder" : {uri: imageUri}}
                style={[styles.libraryBooksScreenImageBackground, {height: screenHeight, width: screenWidth}]}>
                <ElectroSeriesHeader bookName={bookName}/>
                <ElectroAuthorLibraryPageBox bookName={bookName}/> 
                <TouchableOpacity onPress={() => {
                    handleIconPress();
                    setType("genre");
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Genres</Text>
                    <ElectroGenresList bookName={bookName}/>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    handleIconPress();
                    setType("trope");
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Tropes</Text>
                    <ElectroTropesList bookName={bookName}/>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    handleNotesPress();
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Notes</Text>
                    <ElectroNotesList bookName={bookName}/>
                </View>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
    )
}