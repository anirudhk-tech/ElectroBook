// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// React
import { Dimensions, ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroAuthorLibraryPageBox } from "../../components/Book Screen/authorLibraryPageBox";
import { ElectroGenresList } from "../../components/Book Screen/genresList";
import { ElectroTropesList } from "../../components/Book Screen/tropesList";
import { ElectroNotesList } from "../../components/Book Screen/notesList";
import { ElectroReadButton } from "../../components/Book Screen/readButton";
import { ElectroCompleteButton } from "../../components/Book Screen/completeButton";
import { ElectroReadingProgressBar } from "../../components/Book Screen/readingProgressBar";
import { ElectroIcon } from "../../components/General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditNotes, useEditType } from "../../hooks/useEdit";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookName } from "../../hooks/useBookName";
import { useImageKey } from "../../hooks/useImageKey";

export default function bookScreen () {
    const { bookName } = useLocalSearchParams();
    const { setType } = useEditType();
    const { setBookName } = useBookName();
    const { imageKey } = useImageKey();
    const { setData } = useEditNotes();
    const { primaryColor, secondaryColor } = useColor();
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;
    const [bookInfo, setBookInfo] = useState([]);
    const [imageUri, setImageUri] = useState("");

    const handleBackPress = useCallback(() => {
        setBookName(null);
        setData([null]);
        router.dismiss();
    }, []);

    const backIcon = () => {
        return (
            <ElectroIcon 
            name="arrow-back"
            size={25}
            color={secondaryColor}
            handlePress={handleBackPress}
            style={{marginLeft: '10%'}}
            />
        );
    };

    const handleIconPress = () => {
        router.push(`../bookEditDropScreen/${bookName}`)
    };

    const handleNotesPress = () => {
        router.push(`../bookEditNotesDropScreen/${bookName}`);
    };

    const handleReadPress = () => {
        router.push(`../pdfReadingScreen/${bookName}`);
    };

    const readButton = () => {
        return (
            <ElectroReadButton handlePress={handleReadPress}/>
        );
    };

    
    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
        setBookName(bookName);
    }, []);

    useEffect(() => {
        if (bookInfo != null && bookInfo.length != 0) {
            setImageUri(bookInfo.imageUri);
        };
    }, [bookInfo]);

    return (
        <ScrollView 
            style={{backgroundColor: secondaryColor}}
            contentContainerStyle={[styles.libraryBooksScreenMainScrollView, {height: screenHeight+350}]}
            showsVerticalScrollIndicator={false}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: primaryColor },
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: bookName.length > 23 ? bookName.slice(0, 23)+"..." : bookName,
                    headerLeft: backIcon,
                    headerRight: readButton,
                    headerShown: true,
                    headerBackVisible: false,
                }}
            />
            <Image 
                key={imageKey}
                style={{height: screenHeight + 200, width: screenWidth, opacity: 0.2}}
                source={{uri: imageUri + '?' + Date.now()}}
            />
            <View 
                style={[styles.libraryBooksScreenBackgroundView, {height: screenHeight + 200, width: screenWidth, position: 'absolute', paddingBottom: screenHeight/15, gap: 50}]}>
                <ElectroReadingProgressBar/>
                <ElectroCompleteButton/>
                <ElectroAuthorLibraryPageBox/> 
                <TouchableOpacity 
                style={styles.libraryBooksScreenTouchable}
                onPress={() => {
                    handleIconPress();
                    setType("genre");
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Genres</Text>
                    <ElectroGenresList/>
                </View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.libraryBooksScreenTouchable}
                onPress={() => {
                    handleIconPress();
                    setType("trope");
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Tropes</Text>
                    <ElectroTropesList/>
                </View>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.libraryBooksScreenTouchable}
                onPress={() => {
                    handleNotesPress();
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Notes</Text>
                    <ElectroNotesList bookScreen={true}/>
                </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};