// React
import { FlatList, Dimensions } from "react-native";
import { useEffect, useState } from "react";

// Components
import { ElectroLibraryRowCard } from "./libraryRowCard";

// Hooks
import { useData } from "../../hooks/useData";

// Backend
import { styles } from "../../constants/stylers";
import { useSearchValue, useSearchData, useSearchActive } from "../../hooks/useSearch";
import { ElectroSearchLibraryBar } from "./searchLibraryBar";


export const ElectroLibraryScroll = (props) => {
    const [libraries, setLibraries] = useState([]);
    const [flatListData, setFlatListData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const { searchValue } = useSearchValue();
    const { searchActive } = useSearchActive();
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useData("library").then(data => setLibraries(data));
    }, []);

    useEffect(() => {
        useSearchData(searchValue).then(data => setSearchData(data));
    }, [searchValue]);

    useEffect(() => {
        if (searchActive == true) {
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
                            />,
                        key: x,
                    })
                };
                setFlatListData(flatListData);
            };
        };

    }, [searchData, searchActive]);

    useEffect(() => {
        if (searchActive == false) {
            const flatListData = [];
            if (libraries != null) {
                for (let x = 0; x < libraries.length; x++) {
                    flatListData.push({
                        item: <ElectroLibraryRowCard 
                                libraryName={libraries[x].option} 
                                libraryColor={libraries[x].color} 
                                onPress={props.handleCardPress}
                            />,
                        key: x,
                    });
                };
                setFlatListData(flatListData);
            };
        };
    }, [libraries, searchValue, searchActive]);

    if (searchActive == false) {
        return (
            <FlatList
                contentContainerStyle={[styles.libraryScrollFlatListMainView, { height: windowHeight-100, marginTop: searchActive ? '20%' : ''}]}
                data={flatListData}
                renderItem={({item}) => item.item}
                keyExtractor={(item) => item.key}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        )
    } else {
        return (
            <FlatList
            contentContainerStyle={[styles.searchBarFlatList, { height: windowHeight }]}
            data={flatListData}
            renderItem={({item}) => item.item}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            />
        );
    };
};