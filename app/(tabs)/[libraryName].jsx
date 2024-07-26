// Expo
import { useLocalSearchParams, Stack, router } from "expo-router"

// Components
import { ElectroBookScroll } from "../../components/Books Library Scroll/bookLibraryScroll";

// React
import { View } from "react-native";
import { useCallback, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookCardPress } from "../../hooks/useLibraryCardPress";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";


export default function libraryBooksScreen () {
    const { libraryName } = useLocalSearchParams();
    const {primaryColor, secondaryColor} = useColor();
    const setBookCardPress = useBookCardPress().setPress;

    const handleCreateIconPress = useCallback (() => {
        router.push("../menuDropScreen/book");
    }, []);

    const handleLibraryPress = useCallback (() => {
        router.navigate("./libraryScreen")
    }, []);

    const libraryIcon = useCallback(() => {
        return (
            <View style={{marginBottom: '1.5%', marginRight: '2%'}}>
                <ElectroMultiIcons
                    icons={[
                        { name: "library", handlePress: handleLibraryPress },
                        { name: "construct", handlePress: handleCreateIconPress },
                      ]}
                />
            </View>
        );
    }, []);

    useEffect(() => {
        const handleCardPress = (bookName) => {
            router.push(`../bookScreen/${bookName}`);
        };
        
        setBookCardPress(handleCardPress);
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
            <Animatable.View
            animation={"bounceIn"}
            useNativeDriver={true}
            >
                <ElectroBookScroll library={libraryName}/>
            </Animatable.View>
        </View>
    )
};