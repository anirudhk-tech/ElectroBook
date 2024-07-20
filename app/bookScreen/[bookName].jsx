// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// React
import { Dimensions, ScrollView, View, Image, Text } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroAuthorLibraryPageBox } from "../../components/Book Screen/authorLibraryPageBox";
import { ElectroGenresList } from "../../components/Book Screen/genresList";
import { ElectroTropesList } from "../../components/Book Screen/tropesList";
import { ElectroNotesList } from "../../components/Book Screen/notesList";
import { ElectroIcon } from "../../components/General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditType } from "../../hooks/useEdit";

export default function bookScreen () {
    const { bookName } = useLocalSearchParams();
    const { setType } = useEditType();
    const {primaryColor, secondaryColor} = useColor();
    const windowHeight = Dimensions.get("window").height;

    const handleIconPress = () => {
        router.push(`../bookEditScreen/${bookName}`)
    };

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
                <View style={styles.libraryBooksScreenTitleView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Genres</Text>
                    <ElectroIcon 
                    name="create"
                    size={30}
                    color={primaryColor}
                    handlePress={() => {
                        handleIconPress();
                        setType("genre");
                    }}
                    />
                </View>
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