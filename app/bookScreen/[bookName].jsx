// Expo
import { useLocalSearchParams, Stack } from "expo-router"

// React
import { Dimensions, ScrollView, View, Image, Text } from "react-native";
import { useState, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroAuthorLibraryPageBox } from "../../components/Book Screen/authorLibraryPageBox";
import { ElectroGenresList } from "../../components/Book Screen/genresList";
import { ElectroTropesList } from "../../components/Book Screen/tropesList";
import { ElectroNotesList } from "../../components/Book Screen/notesList";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookInfo } from "../../hooks/useBookInfo";



export default function bookScreen () {
    const { bookName } = useLocalSearchParams();
    const {primaryColor, secondaryColor} = useColor();
    const [bookInfo, setBookInfo] = useState([]);
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, []);

    return (
        <ScrollView 
            style={{backgroundColor: secondaryColor}}
            contentContainerStyle={[styles.libraryBooksScreenMainScrollView, {height: windowHeight}]}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: primaryColor },
                    headerTitleAlign: 'center',
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: bookName,
                    headerShown: true,
                }}
            />
            <View style={[styles.libraryBooksScreenImageAndBoxView, {height: windowHeight / 3}]}>
                <Image style={[styles.libraryBooksScreenImage, {height: windowHeight / 3}]}/>
                <ElectroAuthorLibraryPageBox bookName={bookName}/> 
            </View>
            <View style={styles.libraryBooksScreenListMainView}>
                <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Genres</Text>
                <ElectroGenresList bookName={bookName}/>
            </View>
            <View style={styles.libraryBooksScreenListMainView}>
                <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Tropes</Text>
                <ElectroTropesList bookName={bookName}/>
            </View>
            <View style={styles.libraryBooksScreenListMainView}>
                <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}> Notes</Text>
                <ElectroNotesList bookName={bookName}/>
            </View>
        </ScrollView>
    )
}