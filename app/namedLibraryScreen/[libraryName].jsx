// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// Components
import { ElectroBookScroll } from "../../components/Books Library Scroll/bookLibraryScroll";
import { ElectroSearchFilterBar } from "../../components/Main Library Screen/searchFilterBar";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";
import { ElectroIcon } from "../../components/General/icon";

// React
import { Dimensions, View, Text, BackHandler } from "react-native";
import { useCallback, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookCardPress } from "../../hooks/useLibraryCardPress";
import { useBookSearchActive, useSearchActive, useSearchValue } from "../../hooks/useSearch";


export default function libraryBooksScreen () {
    const { libraryName } = useLocalSearchParams();
    const { primaryColor, secondaryColor } = useColor();
    const setBookCardPress = useBookCardPress().setPress;
    const { searchActive, setSearchActive } = useBookSearchActive();
    const setMainSearchActive = useSearchActive().setSearchActive
    const { setBookSearchValue } = useSearchValue();
    const windowHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("screen").width;

    const handleCreateIconPress = () => {
        router.push(`../menuDropScreen/booksInLibrary+${libraryName}`);
    };

    const handleSearchPress = () => {
        setSearchActive();
    };

    const handleBackPress = () => {
        setSearchActive(false);
        setMainSearchActive(false);
        router.dismiss();
    };

    const handleSearchCancel = () => {
        setSearchActive(false);
        setBookSearchValue("");
      };

    const searchAndCreate = useCallback(() => {
        return (
            <View style={styles.libraryBooksScreenHeader}>
                <ElectroMultiIcons
                    icons={[
                        { name: "search", handlePress: handleSearchPress },
                        { name: "add", handlePress: handleCreateIconPress },
                      ]}
                />
            </View>
        );
    }, []);

    const backIcon = useCallback(() => {
        return (
            <ElectroIcon 
            name="arrow-back"
            size={25}
            color={secondaryColor}
            handlePress={handleBackPress}
            style={{marginRight: '10%'}}
            />
        )
    }, []);

    useEffect(() => {
        const handleCardPress = (bookName) => {
            router.push(`../bookScreen/${bookName}`);
        };

        const backAction = () => {
            handleBackPress();
            return true
        };
        
        const handler = BackHandler.addEventListener('hardwareBackPress', backAction);
        setBookCardPress(handleCardPress);

        return () => handler.remove();
    }, []);

    return (
        <View style={[styles.libraryBooksScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: primaryColor },
                    headerTitleAlign: 'left',
                    headerTitle: () => (
                        <Text 
                        style={{
                            color: secondaryColor,
                            fontSize: 20,
                            fontWeight: 'bold',
                            width: '67%',
                            }}
                        numberOfLines={1}
                        >{libraryName}</Text>
                    ),
                    headerRight: searchAndCreate,
                    headerLeft: backIcon,
                    headerShown: true,
                    headerBackVisible: false,
                }}
            />
            <View style={[styles.libraryScreenSearchScrollView, { height: windowHeight / 10, display: searchActive ? "flex" : "none"}]}>
                <ElectroSearchFilterBar books={true}/>
                <ElectroIcon 
                    size={40}
                    color={primaryColor}
                    name={"close-circle"}
                    style={{
                    flex: 1, 
                    justifyContent: 'center', 
                    padding: '4%'
                    }}
                    handlePress={handleSearchCancel}
                />
            </View>
            <ElectroBookScroll/>
        </View>
    )
};