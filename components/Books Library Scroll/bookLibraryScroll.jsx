// React
import { FlatList, Dimensions } from "react-native";
import { useEffect, useState } from "react";

// Components
import { ElectroBookRowCard } from "./bookRowCard";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useLibraryScrollType } from "../../hooks/useLibraryScroll";
import { useBooksInLibrary } from "../../hooks/useBookInLibrary";

// Same styles as Library Scroll

export const ElectroBookScroll = (props) => {
    const [books, setBooks] = useState([]);
    const [flatListData, setFlatListData] = useState([]);
    const [type] = useLibraryScrollType();
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useBooksInLibrary(props.library).then(data => setBooks(data));
    }, []);

    useEffect(() => {
        const flatListData = [];
        for (let x = 0; x < books.length; x++) {
            flatListData.push({
                item: <ElectroBookRowCard bookName={books[x].option} bookColor={books[x].color}/>,
                key: x,
            });
        };
        setFlatListData(flatListData);
    }, [books]);


    if (type == "row") {
        return (
            <FlatList
                contentContainerStyle={[styles.libraryScrollFlatListMainView, {height: windowHeight-100}]}
                data={flatListData}
                renderItem={({item}) => item.item}
                keyExtractor={(item) => item.key}
                horizontal={true}
            />
        )
    }
    
};