// React
import { View, FlatList, Dimensions } from "react-native";

// Components
import { ElectroMenuBar } from '../../components/DropDown/dropDownMenuBar';
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";

// Backend
import { useCallback, useEffect, useState } from "react";
import { styles } from "../../constants/stylers";

// Expo
import { router, Stack, useLocalSearchParams} from 'expo-router';

// Hooks
import { useColor } from "../../hooks/useTheme";

export default function menuDropDownScreen () {
    const { menuType } = useLocalSearchParams();
    const [primaryColor, secondaryColor] = useColor();
    const [rawData, setRawData] = useState([]);
    const [flatListData, setFlatListData] = useState([]);
    const windowHeight = Dimensions.get("window").height;

    const handleLibraryPress = useCallback(() => {
        router.push('../../(tabs)/libraryScreen')
    }, []);

    const handleMenuPress = useCallback(() => {
        router.push('../../(tabs)/menuScreen');
    }, []);

    const handleDeletePress = (option) => {
        // Delete From SQL and FileSystem (Image AND Book)
        setRawData(rawData.filter(x => x != option))
    };

    const handleColorPress = (option) => {
        // Change Color in SQL and implement color picker
        console.log("Color Pressed!")
    };

    const handleAddPress = (value) => {
        setRawData([value, ...rawData])
    };

    const multiIcons = useCallback(() => {
        return (
            <ElectroMultiIcons icons={[
                {"name": "albums-outline", "handlePress": handleMenuPress}, 
                {"name": "library-outline", "handlePress": handleLibraryPress}]}/>
        );
    }, []);

    const dataCreation = useCallback((data) => {
        const dataOrganize = []
        for (let x = 0; x < data.length; x++) {
            dataOrganize.push({
                "item": <ElectroMenuBar option={data[x]} handleDeletePress={handleDeletePress} handleColorPress={handleColorPress}/>,
                "key": x
            })};
        if (menuType != "Books") {
            if (menuType != "Completed") {
            dataOrganize.push({
                "item": <ElectroAddMenuBar onSubmit={handleAddPress}/>,
                "key": dataOrganize.length+1,
            })}};
        setFlatListData(dataOrganize);
    }, [rawData]);

    useEffect(() => {
        // Fetch SQL instead of dataTest
        const dataTest = ["Wizard of Oz: The King of Macedonia and The Roman Empire: Conqueror of the Great Seas. Must Read!.pdf"];
        setRawData(dataTest);
    }, []);

    useEffect(() => {
        dataCreation(rawData);
    }, [rawData]);


    // Implement SQL Data transfer


    return (
        <View style={[styles.dropDownScreenMainView, {backgroundColor: secondaryColor}]}>
             <Stack.Screen options={{
                headerStyle: {backgroundColor: primaryColor},
                headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                headerTitle: menuType,
                headerBackVisible: false,
                headerRight: (multiIcons),
                headerShown: true}}/>
            <FlatList
                data={flatListData}
                style={{height: windowHeight}}
                renderItem={({item}) => item.item}
                keyExtractor={(item) => item.key}
            />
        </View>
    )
};