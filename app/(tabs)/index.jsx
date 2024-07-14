// React
import { View } from "react-native";
import { useContext, useState, useMemo } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from "@/constants/context";

// Expo
import { router } from 'expo-router';

// Components
import { ElectroLogo } from '../../components/logo';


export default function startingScreen () {
    const colorContext = useContext(ThemeContext);
    const [checkRegister, setCheckRegister] = useState([]);
    const secondaryColor = colorContext.secondaryColor;

    // const startingSetUp = async () => {
    //     await delete_user() 
    //     check_user().then(data => {setCheckRegister(data)});
    // };

    // startingSetUp()

    //if (checkRegister == true) {
        setTimeout(() => router.push('./libraryScreen'), 5000);
    //} //else { 
        //setTimeout(() => router.push('../(tabs)/registerScreen'), 5000);
    //}
    
    return (
        <View style={[styles.startingScreenMainView, {backgroundColor: secondaryColor}]}>
            <ElectroLogo styles={styles.startingScreenLogo}/>
        </View>
    );
};

