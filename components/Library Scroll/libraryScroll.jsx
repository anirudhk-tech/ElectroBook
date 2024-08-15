// React
import { FlatList, Dimensions, View } from "react-native";
import { useEffect, useMemo, useState } from "react";

// Components
import { ElectroLibraryRowCard } from "./libraryRowCard";
import { ElectroSearchLibraryBar } from "./searchLibraryBar";
import { ElectroDropDownEmptyText } from "../DropDown/dropDownEmpty";

// Hooks
import { useData } from "../../hooks/useData";

// Backend
import { styles } from "../../constants/stylers";
import { useSearchValue, useSearchData, useSearchActive } from "../../hooks/useSearch";


export const ElectroLibraryScroll = (props) => {
    const [libraries, setLibraries] = useState([]);
    const [flatListData, setFlatListData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const { searchValue } = useSearchValue();
    const { searchActive } = useSearchActive();
    const windowHeight = Dimensions.get("window").height;

    const librariesDataCreation = () => {
        const flatListData = []
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
        };

        return flatListData;
    };

    const librariesDataOrganize = useMemo(
        () => librariesDataCreation(), 
        [libraries]
    );
    
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
                                library={searchData[x].genres == undefined ? true : false}
                            />,
                        key: x,
                    })
                };
                setFlatListData(flatListData);
            };
        };

    }, [searchData, searchActive]);

    useEffect(() => {
        if (!searchActive) {
            setFlatListData(librariesDataOrganize);            
        };
    }, [libraries, searchActive]);

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
                    search = {true} 
                    visible={searchValue.trim() != "" ? flatListData == undefined || flatListData == null ? "none" : flatListData.length == 0 ? "flex" : "none" : "none"}
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