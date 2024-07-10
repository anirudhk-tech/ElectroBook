// Expo
import { useLocalSearchParams, Stack, router } from "expo-router";

// React
import { FlatList, View, Dimensions } from 'react-native';
import { useContext, useEffect, useState, useCallback } from "react";

// Components
import { ElectroDropBar } from "../../components/DropDown/dropDownBar";
import { ElectroMultiIcons } from "../../components/DropDown/dropDownMultiIcons";
// Backend
import { ThemeContext } from "../../constants/context";
import { styles } from "../../constants/stylers";

export default function dropDownScreen () {
    const { options } = useLocalSearchParams();
    const windowHeight = Dimensions.get('window').height;

    const colorContext = useContext(ThemeContext);
    const [multi, setMulti] = useState(false);
    const [value, setValue] = useState([]);

    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];
    const dataWithHeading = options.split(',');
    const dataWithoutHeading = dataWithHeading.filter(x => x != dataWithHeading[0]);
    const data = dataWithoutHeading.filter(x => x != dataWithHeading[1]);
    const flatListBars = []

    const handleCheckPress = useCallback(() => {
        router.navigate("../../(tabs)/uploadFileScreen");

        // Implement Async Store where you set values
    }, []);

    const handleCancelPress = useCallback(() => {
        setValue([]);

        // Implement Async Store where you clear all values that are selected but don't exit out of dropdown
    }, []);

    const handleBarPress = (option) => {
        if (multi == false) {
            setValue(option);
            router.navigate("../../(tabs)/uploadFileScreen");
        } else {
            if (value.includes(option)) {
                setValue(value.filter(x => x != option));
            } else {
                setValue([option, ...value]);
            }}};

    const multiOptions = useCallback(() => {
        return (
            <ElectroMultiIcons icons={[
                {"name": "close-circle", "handlePress": handleCancelPress}, 
                {"name": "checkmark", "handlePress": handleCheckPress}
            ]}/>
        )}, []);


    useEffect(() => {
        if (dataWithHeading[1] == 'multiTrue') {
            setMulti(true);
        };
    }, []);

    for (let x = 0; x < data.length; x++) {
        flatListBars.push({
            "item": <ElectroDropBar option={data[x]} multi={multi} handlePress={handleBarPress}/>, 
            "key": x
        })};

    return (
        <View style={[styles.dropDownScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitle: dataWithHeading[0],
                    headerTitleAlign: 'center',
                    headerRight: (multi == true ? multiOptions : () => <></>),
                    headerShown: true}}/>
            <FlatList
                contentContainerStyle={[styles.dropDownScreenFlatList, {height: windowHeight}]}
                data={flatListBars}
                renderItem={({item}) => item.item}
                keyExtractor={(item) => item.key}
            />
        </View>
    )
}