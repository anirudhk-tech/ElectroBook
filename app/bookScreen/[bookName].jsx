// Expo
import { useLocalSearchParams, Stack } from "expo-router"

// React
import { Dimensions, ScrollView, View, Image, Text } from "react-native";
import { useState, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

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
        <ScrollView style={[{backgroundColor: secondaryColor, height: windowHeight}]}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: primaryColor },
                    headerTitleAlign: 'center',
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: bookName,
                    headerShown: true,
                }}
            />
            <View>
                <Image/>
                {/*/Component with author and library deeds/*/}  
            </View>
            <Text></Text>
            {/*/Componenet with list/*/}
            <Text></Text>
            {/*/Componenet with list/*/}
            <Text></Text>
            {/*/Component with notes list/*/}
        </ScrollView>
    )
}