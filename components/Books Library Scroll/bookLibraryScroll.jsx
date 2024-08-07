// React
import { FlatList, Dimensions, View } from "react-native";
import { useEffect, useState } from "react";

// Components
import { ElectroBookRowCard } from "./bookRowCard";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useBooksInLibrary } from "../../hooks/useBookInLibrary";
import { useRefreshOptions } from "../../hooks/useRefreshOptions";
import { ElectroDropDownEmptyText } from "../DropDown/dropDownEmpty";

// Same styles as Library Scroll

export const ElectroBookScroll = (props) => {
    const [books, setBooks] = useState([]);
    const [flatListData, setFlatListData] = useState([]);
    const { refresh } = useRefreshOptions();
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useBooksInLibrary(props.library).then(data => setBooks(data));
    }, [refresh]);

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

    return (
        <View>
            <ElectroDropDownEmptyText visible={flatListData == undefined || flatListData == null ? "none" : flatListData.length == 0 ? "flex" : "none"}/>
            <FlatList
                contentContainerStyle={[styles.libraryScrollFlatListMainView, {height: windowHeight-100}]}
                data={flatListData}
                maxToRenderPerBatch={5}
                renderItem={({item}) => item.item}
                keyExtractor={(item) => item.key}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )

    
};