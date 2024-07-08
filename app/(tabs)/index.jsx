// React
import { View, Image } from "react-native";
import { useContext, useState } from 'react';

// Backend
import { styles } from '../../constants/stylers';
import { check_user } from "../backend/controller";
import { ThemeContext } from "@/constants/context";

// Expo
import { router } from 'expo-router';

// Components
import { Logo } from '../../components/logo';


export default function startingScreen () {
    const colorContext = useContext(ThemeContext);
    const [checkRegister, setCheckRegister] = useState([]);
    const secondaryColor = colorContext.secondaryColor;


    check_user().then(data => {setCheckRegister(data)});

    if (checkRegister == true) {
        setTimeout(() => router.push('../(tabs)/libraryScreen'), 5000);
    } else { 
        setTimeout(() => router.push('../(tabs)/registerScreen'), 5000);
    }
    
    return (
        <View style={[styles.startingScreenMainView, {backgroundColor: secondaryColor}]}>
            <Logo styles={styles.startingScreenLogo}/>
        </View>
    );
};