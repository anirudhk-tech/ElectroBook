// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// Components
import { ElectroIcon } from "../../components/General/icon";
import { ElectroBookScroll } from "../../components/Books Library Scroll/bookLibraryScroll";

// React
import { View } from "react-native";
import { useCallback, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookCardPress, useLibraryIconPress } from "../../hooks/useLibraryCardPress";


export default function libraryBooksScreen () {
    const { libraryName } = useLocalSearchParams();
    const [primaryColor, secondaryColor] = useColor();
    const [libraryIconPress] = useLibraryIconPress();
    const [bookCardPress, setBookCardPress] = useBookCardPress();

    const libraryIcon = useCallback(() => {
        return (
            <ElectroIcon 
                name="library"
                color={secondaryColor}
                size={30}
                style={{marginRight: '5%'}}
                handlePress={libraryIconPress}
            />
        );
    }, []);

    useEffect(() => {
        const handleCardPress = (bookName) => {
            router.push(`../bookScreen/${bookName}`);
        };
        
        setBookCardPress(handleCardPress);
        console.log("render")
    }, []);

    return (
        <View style={[styles.libraryBooksScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: primaryColor },
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: libraryName,
                    headerRight: libraryIcon,
                    headerShown: true,
                }}
            />
            <ElectroBookScroll library={libraryName}/>
        </View>
    )
};