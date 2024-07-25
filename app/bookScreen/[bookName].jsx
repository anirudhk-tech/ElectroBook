// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// React
import { Dimensions, ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import {useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroAuthorLibraryPageBox } from "../../components/Book Screen/authorLibraryPageBox";
import { ElectroGenresList } from "../../components/Book Screen/genresList";
import { ElectroTropesList } from "../../components/Book Screen/tropesList";
import { ElectroNotesList } from "../../components/Book Screen/notesList";
import { ElectroReadButton } from "../../components/Book Screen/readButton";
import { ElectroCompleteButton } from "../../components/Book Screen/completeButton";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditType } from "../../hooks/useEdit";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookName } from "../../hooks/useBookName";

export default function bookScreen () {
    const { bookName } = useLocalSearchParams();
    const { setType } = useEditType();
    const { setBookName } = useBookName();
    const {primaryColor, secondaryColor} = useColor();
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;
    const [bookInfo, setBookInfo] = useState([]);
    const [imageUri, setImageUri] = useState("");

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
        if (bookInfo.imageUri != undefined && bookInfo.library != null) {
            setImageUri(bookInfo.imageUri);
        };
    }, [bookInfo]);

    return (
        <ScrollView 
            style={{backgroundColor: secondaryColor}}
            contentContainerStyle={[styles.libraryBooksScreenMainScrollView, {height: screenHeight+200}]}
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
            <Image 
            style={{height: screenHeight + 200, width: screenWidth, opacity: 0.2}}
            source={imageUri == "" ? "placeholder" : {uri: imageUri}}
            />
            <View 
                style={[styles.libraryBooksScreenBackgroundView, {height: screenHeight + 200, width: screenWidth, position: 'absolute', paddingBottom: screenHeight/15}]}>
                <ElectroCompleteButton/>
                <ElectroAuthorLibraryPageBox/> 
                <TouchableOpacity onPress={() => {
                    handleIconPress();
                    setType("genre");
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Genres</Text>
                    <ElectroGenresList/>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    handleIconPress();
                    setType("trope");
                }}>
                <View style={styles.libraryBooksScreenListMainView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Tropes</Text>
                    <ElectroTropesList/>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
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