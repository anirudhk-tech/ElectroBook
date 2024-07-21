// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// React
import { Dimensions, ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";

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

export default function bookScreen () {
    const { bookName } = useLocalSearchParams();
    const { setType } = useEditType();
    const {primaryColor, secondaryColor} = useColor();
    const windowHeight = Dimensions.get("window").height;

    const handleIconPress = () => {
        router.push(`../bookEditDropScreen/${bookName}`)
    };

    const handleNotesPress = () => {
        router.push(`../bookEditNotesDropScreen/${bookName}`);
    };

    const readButton = useCallback(() => {
        return (
            <ElectroReadButton />
        );
    });

    return (
        <ScrollView 
            style={{backgroundColor: secondaryColor}}
            contentContainerStyle={styles.libraryBooksScreenMainScrollView}
            showsVerticalScrollIndicator={false}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: primaryColor },
                    headerTitleAlign: 'center',
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: bookName,
                    headerRight: readButton,
                    headerShown: true,
                }}
            />
            <ElectroSeriesHeader bookName={bookName}/>
            <View style={[styles.libraryBooksScreenImageAndBoxView, {height: windowHeight / 3}]}>
                <Image style={[styles.libraryBooksScreenImage, {height: windowHeight / 3}]}/>
                <ElectroAuthorLibraryPageBox bookName={bookName}/> 
            </View>
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
        </ScrollView>
    )
}