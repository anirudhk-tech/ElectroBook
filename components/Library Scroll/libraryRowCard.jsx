// React
import { TouchableOpacity, View, Text, Dimensions } from "react-native";

// Components
import { ElectroIcon } from "../General/icon";

// Backend
import { styles } from "../../constants/stylers";
import { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBooksInLibrary } from "../../hooks/useBookInLibrary";
import { useLibraryCardPress, useSelectedLibrary } from "../../hooks/useLibraryCardPress";
import { useSearchActive } from "../../hooks/useSearch";



export const ElectroLibraryRowCard = (props) => {
    const { primaryColor, secondaryColor } = useColor();
    const { searchActive } = useSearchActive();
    const { setSelectedLibrary } = useSelectedLibrary();
    const [bookCount, setBookCount] = useState(0);
    const cardPress = useLibraryCardPress().press;
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useBooksInLibrary(props.libraryName).then(data => setBookCount(data.length));
    }, []);

   

    return (
            <Animatable.View
            animation={"bounceIn"}
            useNativeDriver={true}
            >
                <TouchableOpacity 
                    style={[styles.libraryCardRowMainTouchable, {borderColor: primaryColor, backgroundColor: primaryColor, height: windowHeight/2, display: searchActive ? "none" : "flex"}]}
                    onPress={() => {
                        cardPress(props.libraryName)
                        setSelectedLibrary(props.libraryName);    
                    }}>
                    <View style={[styles.libraryCardRowHeaderView, {backgroundColor: secondaryColor}]}>
                        <Text style={[styles.libraryCardBookCountText, {color: primaryColor}]}>{bookCount}</Text>
                        <ElectroIcon 
                            name="folder"
                            color={props.libraryColor == "" ? secondaryColor : props.libraryColor}
                            size={40}
                            handlePress={() => {}}
                        />
                    </View>
                    <Text 
                    style={[styles.libraryCardRowText, {color: secondaryColor, paddingBottom: windowHeight/10}]}
                    numberOfLines={4}
                    >{props.libraryName}</Text>
                </TouchableOpacity>
            </Animatable.View>
    );
};