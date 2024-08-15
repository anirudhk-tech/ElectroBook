// React
import { FlatList, Dimensions, View, Keyboard } from "react-native";
import { useEffect, useMemo, useState } from "react";

// Components
import { ElectroBookRowCard } from "./bookRowCard";
import { ElectroDropDownEmptyText } from "../DropDown/dropDownEmpty";
import { ElectroSearchLibraryBar } from "../Library Scroll/searchLibraryBar";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useBooksInLibrary } from "../../hooks/useBookInLibrary";
import { useRefreshOptions } from "../../hooks/useRefreshOptions";
import { useBookSearchActive, useSearchData, useSearchValue } from "../../hooks/useSearch";
import { useSelectedLibrary } from "../../hooks/useLibraryCardPress";


// Same styles as Library Scroll

export const ElectroBookScroll = () => {
    const [books, setBooks] = useState([]);
    const [flatListData, setFlatListData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const { refresh } = useRefreshOptions();
    const { searchActive } = useBookSearchActive();
    const { bookSearchValue } = useSearchValue();
    const { selectedLibrary } = useSelectedLibrary();
    const windowHeight = Dimensions.get("window").height;

    const booksDataCreation = () => {
        const flatListData = [];
        for (let x = 0; x < books.length; x++) {
            flatListData.push({
                item: <ElectroBookRowCard bookName={books[x].option} bookColor={books[x].color}/>,
                key: x,
            });
        };

        return flatListData;
    };

    const booksDataOrganize = useMemo(
        () => booksDataCreation(),
        [books]
    );

    useEffect(() => {
        useBooksInLibrary(selectedLibrary).then(data => setBooks(data));
    }, [refresh, selectedLibrary]);

    useEffect(() => {
        if (!searchActive) {
            setFlatListData(booksDataOrganize);
        };
    }, [books, searchActive]);

    useEffect(() => {
        if (searchActive) {
            const flatListData = [];

            if (searchData == "No results") {
                setFlatListData([]);
                return
            };

            if (searchData != null) {
                for (let x in searchData) {
                    flatListData.push({
                        item: <ElectroSearchLibraryBar 
                                option={searchData[x].option}
                                color={searchData[x].color}
                                library={false}
                            />,
                        key: x,
                    })
                };
                setFlatListData(flatListData);
            };
        };

    }, [searchData, searchActive]);

    useEffect(() => {
        useSearchData(bookSearchValue, selectedLibrary).then(data => setSearchData(data));
    }, [bookSearchValue]);


    if (!searchActive) {
        return (
            <View>
                <FlatList
                    contentContainerStyle={[styles.libraryScrollFlatListMainView, { height: windowHeight-100, marginTop: searchActive ? '20%' : '', display: searchActive ? "none" : "flex"}]}
                    data={flatListData}
                    renderItem={({item}) => item.item}
                    keyExtractor={(item) => item.key}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    } else {
        return (
            <View>
                <ElectroDropDownEmptyText 
                    search={true} 
                    visible={bookSearchValue.trim() != "" ? flatListData == undefined || flatListData == null ? "none" : flatListData.length == 0 ? "flex" : "none" : "none"}
                />
                <FlatList
                contentContainerStyle={[styles.searchBarFlatList, { 
                    gap: 20,
                    paddingVertical: 20,
                }]}
                style= {{ display: searchActive ? "flex" : "none" }}
                data={flatListData}
                renderItem={({item}) => item.item}
                keyExtractor={(item) => item.key}
                getItemLayout={(data, index) => (
                    {length: windowHeight/10, offset: windowHeight/10 * index, index}
                )}
                showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    };

    
};