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
import { ElectroSeriesHeader } from "../../components/Book Screen/seriesHeader";

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
                    headerShown: true,
                }}
            />
            <ElectroSeriesHeader bookName={bookName}/>
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
                <View style={styles.libraryBooksScreenTitleView}>
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Tropes</Text>
                    <ElectroIcon 
                    name="create"
                    size={30}
                    color={primaryColor}
                    handlePress={() => {
                        handleIconPress();
                        setType("trope");
                    }}
                    />
                </View>
                <ElectroTropesList bookName={bookName}/>
            </View>
            <View style={styles.libraryBooksScreenListMainView}>
                <View style={styles.libraryBooksScreenTitleView}> 
                    <Text style={[styles.libraryBooksScreenTitle, {color: primaryColor}]}>Notes</Text>
                    <ElectroIcon 
                    name="create"
                    size={30}
                    color={primaryColor}
                    handlePress={() => {
                        handleNotesPress();
                    }}
                    />
                </View>
                <ElectroNotesList bookName={bookName}/>
            </View>
        </ScrollView>
    )
}