// React
import { FlatList, Dimensions } from "react-native";
import { useEffect, useState } from "react";

// Components
import { ElectroLibraryRowCard } from "./libraryRowCard";

// Hooks
import { useData } from "../../hooks/useData";
import { useLibraryScrollType } from "../../hooks/useLibraryScroll";

// Backend
import { styles } from "../../constants/stylers";


export const ElectroLibraryScroll = (props) => {
    const [libraries, setLibraries] = useState([]);
    const [flatListData, setFlatListData] = useState([]);
    const {type} = useLibraryScrollType();
    const windowHeight = Dimensions.get("window").height;

    useEffect(() => {
        useData("library").then(data => setLibraries(data));
    }, []);

    useEffect(() => {
        const flatListData = [];
        for (let x = 0; x < libraries.length; x++) {
            flatListData.push({
                item: <ElectroLibraryRowCard libraryName={libraries[x].option} libraryColor={libraries[x].color} onPress={props.handleCardPress}/>,
                key: x,
            });
        };
        setFlatListData(flatListData);
    }, [libraries]);


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